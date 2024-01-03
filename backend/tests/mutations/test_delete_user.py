from core.extras import Errors, Roles
from tests import execute_query, get_token_by_role, get_user_id_by_role


def delete_user_mutation(user_id):
    return ({
        "query":
        f"""mutation {{
            deleteUser(id: {user_id}) {{
                status
                errors {{
                    code
                    message
                }}
            }}
        }}"""
    })


def test_successful_delete_user(client_with_valid_db):
    """
    Проверяет успешное удаление пользователя.
    Запрос выполняется администратором по отношению к покупателю.
    """
    result = execute_query(
        client=client_with_valid_db,
        token=get_token_by_role(Roles.ADMIN),
        query=delete_user_mutation(user_id=get_user_id_by_role(Roles.CUSTOMER))
    )

    assert "errors" not in result
    assert result["data"]["deleteUser"]["status"] is True


def test_failed_delete_user_by_admin(client_with_valid_db):
    """
    Проверяет неудачное удаление пользователя администратором.
    Передается id несуществующего пользователя (hardcode 999999999)
    """
    result = execute_query(
        client=client_with_valid_db,
        token=get_token_by_role(Roles.ADMIN),
        query=delete_user_mutation(user_id=999999999)
    )

    assert "errors" not in result
    assert result["data"]["deleteUser"]["status"] is False
    assert result["data"]["deleteUser"]["errors"][0] == Errors.OBJECT_NOT_FOUND


def test_failed_delete_user_by_customer(client_with_valid_db):
    """
    Проверяет выполнение запроса от роли без доступа
    """
    result = execute_query(
        client=client_with_valid_db,
        token=get_token_by_role(Roles.CUSTOMER),
        query=delete_user_mutation(user_id=get_user_id_by_role(Roles.CUSTOMER))
    )

    assert "errors" in result
