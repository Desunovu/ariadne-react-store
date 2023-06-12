from typing import List

from core import db
from core.extras import token_required, create_result
from core.extras.utils.resolver_utils import (
    query_sort,
    query_pagination,
    get_user_id_from_kwargs_or_current_user
)
from core.models import Order


@token_required()
def resolve_get_orders(_obj, info, **kwargs) -> List[Order]:
    """
    Запрос получения заказов
        Для администратора разрешено указать id для получения заказов любого
        пользователя
    """
    user_id = get_user_id_from_kwargs_or_current_user(
        current_user=info.context.current_user,
        kwargs=kwargs
    )

    query = db.session.query(Order).filter(Order.user_id == user_id)
    query = query_sort(query=query, resolver_args=kwargs)
    query = query_pagination(query=query, resolver_args=kwargs)
    orders = query.all()

    return create_result(orders=orders)
