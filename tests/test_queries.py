import pytest

from core.extras import Errors
from tests import execute_query


def login_user_query(email, password):
    return({
        "query": f"""{{
            loginUser(email: "{email}", password: "{password}") {{
                status
                errors {{
                    code
                    message
                }}
                token
            }}
        }}"""
    })


# Тест удачной авторизации
@pytest.mark.parametrize("email, password", [
    ("valid_email@example.com", "valid_password"),
])
def test_successful_login(login_test_client, email, password):
    result = execute_query(
        client=login_test_client,
        query=login_user_query(email, password)
    )

    assert "errors" not in result
    assert result["data"]["loginUser"]["status"] is True
    assert isinstance(result["data"]["loginUser"]["token"], str)


# Тест неудачной авторизации
@pytest.mark.parametrize("email, password", [
    ("invalid_email@example.com", "invalid_password"),
    ("valid_email@example.com", "wrong_password"),
    ("wrong_email@example.com", "valid_password"),
])
def test_failed_login(login_test_client, email, password):
    result = execute_query(
        client=login_test_client,
        query=login_user_query(email, password)
    )

    assert "errors" not in result
    assert result["data"]["loginUser"]["status"] is False
    assert result["data"]["loginUser"]["token"] is None
    assert result["data"]["loginUser"]["errors"][0] == Errors.WRONG_EMAIL_OR_PASSWORD