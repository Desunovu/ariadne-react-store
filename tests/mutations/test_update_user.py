import pytest

from tests import execute_query, get_valid_user_token

user_result = """
                status
                errors {
                    code
                    message
                }
                user {
                    id
                    email
                    role
                    avatarUrl
                    firstName
                    lastName
                    address
                    phoneNumber
                }
"""


def update_user_mutation(email, first_name, last_name, address, phone_number):
    return ({
        "query":
        f"""mutation {{
            updateUser(
                email: "{email}",
                firstName: "{first_name}",
                lastName: "{last_name}",
                address: "{address}",
                phoneNumber: "{phone_number}",
            ) {{
                {user_result}
            }}
        }}"""
    })


def update_user_by_id_mutation(user_id, email, first_name, last_name, address, phone_number):
    return ({
        "query":
        f"""mutation {{
            updateUser(
                id: {user_id},
                email: "{email}",
                firstName: "{first_name}",
                lastName: "{last_name}",
                address: "{address}",
                phoneNumber: "{phone_number}",
            ) {{
                {user_result}
            }}
        }}"""
    })


# Тест успешного обновления пользователя самим пользователем
@pytest.mark.parametrize("email, first_name, last_name, address, phone_number",[
    ("asd@asd", "Markus", "Person", "Cool st", "5-500-505"),
])
def test_successful_update_user_by_user(client_with_valid_db, email, first_name, last_name, address, phone_number):
    result = execute_query(
        client=client_with_valid_db,
        token=get_valid_user_token(),
        query=update_user_mutation(email, first_name, last_name, address, phone_number),
    )

    assert "errors" not in result
    assert result["data"]["updateUser"]["status"] is True
    assert result["data"]["updateUser"]["user"]["email"] == email
    assert result["data"]["updateUser"]["user"]["firstName"] == first_name
    assert result["data"]["updateUser"]["user"]["lastName"] == last_name
    assert result["data"]["updateUser"]["user"]["address"] == address
    assert result["data"]["updateUser"]["user"]["phoneNumber"] == phone_number


# Тест успешного обновления пользователя администратором
@pytest.mark.parametrize("user_id, email, first_name, last_name, address, phone_number",[
    (1, "asd@asd", "Markus", "Person", "Cool st", "5-500-505"),
])
def test_successful_update_user_by_admin(client_with_valid_db, user_id, email, first_name, last_name, address, phone_number):
    result = execute_query(
        client=client_with_valid_db,
        token=get_valid_user_token(admin=True),
        query=update_user_by_id_mutation(user_id, email, first_name, last_name, address, phone_number),
    )

    assert "errors" not in result
    assert result["data"]["updateUser"]["status"] is True
    assert result["data"]["updateUser"]["user"]["email"] == email
    assert result["data"]["updateUser"]["user"]["firstName"] == first_name
    assert result["data"]["updateUser"]["user"]["lastName"] == last_name
    assert result["data"]["updateUser"]["user"]["address"] == address
    assert result["data"]["updateUser"]["user"]["phoneNumber"] == phone_number
