import pytest

from core.models import User
from tests import delete_all_from_table, create_valid_user, app


@pytest.fixture
def client_with_valid_db():
    with app.app_context():
        delete_all_from_table(User)
        create_valid_user()

        with app.test_client() as client:
            yield client

        delete_all_from_table(User)
