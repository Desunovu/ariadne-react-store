from core.extras import Errors, Roles
from tests import execute_query, get_token_by_role, get_user_id_by_role


def get_user_query(user_id=None):
    """Формирует запрос для получения информации о пользователе."""
    args = ""
    if user_id:
        args = f"(id: {user_id})"
    return ({
        "query":
        f"""{{
            getUser{args} {{
                status
                errors {{
                    code
                    message
                }}
                user {{
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


def test_successful_get_own_user_info_success(client_with_valid_db):
    """
    Тест выполнения запроса getUser для получения информации о собственном
    аккаунте.
    Ожидается успешное выполнение.
    """
    result = execute_query(
        client=client_with_valid_db,
        token=get_token_by_role(Roles.CUSTOMER),
        query=get_user_query()
    )

    assert "errors" not in result
    assert result["data"]["getUser"]["status"] is True
    assert result["data"]["getUser"]["user"]["role"] == Roles.CUSTOMER


def test_failed_get_other_user_info_unauthorized(client_with_valid_db):
    """
    Тест выполнения запроса getUser для получения информации о чужом аккаунте,
    выполненный не администратором
    Ожидается ошибка доступа.
    """
    result = execute_query(
        client=client_with_valid_db,
        token=get_token_by_role(Roles.CUSTOMER),
        query=get_user_query(user_id=get_user_id_by_role(Roles.ADMIN))
    )

    assert "errors" not in result
    assert result["data"]["getUser"]["status"] is False
    assert result["data"]["getUser"]["errors"][0] == Errors.ACCESS_DENIED


def testa_successful_get_other_user_info_as_admin(client_with_valid_db):
    """
    Тест выполнения запроса getUser для получения информации о чужом аккаунте,
    выполненный администратором
    Ожидается успешное выполнение.
    """
    result = execute_query(
        client=client_with_valid_db,
        token=get_token_by_role(Roles.ADMIN),
        query=get_user_query(user_id=get_user_id_by_role(Roles.CUSTOMER))
    )

    assert "errors" not in result
    assert result["data"]["getUser"]["status"] is True
    assert result["data"]["getUser"]["user"]["role"] == Roles.CUSTOMER
