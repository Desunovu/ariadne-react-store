from typing import List, Tuple

from core import db
from core.extras import token_required, create_result
from core.extras.resolver_utils import (
    calculate_cart_total,
    check_and_get_user_id
)
from core.models import User, CartLine, Product


@token_required()
def resolve_get_cart(_obj, info, **kwargs):
    """
    Запрос получения корзины
        Для администратора разрешено указать id для получения корзины любого
        пользователя
    """
    user_id = check_and_get_user_id(
        current_user=info.context.current_user,
        kwargs=kwargs
    )

    cartline_product_query_output: List[Tuple[CartLine, Product]] = (
        db.session.query(CartLine, Product)
        .join(Product)
        .join(User)
        .filter(User.id == user_id)
        .all()
    )

    cart_total = calculate_cart_total(cartline_product_query_output)
    return create_result(cart=cartline_product_query_output,
                         cartTotal=cart_total)
