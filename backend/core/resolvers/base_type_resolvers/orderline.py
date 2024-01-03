from core import db
from core.models import Product, OrderLine


def resolve_orderline_product(orderline_obj: OrderLine, _info) -> Product:
    product = (
        db.session.query(Product)
        .get(orderline_obj.product_id)
    )
    return product


def resolve_orderline_amount(orderline_obj: OrderLine, _info) -> int:
    return orderline_obj.amount
