from functools import wraps
from typing import Callable

import jwt
from flask import request, current_app

from core import db, logger
from core.models import User
from .common_constants import Roles, UnauthorizedError, ForbiddenError


def token_required(allowed_roles=None) -> Callable:
    """
    Декоратор для проверки наличия и валидности токена авторизации.

    Параметры:
    - allowed_roles (list): Роли, которым разрешен доступ (по умолчанию
    - Roles.CUSTOMER и Roles.ADMIN).
    """
    if allowed_roles is None:
        allowed_roles = [Roles.CUSTOMER, Roles.ADMIN]

    def authorize(func: Callable) -> Callable:
        @wraps(func)
        def decorated_view(*args, **kwargs):

            token = get_token_from_request()
            # Получение пользователя из базы
            current_user = get_user_from_token(token=token)
            # Проверка роли
            check_user_role(user=current_user, allowed_roles=allowed_roles)
            # Запись в контекст ariadne
            set_current_user_context(user=current_user, args=args)

            return func(*args, **kwargs)

        return decorated_view

    return authorize


def get_token_from_request() -> str:
    """
    Получает токен из заголовков запроса.

    Возвращает:
    - str: Токен авторизации.

    Исключения:
    - UnauthorizedError: Если токен отсутствует в заголовках запроса.
    """
    token = request.headers.get('x-access-token')
    if not token:
        logger.warning(f"Клиент {request.remote_addr} не передал токен")
        raise UnauthorizedError("Unauthorized")
    return token


def get_user_from_token(token: str) -> User:
    """
    Получает пользователя из базы данных по токену авторизации.

    Параметры:
    - token (str): Токен авторизации.

    Возвращает:
    - User: Объект пользователя из базы данных.

    Исключения:
    - UnauthorizedError: Если токен недействительный или
    пользователь не найден в базе данных.
    """
    try:
        data = jwt.decode(jwt=token, key=current_app.secret_key, algorithms='HS256')
    except jwt.exceptions.InvalidTokenError:
        logger.warning(
            f"Клиент {request.remote_addr} передал неправильный токен"
        )
        raise UnauthorizedError("Unauthorized")

    current_user = db.session.query(User).get(data['id'])
    if not current_user:
        logger.warning(
            f"Клиент {request.remote_addr} передал верный токен, но "
            f"пользователя нет в базе"
        )
        raise UnauthorizedError("Unauthorized")

    return current_user


def check_user_role(user: User, allowed_roles: list):
    """
    Проверяет, имеет ли пользователь нужную для доступа роль

    Параметры:
    - user (User): Объект пользователя.
    - allowed_roles (list): Роли, которым разрешен доступ.

    Исключения:
    - ForbiddenError: Если пользователь не имеет разрешенных ролей.
    """
    if user.role not in allowed_roles:
        raise ForbiddenError("Forbidden")


def set_current_user_context(user: User, args: tuple):
    """
    Записывает текущего пользователя в контекст резолвера.

    Параметры:
    - user (User): Объект пользователя.
    - args (tuple): Аргументы декорированной функции.
    """
    args[1].context.current_user = user
