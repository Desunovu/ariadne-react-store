# В resolver верхнего уровня возвращается api.models.Product
import os

from api import app, db
from api.extras import create_simple_result
from api.models import Category, ProductImage, ProductCategory, Review, ProductCharacteristic, Characteristic
from api.extras.resolver_utils import get_image_url


def resolve_product_id(product_obj, _info):
    return product_obj.id


def resolve_product_name(product_obj, _info):
    return product_obj.name


def resolve_product_price(product_obj, _info):
    return product_obj.price


def resolve_product_amount(product_obj, _info):
    return product_obj.amount


def resolve_product_reserved(product_obj, _info):
    return product_obj.reserved


def resolve_product_description(product_obj, _info):
    return product_obj.description


def resolve_product_categories(product_obj, _info):
    # Поиск категорий по product.id
    categories = db.session.query(Category).join(ProductCategory).filter(
        ProductCategory.product_id == product_obj.id).all()

    # Создание словаря согласно определению типа Category в схеме
    return [create_simple_result(
        id=category.id,
        name=category.name
    ) for category in categories]


def resolve_product_preview_image(product_obj, _info):
    preview_image = db.session.query(ProductImage).filter(ProductImage.id == product_obj.preview_image_id).first()

    if preview_image:
        return create_simple_result(
            id=preview_image.id,
            filename=preview_image.image_name,
            url=get_image_url(bucket_name=app.config.get("PRODUCTS_BUCKET"), object_name=preview_image.image_name)
        )
    return None


def resolve_product_images(product_obj, _info):
    # Поиск изображений по product.id
    images = db.session.query(ProductImage).filter(
        ProductImage.product_id == product_obj.id).all()

    # Создание результата по определению типа в gql схеме (type Image)
    result = [create_simple_result(
        id=image.id,
        filename=image.image_name,
        url=get_image_url(bucket_name=app.config.get("PRODUCTS_BUCKET"), object_name=image.image_name)
    ) for image in images]

    return result


def resolve_product_reviews(product_obj, _info):
    reviews = db.session.query(Review).filter(Review.product_id == product_obj.id).all()

    return reviews


def resolve_product_characteristics(product_obj, _info):
    # Список кортежей вида (ProductCharacteristic, Characteristic)
    query_result = db.session.query(ProductCharacteristic, Characteristic)\
        .join(Characteristic, Characteristic.id == ProductCharacteristic.characteristic_id)\
        .filter(ProductCharacteristic.product_id == product_obj.id).all()

    return query_result
