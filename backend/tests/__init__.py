from typing import Type

from flask.testing import FlaskClient
from werkzeug.security import generate_password_hash

from core import db, create_app
from core.extras import Roles
from core.models import User, Product
from core.resolvers.queries.signin import resolve_login_user

LARGE_ID = 999999999

app = create_app()


def execute_query(client: FlaskClient, token: str, query: dict) -> dict:
    """
    Выполняет запрос GraphQL.

    Args:
        client (FlaskClient): Flask-клиент для отправки запроса.
        token (str): Токен доступа пользователя.
        query (dict): Запрос в формате JSON.

    Returns:
        dict: Результат выполнения запроса.
    """
    rv = client.post(
        "/graphql",
        json=query,
        headers={"x-access-token": f"{token}"}
    )
    result = rv.get_json()
    return result


def create_test_users():
    """
    Создает тестовых пользователей в базе данных.
    """
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


def create_test_products():
    """Создает записи о товарах в БД для тестирования"""
    product_1 = Product(
        name="One",
        price=1,
        amount=1,
        reserved=0,
        desctiption="Товар 1"
    )
    product_2 = Product(
        name="Two",
        price=2,
        amount=2,
        reserved=0,
        desctiption="Товар 2"
    )

    for product in [product_1, product_2]:
        db.session.add(product)
    db.session.commit()


def get_user_id_by_role(role: str = Roles.CUSTOMER) -> int:
    """
    Возвращает идентификатор пользователя с указанной ролью.

    Args:
        role (str): Роль пользователя. По умолчанию - CUSTOMER.

    Returns:
        int: Идентификатор пользователя.
    """
    user = db.session.query(User).filter(User.role == role).first()
    return user.id


def get_random_product_id() -> int:
    """Возвращает первый найденный id товара"""
    product = db.session.query(Product).first()
    return product.id


def get_token_by_role(role: str = Roles.CUSTOMER) -> str:
    """
    Возвращает токен доступа пользователя с указанной ролью.

    Args:
        role (str): Роль пользователя. По умолчанию - CUSTOMER.

    Returns:
        str: Токен доступа пользователя.
    """
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


def delete_all_from_table(model: Type[db.Model]):
    """
    Очищает таблицу от всех записей модели.

    Args:
        model: Модель базы данных.
    """
    db.session.query(model).delete()
    db.session.commit()


def make_sort_and_pagination_args(offset=None, limit=None, field=None, order=None):
    """Создает строку аргументов запроса для сортировки и пагинации."""

    pagination = ""
    if offset is not None or limit is not None:
        pagination = f"pagination: {{offset: {offset}, limit: {limit}}}"

    sort = ""
    if field is not None or order is not None:
        sort = f"sort: {{field: {field}, order: {order}}}"

    args = ", ".join(filter(None, [pagination, sort]))
    return f"({args})" if args else ""
