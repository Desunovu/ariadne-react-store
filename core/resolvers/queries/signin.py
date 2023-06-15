import datetime

import jwt
from flask import current_app
from werkzeug.security import check_password_hash

from core import db
from core.extras import create_result, Errors
from core.models import User


def resolve_login_user(_obj, _info, email, password):
    """
    Запрос авторизации пользователя
    Возвращает
        LoginResult!
    """
    user = db.session.query(User).filter(User.email == email).first()

    # Неверный Email или пароль
    if not (user and check_password_hash(user.password, password)):
        return create_result(status=False, errors=[Errors.WRONG_EMAIL_OR_PASSWORD])

    token = jwt.encode(payload={"id": user.id, "exp": datetime.datetime.now() + datetime.timedelta(days=7)},
                       key=current_app.secret_key, algorithm="HS256")
    return create_result(token=token)
