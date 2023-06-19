from typing import Type

from flask.testing import FlaskClient
from werkzeug.security import generate_password_hash

from core import db, create_app
from core.extras import Roles
from core.models import User
from core.resolvers.queries.signin import resolve_login_user

app = create_app()


def execute_query(client, token, query):
    rv = client.post(
        "/graphql",
        json=query,
        headers={"x-access-token": f"{token}"}
    )
    result = rv.get_json()
    return result


def create_test_users():
    user = User(
        email="valid_email@example.com",
        password=generate_password_hash("valid_password"),
        role=Roles.CUSTOMER,
        first_name="Женя",
        last_name="Васечкин",
        phone_number="asd123"
    )
    admin = User(
        email="admin@example.com",
        password=generate_password_hash("valid_password"),
        role=Roles.ADMIN,
        first_name="Админ",
        last_name="Админов",
    )
    db.session.add(user)
    db.session.add(admin)
    db.session.commit()


def get_user_id_by_role(role=Roles.CUSTOMER):
    user = db.session.query(User).filter(User.role == role).first()
    return user.id


def get_token_by_role(role=Roles.CUSTOMER):
    """Использует резолвер типа loginUser для получения токена пользователя"""
    if role == Roles.CUSTOMER:
        email = "valid_email@example.com"
        password = "valid_password"
    elif role == Roles.ADMIN:
        email = "admin@example.com"
        password = "valid_password"
    else:
        return ""

    token = resolve_login_user(
        _obj=None,
        _info=None,
        email=email,
        password=password
    )["token"]
    return token


def delete_all_from_table(model):
    # Очистка таблицы после выполнения теста
    db.session.query(model).delete()
    db.session.commit()
