import datetime

from core import db, logger
from core.extras import token_required, create_result, Errors
from core.models import Product, FavoriteProduct


@token_required()
def resolve_product_add_to_favorites(_obj, info, **kwargs):
    """Добавляет товар в список избранных для текущего пользователя"""

    user_id = info.context.current_user.id

    # Проверка существует ли товар
    product = Product.query.get(kwargs.get("productId"))
    if not product:
        return create_result(status=False, errors=[Errors.OBJECT_NOT_FOUND])

    # Поиск уже существующей записи в избранном
    existing_favorite_product = (
        FavoriteProduct.query
        .filter_by(user_id=user_id,product_id=product.id)
        .first()
    )

    if not existing_favorite_product:
        try:
            new_favorite_product = FavoriteProduct(
                user_id=user_id,
                product_id=product.id,
                addition_date=datetime.date.today()
            )
            db.session.add(new_favorite_product)
        except Exception as e:
            logger.error(e)
            return create_result(
                status=False,
                errors=[Errors.CANT_MANAGE_FAVORITE_PRODUCT]
            )

    db.session.commit()
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
