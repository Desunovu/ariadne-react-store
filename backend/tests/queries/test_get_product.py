from core.extras import Errors, Roles
from tests import execute_query, get_token_by_role, get_random_product_id, LARGE_ID


def get_product_query(product_id):
    """Формирует запрос getProduct"""
    return ({
        "query":
        f"""{{
            getProduct(id: {product_id}) {{
                status
                errors {{
                    code
                    message
                }}
                product {{
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


def test_successful_get_product(client_with_valid_db):
    """Тест выполнения запроса getProduct"""
    product_id = get_random_product_id()
    result = execute_query(
        client=client_with_valid_db,
        token=get_token_by_role(Roles.CUSTOMER),
        query=get_product_query(product_id)
    )

    assert "errors" not in result
    assert result["data"]["getProduct"]["status"] is True
    assert result["data"]["getProduct"]["product"]["id"] == product_id


def test_failed_get_product(client_with_valid_db):
    """
    Тест неуспешного выполнения запроса getProduct.
    В тесте указан id несуществующего товара
    """
    result = execute_query(
        client=client_with_valid_db,
        token=get_token_by_role(Roles.CUSTOMER),
        query=get_product_query(LARGE_ID)
    )

    assert "errors" not in result
    assert result["data"]["getProduct"]["status"] is False
    assert result["data"]["getProduct"]["errors"][0] == Errors.OBJECT_NOT_FOUND
