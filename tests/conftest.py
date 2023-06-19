import pytest
from flask.testing import FlaskClient

from core.models import User
from tests import delete_all_from_table, create_test_users, app


@pytest.fixture
def client_with_valid_db() -> FlaskClient:
    """
    Создает клиент Flask с валидной базой данных для выполнения тестов.

    Yields:
        FlaskClient: Клиент Flask для выполнения запросов.
    """
    with app.app_context():
        # Создать пользователей
        delete_all_from_table(User)
        create_test_users()

        with app.test_client() as client:
            yield client

        delete_all_from_table(User)
