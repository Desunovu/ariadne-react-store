import os
import uuid
from typing import List

from werkzeug.datastructures import FileStorage

from core import db, minio_client
from core.models import ProductImage

products_bucket = os.environ.get("PRODUCTS_BUCKET")


def save_product_images(images: List[FileStorage], product_id: int):
    product_images = []

    for image in images:
        # Генерация уникального имени файла
        file_ext = get_file_extension(image)
        file_name = generate_file_name(product_id, file_ext)

        # Сохранение в хранилище minio
        # TODO try except
        minio_result = save_image_to_minio(
            image=image,
            file_name=file_name,
            bucket_name=products_bucket
        )

        # Создание сущности таблицы
        product_image = ProductImage(
            product_id=product_id,
            image_name=file_name
        )
        product_images.append(product_image)

    # Батчевая вставка всех product_images
    db.session.bulk_save_objects(product_images)
    db.session.commit()

    return True


def get_file_extension(file: FileStorage) -> str:
    # Получение расширения файла из mime-типа
    file_ext = file.mimetype.split("/")[1]
    return file_ext


def generate_file_name(product_id: int, file_ext: str) -> str:
    # Генерация уникального имени файла
    unique_id = str(uuid.uuid4())
    file_name = f"product_{product_id}_{unique_id}.{file_ext}"
    return file_name


def save_image_to_minio(image: FileStorage, file_name: str, bucket_name: str):
    # Сохранение изображения в хранилище MinIO
    result = minio_client.put_object(
        bucket_name=bucket_name,
        object_name=file_name,
        data=image,
        length=-1,
        part_size=10 * 1024 * 1024
    )
    return result
