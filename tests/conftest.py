import pytest
from werkzeug.security import generate_password_hash

from core import create_app, db
from core.extras import Roles
from core.models import User


@pytest.fixture
def test_app():
    app = create_app()

    yield app


@pytest.fixture
def login_test_client(test_app):
    with test_app.app_context():
        user = User(
            email="asd@asd",
            password=generate_password_hash("asd"),
            role=Roles.CUSTOMER,
            first_name="Женя",
            last_name="Васечкин",
            phone_number="asd123"
        )
        db.session.query(User).delete()
        db.session.add(user)
        db.session.commit()

        with test_app.test_client() as client:
            yield client

        # TODO отчистка таблицы после записи
        db.session.query(User).delete()
        db.session.commit()
