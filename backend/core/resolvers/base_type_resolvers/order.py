# datetime.date преобразуется к строке в serializer
from datetime import date
from typing import List

from core import db
from core.models import OrderLine, Order


def resolve_order_id(order_obj: Order, _info) -> int:
    return order_obj.id


def resolve_order_user_id(order_obj: Order, _info) -> int:
    return order_obj.user_id


def resolve_order_creation_date(order_obj: Order, _info) -> date:
    return order_obj.creation_date


def resolve_order_completion_date(order_obj: Order, _info) -> date:
    return order_obj.completion_date


def resolve_order_delivery_address(order_obj: Order, _info) -> str:
    return order_obj.delivery_address


def resolve_order_status(order_obj: Order, _info) -> str:
    return order_obj.status


def resolve_order_lines(order_obj: Order, _info) -> List[OrderLine]:
    orderlines = (
        db.session.query(OrderLine)
        .filter(OrderLine.order_id == order_obj.id)
        .all()
    )
    return orderlines
