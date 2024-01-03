from typing import Tuple

from core.models import CartLine, Product


def resolve_cartine_product(cartline_product_tuple: Tuple[CartLine, Product],
                            _info) -> Product:
    return cartline_product_tuple[1]


def resolve_cartline_amount(cartline_product_tuple: Tuple[CartLine, Product],
                            _info) -> int:
    return cartline_product_tuple[0].amount
