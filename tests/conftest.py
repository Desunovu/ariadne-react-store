import pytest
from flask.testing import FlaskClient

from core.models import User, Product
from tests import delete_all_from_table, create_test_users, app, \
    create_test_products


@pytest.fixture
def client_with_valid_db() -> FlaskClient:
    """
    Создает клиент Flask с валидной базой данных для выполнения тестов.

    Yields:
        FlaskClient: Клиент Flask для выполнения запросов.
    """
    with app.app_context():
        # Создать записи для тестов
        create_test_users()
        create_test_products()

        with app.test_client() as client:
            yield client

        # Очистить таблицы от записей
        for model in [User, Product]:
            delete_all_from_table(model)
