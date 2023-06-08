from typing import List

from core import db
from core.extras import token_required, create_result
from core.extras.resolver_utils import query_sort, query_pagination, \
    check_and_get_user_id
from core.models import Order


@token_required()
def resolve_get_orders(_obj, info, **kwargs) -> List[Order]:
    """
    Запрос получения заказов
        Для администратора разрешено указать id для получения заказов любого
        пользователя
    """
    user_id = check_and_get_user_id(
        current_user=info.context.current_user,
        kwargs=kwargs
    )

    query = db.session.query(Order).filter(Order.user_id == user_id)
    query = query_sort(query=query, resolver_args=kwargs)
    query = query_pagination(query=query, resolver_args=kwargs)
    orders = query.all()

    return create_result(orders=orders)
