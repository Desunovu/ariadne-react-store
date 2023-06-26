from core.extras import Roles
from tests import execute_query, get_token_by_role, \
    make_sort_and_pagination_args


def get_users_query(offset=None, limit=None, field=None, order=None):
    """Формирует запрос для получения информации о пользователях."""

    args = make_sort_and_pagination_args(offset, limit, field, order)
    return ({
        "query":
        f"""{{
            getUsers{args} {{
                status
                errors {{
                    code
                    message
                }}
                users {{
                    id
                    email
                    role
                    avatarUrl
                    firstName
                    lastName
                    address
                    phoneNumber
                }}
            }}
        }}"""
    })


def test_successful_get_all_users_by_admin_with_args(client_with_valid_db):
    """Тест выполнения запроса getUsers без аргументов"""
    result = execute_query(
        client=client_with_valid_db,
        token=get_token_by_role(Roles.ADMIN),
        query=get_users_query(
            offset=0,
            limit=2,
            field="id",
            order="DESC"
        )
    )

    assert "errors" not in result
    assert result["data"]["getUsers"]["status"] is True
    # возвращен список из 2х пользователей
    assert len(result["data"]["getUsers"]["users"]) == 2
    # id по убыванию (DESC)
    assert result["data"]["getUsers"]["users"][0]["id"] > \
           result["data"]["getUsers"]["users"][1]["id"]


def test_failed_get_users_by_customer(client_with_valid_db):
    """
    Тест выполнения запроса getUsers не администратором.
    Ожидается ошибка доступа по роли
    """
    result = execute_query(
        client=client_with_valid_db,
        token=get_token_by_role(Roles.CUSTOMER),
        query=get_users_query()
    )

    assert "errors" in result
