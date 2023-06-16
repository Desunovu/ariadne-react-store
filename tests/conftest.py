import pytest
from werkzeug.security import generate_password_hash

from core import create_app, db
from core.extras import Roles
from core.models import User


def create_valid_user():
    user = User(
        email="valid_email@example.com",
        password=generate_password_hash("valid_password"),
        role=Roles.CUSTOMER,
        first_name="Женя",
        last_name="Васечкин",
        phone_number="asd123"
    )
    db.session.add(user)
    db.session.commit()


def delete_all_from_table(model):
    # Очистка таблицы после выполнения теста
    db.session.query(model).delete()
    db.session.commit()


@pytest.fixture
def test_app():
    app = create_app()

    yield app


@pytest.fixture
def login_test_client(test_app):
    with test_app.app_context():
        delete_all_from_table(User)
        create_valid_user()

        with test_app.test_client() as client:
            yield client

        delete_all_from_table(User)
