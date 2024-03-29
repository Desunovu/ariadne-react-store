import os

from ariadne import (
    load_schema_from_path,
    make_executable_schema,
    upload_scalar,
    ScalarType
)

from core.resolvers.base_type_resolvers import (
    user_type,
    product_type,
    cartline_type,
    review_type,
    order_type,
    orderline_type,
    characteristic_type
)
from core.resolvers.mutations import mutation
from core.resolvers.queries import query

# Тип Date
date_scalar = ScalarType("Date")


@date_scalar.serializer
def serialize_date(value):
    return value.isoformat()


# Загрузка определений из каталога schema
type_defs = load_schema_from_path(
    os.path.join(os.path.dirname(__file__), "schema")
)

# Создание объекта схемы
schema = make_executable_schema(
    type_defs,
    [
        query,
        mutation,
        user_type,
        product_type,
        cartline_type,
        review_type,
        order_type,
        orderline_type,
        characteristic_type,
        upload_scalar,
        date_scalar
    ]
)
