from core.extras import Errors, Roles
from tests import execute_query, get_token_by_role, get_random_product_id, LARGE_ID, make_sort_and_pagination_args


def get_products_query(offset=None, limit=None, field=None, order=None):
    """Формирует запрос getProducts"""

    args = make_sort_and_pagination_args(offset, limit, field, order)
    return ({
        "query":
        f"""{{
            getProducts{args} {{
                status
                errors {{
                    code
                    message
                }}
                products {{
                    id
                    name
                    price
                    amount
                    reserved
                    description
                    categories {{
                        id
                        name
                    }}
                    previewImage {{
                        id
                        filename
                        url
                    }}
                    images {{
                        id
                        filename
                        url
                    }}
                    reviews {{
                        id
                        userId
                        productId
                        rating
                        text
                    }}
                    characteristics {{
                        characteristicName
                        value
                    }}
                }}
            }}
        }}"""
    })


def test_successful_get_products(client_with_valid_db):
    """Тест выполнения запроса getProducts"""
    result = execute_query(
        client=client_with_valid_db,
        token=get_token_by_role(Roles.CUSTOMER),
        query=get_products_query(
            offset=0,
            limit=2,
            field="id",
            order="DESC"
        )
    )

    assert "errors" not in result
    assert result["data"]["getProducts"]["status"] is True
    # возвращен список из 2х товаров
    assert len(result["data"]["getProducts"]["products"]) == 2
    # id по убыванию (DESC)
    assert result["data"]["getProducts"]["products"][0]["id"] > \
           result["data"]["getProducts"]["products"][1]["id"]
