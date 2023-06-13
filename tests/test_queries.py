import pytest

from core import app


@pytest.fixture
def test_client():
    with app.test_client() as client:
        yield client


def execute_query(client, query):
    rv = client.post("/graphql", json=query)
    result = rv.get_json()
    return result


@pytest.mark.parametrize("email, password", [
    ("asd@asd", "asd"),
    ("asd2@asd2", "asd")
])
def test_login_user(test_client, email, password):
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

    result = execute_query(client=test_client, query=login_user_query)

    assert "errors" not in result
    assert result["data"]["loginUser"]["status"] is True
    assert isinstance(result["data"]["loginUser"]["token"], str)
