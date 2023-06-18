import pytest

from core.extras import Errors
from tests import execute_query


def create_user_mutation(email, password):
    return ({
        "query":
        f"""mutation {{
            createUser(email: "{email}", password: "{password}") {{
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
                }}
            }}
        }}"""
    })


# Тест успешного создания пользователя
@pytest.mark.parametrize("email, password, first_name, last_name, address, phone_number", [
    ("asd@asd", "asd", "Markus", "Person", "Cool st", "5-500-505"),
    ("asd2@asd", "asd", "Markus2", "Person2", "Cool2 st", "5-500-506"),
])
def test_successful_create_user(client_with_valid_db, email, password, first_name, last_name, address, phone_number):
    result = execute_query(
        client=client_with_valid_db,
        query=create_user_mutation(email, password)
    )

    assert "errors" not in result
    assert result["data"]["createUser"]["status"] is True
    assert isinstance(result["data"]["createUser"]["user"]["id"], int)
    assert result["data"]["createUser"]["user"]["email"] == email


# Тест создания пользователя с занятым email
@pytest.mark.parametrize("email, password", [
    ("valid_email@example.com", "valid_password"),
])
def test_failed_create_user(client_with_valid_db, email, password):
    result = execute_query(
        client=client_with_valid_db,
        query=create_user_mutation(email=email, password=password)
    )

    assert "errors" not in result
    assert result["data"]["createUser"]["status"] is False
    assert result["data"]["createUser"]["errors"][0] == Errors.USER_ALREADY_EXISTS


# Тест с неверными данными
@pytest.mark.parametrize("email, password", [
    ("", ""),
])
def test_error_create_user(client_with_valid_db, email, password):
    result = execute_query(
        client=client_with_valid_db,
        query=create_user_mutation(email=email, password=password)
    )

    assert "errors" not in result
    assert result["data"]["createUser"]["status"] is False
    assert result["data"]["createUser"]["errors"][0] == Errors.WRONG_EMAIL_OR_PASSWORD