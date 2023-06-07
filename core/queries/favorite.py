from core import db
from core.models import FavoriteProduct, Product
from core.extras import token_required, create_result


@token_required()
def resolve_get_favourite_products(_obj, info, **kwargs):
    products = db.session.query(Product)\
        .join(FavoriteProduct)\
        .filter(FavoriteProduct.user_id == info.context.current_user.id)\
        .all()

    return create_result(products=products)
