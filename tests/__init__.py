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


def get_valid_user_token():
    """Использует резолвер типа loginUser для получения токена пользователя"""
    token = resolve_login_user(
        _obj=None,
        _info=None,
        email="valid_email@example.com",
        password="valid_password"
    )["token"]
    return token

def delete_all_from_table(model):
    # Очистка таблицы после выполнения теста
    db.session.query(model).delete()
    db.session.commit()
