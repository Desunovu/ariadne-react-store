from ariadne import convert_camel_case_to_snake
from minio.deleteobjects import DeleteObject
from sqlalchemy import desc
from sqlalchemy.orm import Query

from core import app, db, minio_client, logger
from core.extras import ForbiddenError
from core.models import ProductImage, ProductCategory, ProductCharacteristic, \
    Roles

products_bucket = app.config.get("PRODUCTS_BUCKET")


def query_pagination(query: Query, resolver_args) -> Query:
    """
   Применяет пагинацию к запросу.

   Аргументы:
       query (Query): Запрос SQLAlchemy.
       resolver_args: Аргументы резолвера, содержащие информацию о пагинации.

   Возвращает: Query: Измененный запрос с примененной пагинацией или
   исходный запрос, если пагинация не указана в аргументах.
    """
    pagination = resolver_args.get("pagination")
    if pagination:
        offset = pagination.get("offset")
        limit = pagination.get("limit")
        return query.limit(limit).offset(offset)
    return query


def query_sort(query: Query, resolver_args) -> Query:
    """
    Применяет сортировку к запросу.

    Аргументы:
        query (Query): Запрос SQLAlchemy.
        resolver_args: Аргументы резолвера, содержащие информацию о сортировке.

    Возвращает: Query: Измененный запрос с примененной сортировкой или
    исходный запрос, если сортировка не указана в аргументах.
    """
    sort = resolver_args.get("sort")
    if sort:
        field = convert_camel_case_to_snake(sort.get("field"))
        order = sort.get("order")
        if order == "DESC":
            return query.order_by(desc(field))
        return query.order_by(field)
    return query


def add_product_images(images: dict, product_id: int):
    # TODO реализовать без цикла
    for file in images:
        # Добавление в таблицу product_images
        product_image = ProductImage(product_id=product_id, image_name="no_name")
        db.session.add(product_image)
        db.session.commit()

        # Сохранение в хранилище minio
        # TODO проверка типа файла
        file_ext = file.mimetype.split("/")[1]
        file_name = f"product_{product_id}_{product_image.id}.{file_ext}"  # product_1_15.png
        errors = minio_client.put_object(
            bucket_name=products_bucket,
            object_name=file_name,
            data=file,
            length=-1,
            part_size=10 * 1024 * 1024
        )

        # Обновление имени в базе после сохранения изображения
        product_image.image_name = file_name
        db.session.commit()
    return True


def delete_product_images(product_id: int, images_id=None, delete_all=False):
    # Выражение для запроса
    if delete_all:
        stmt = db.session.query(ProductImage).filter(
            ProductImage.product_id == product_id
        )
    else:
        stmt = db.session.query(ProductImage).filter(
            ProductImage.product_id == product_id,
            ProductImage.id.in_(images_id)
        )

    # Поиск в базе и удаление из хранилища
    product_images = stmt.all()
    objects_to_delete = [DeleteObject(product_image.image_name) for product_image in product_images]
    errors = minio_client.remove_objects(bucket_name=products_bucket, delete_object_list=objects_to_delete)
    for error in errors:
        print(f"error with {error}")

    # Удаление из базы
    stmt.delete()
    db.session.commit()

    return True


def add_product_categories(product_id, category_ids=None):
    try:
        product_categories = [
            ProductCategory(product_id=product_id, category_id=category_id)
            for category_id
            in category_ids
        ]
        db.session.bulk_save_objects(product_categories)
        db.session.commit()
        return True
    except Exception as e:
        logger.error(e)
        db.session.rollback()
        return False


def remove_product_categories(product_id, category_ids=None, remove_all=False, ):
    # Выражение для запроса
    if remove_all:
        stmt = db.session.query(ProductCategory).filter(ProductCategory.product_id == product_id)
    else:
        stmt = db.session.query(ProductCategory).filter(
            ProductCategory.product_id == product_id,
            ProductCategory.category_id.in_(category_ids)
        )

    # Удаление записей в БД
    try:
        stmt.delete()
        db.session.commit()
        return True
    except Exception as e:
        logger.error(e)
        db.session.rollback()
        return False


def calculate_cart_total(cartline_and_product_list=None):
    total = sum([cartline.amount * product.price for cartline, product in
                 cartline_and_product_list])

    return total


def add_product_characteristics(product_id, characteristic_ids=None):
    try:
        product_characteristics = [
            ProductCharacteristic(
                product_id=product_id,
                characteristic_id=characteristic_id,
                value=None
            )
            for characteristic_id
            in characteristic_ids
        ]

        db.session.add_all(product_characteristics)
        db.session.commit()
        return True
    except Exception as e:
        logger.error(e)
        db.session.rollback()
        return False


def remove_product_characteristics(product_id, characteristic_ids=None, remove_all=False):
    # Выражение для запроса
    if remove_all:
        stmt = db.session.query(ProductCharacteristic).filter(ProductCharacteristic.product_id == product_id)
    else:
        stmt = db.session.query(ProductCharacteristic).filter(
            ProductCharacteristic.characteristic_id.in_(characteristic_ids)
        )

    # Удаление записей в БД
    try:
        stmt.delete()
        db.session.commit()
        return True
    except Exception as e:
        logger.error(e)
        db.session.rollback()
        return False


def get_image_url(bucket_name: str, object_name: str) -> str:
    """
    Возвращает предварительно подписанный URL-адрес для получения изображения из хранилища.

    Аргументы:
        bucket_name (str): Имя ведра (bucket) в хранилище.
        object_name (str): Имя объекта (object), представляющего изображение в хранилище.

    Возвращает:
        Предварительно подписанный URL-адрес для получения изображения. Если не удалось получить
    """
    url = minio_client.get_presigned_url(
        method="GET",
        bucket_name=products_bucket,
        object_name=object_name
    )
    return url


def get_user_id_from_kwargs_or_current_user(current_user, kwargs):
    """
    Возвращает идентификатор пользователя из аргумента `userId` в kwargs,
    если он присутствует, иначе возвращает идентификатор текущего
    пользователя.

    Исключения:
        - ForbiddenError: Если текущий пользователь не является
        администратором
          и пытается передать аргумент `userId`.
    """
    if "userId" in kwargs:
        # Запрет пользователю делать запрос с аргументом
        if current_user.role != Roles.ADMIN:
            raise ForbiddenError("Нет доступа")
        return kwargs["userId"]
    return current_user.id
