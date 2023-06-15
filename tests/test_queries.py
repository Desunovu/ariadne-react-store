import pytest

from tests import execute_query


@pytest.mark.parametrize("email, password", [
    ("asd@asd", "asd"),
])
def test_login_user(login_test_client, email, password):
    login_user_query = {
        "query":
            """{ loginUser(email: "%s", password: "%s") {
                status
                errors {
                    message
                }
                token
            }
            }""" % (email, password)
    }

    result = execute_query(client=login_test_client, query=login_user_query)

    assert "errors" not in result
    assert result["data"]["loginUser"]["status"] is True
    assert isinstance(result["data"]["loginUser"]["token"], str)
