from functools import wraps

import jwt
from flask import request, session

from core import app, db
from core.models import User
from .common_constants import Roles, UnauthorizedError, ForbiddenError


def token_required(allowed_roles=None):
    if allowed_roles is None:
        allowed_roles = [Roles.CUSTOMER, Roles.ADMIN]

    def token_required_wrapper(func):
        @wraps(func)
        def decorated_view(*args, **kwargs):
            token = None
            current_user = None
            if 'x-access-token' in request.headers:
                token = request.headers['x-access-token']
            else:
                raise UnauthorizedError("Unauthorized")

            try:
                data = jwt.decode(jwt=token, key=app.secret_key, algorithms='HS256')
            except jwt.exceptions.InvalidTokenError:
                raise UnauthorizedError("Unauthorized")

            current_user = db.session.query(User).get(data['id'])
            if not current_user:
                raise UnauthorizedError("Unauthorized")

            # Проверка доступа роли
            if not current_user.role in allowed_roles:
                raise ForbiddenError("Forbidden")
            
            # Запись в сессию фласка / контекст ariadne
            # session["current_user"] = current_user
            args[1].context.current_user = current_user

            return func(*args, **kwargs)

        return decorated_view
    return token_required_wrapper
