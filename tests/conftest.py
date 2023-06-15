import pytest
from werkzeug.security import generate_password_hash

from core import app, db, User, Roles


@pytest.fixture
def login_test_client():
    with app.app_context():
        user = User(
            email="asd@asd",
            password=generate_password_hash("asd"),
            role=Roles.CUSTOMER,
            first_name="Женя",
            last_name="Васечкин",
            phone_number="asd123"
        )
        db.session.add(user)
        db.session.commit()

        with app.test_client() as client:
            yield client

        # TODO отчистка таблицы после записи
