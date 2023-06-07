import datetime

from ariadne import convert_kwargs_to_snake_case

from core import db
from core.extras import token_required, create_result, Errors
from core.models import Product, FavoriteProduct


@token_required()
def resolve_product_add_to_favorites(_obj, info, **kwargs):
    product = db.session.query(Product).get(kwargs.get("productId"))
    if not product:
        create_result(status=False, errors=[Errors.OBJECT_NOT_FOUND])

    try:
        db.session.add(
            FavoriteProduct(
                user_id=info.context.current_user.id,
                product_id=product.id,
                addition_date=datetime.date.today()
            )
        )
        db.session.commit()
    except Exception:
        return create_result(status=False, errors=[Errors.CANT_MANAGE_FAVORITE_PRODUCT])

    return create_result(product=product)


@token_required()
def resolve_remove_product_from_favorites(_obj, info, **kwargs):
    favorite_product = db.session.query(FavoriteProduct).filter_by(user_id=info.context.current_user.id,
                                                                   product_id=kwargs.get("productId")).first()
    if not favorite_product:
        return create_result(status=False, errors=[Errors.OBJECT_NOT_FOUND])

    print(favorite_product)

    try:
        db.session.delete(favorite_product)
        db.session.commit()
    except Exception:
        return create_result(status=False, errors=[Errors.CANT_MANAGE_FAVORITE_PRODUCT])

    return create_result()
