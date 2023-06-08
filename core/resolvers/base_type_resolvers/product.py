from typing import List, Dict, Optional

from core import app, db
from core.extras.creation_utils import create_image_type_result
from core.extras.resolver_utils import get_image_url
from core.models import Category, ProductImage, ProductCategory, Review, \
    ProductCharacteristic, Characteristic, Product


def resolve_product_id(product_obj: Product, _info) -> int:
    return product_obj.id


def resolve_product_name(product_obj: Product, _info) -> str:
    return product_obj.name


def resolve_product_price(product_obj: Product, _info) -> int:
    return product_obj.price


def resolve_product_amount(product_obj: Product, _info) -> int:
    return product_obj.amount


def resolve_product_reserved(product_obj: Product, _info) -> int:
    return product_obj.reserved


def resolve_product_description(product_obj: Product, _info) -> str:
    return product_obj.description


def resolve_product_categories(product_obj: Product, _info) -> List[Category]:
    categories = (
        db.session.query(Category)
        .join(ProductCategory)
        .filter(ProductCategory.product_id == product_obj.id)
        .all()
    )
    return categories


def resolve_product_preview_image(product_obj: Product, _info) -> Optional[
    Dict]:
    preview_image = (
        db.session.query(ProductImage)
        .filter(ProductImage.id == product_obj.preview_image_id)
        .first()
    )

    if preview_image:
        return create_image_type_result(
            image_id=preview_image.id,
            filename=preview_image.image_name,
            url=get_image_url(
                bucket_name=app.config.get("PRODUCTS_BUCKET"),
                object_name=preview_image.image_name
            )
        )
    return None


def resolve_product_images(product_obj: Product, _info) -> List[Dict]:
    # Поиск изображений по product.id
    product_images = (
        db.session.query(ProductImage)
        .filter(ProductImage.product_id == product_obj.id)
        .all()
    )

    # Создание результата по определению типа в gql схеме (type Image)
    result = [
        create_image_type_result(
            image_id=image.id,
            filename=image.image_name,
            url=get_image_url(
                bucket_name=app.config.get("PRODUCTS_BUCKET"),
                object_name=image.image_name
            )
        )
        for image in product_images
    ]
    return result


def resolve_product_reviews(product_obj: Product, _info) -> List[Review]:
    reviews = (
        db.session.query(Review)
        .filter(Review.product_id == product_obj.id)
        .all()
    )
    return reviews


def resolve_product_characteristics(product_obj: Product, _info) -> List[
    Dict[str, str]]:
    # Так как тип ProductCharacteristic используется только для описания
    # Product, то отдельного резолвера для него нет
    # result собирается согласно определению в Gql схеме

    query_result = (
        db.session.query(ProductCharacteristic, Characteristic)
        .join(Characteristic,
              Characteristic.id == ProductCharacteristic.characteristic_id)
        .filter(ProductCharacteristic.product_id == product_obj.id)
        .all()
    )

    gql_product_characteristic_list = [
        {
            "characteristicName": characteristic.name,
            "value": product_characteristic.value
        }
        for product_characteristic, characteristic in query_result
    ]

    return gql_product_characteristic_list
