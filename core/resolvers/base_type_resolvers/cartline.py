from typing import Tuple

from core.models import CartLine, Product


def resolve_cartine_product(cartline_product_tuple: Tuple[CartLine, Product],
                            _info):
    return cartline_product_tuple[1]


def resolve_cartline_amount(cartline_product_tuple: Tuple[CartLine, Product],
                            _info):
    return cartline_product_tuple[0].amount
