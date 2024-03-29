import os

from ariadne import convert_kwargs_to_snake_case
from werkzeug.security import generate_password_hash

from core import db
from core.extras import create_result, Errors, Roles
from core.models import User


@convert_kwargs_to_snake_case
def resolve_create_user(obj, info, **kwargs):
    if not kwargs.get("email") or not kwargs.get("password"):
        return create_result(status=False, errors=[Errors.WRONG_EMAIL_OR_PASSWORD])
    user = db.session.query(User).filter(User.email == kwargs["email"]).first()
    if user:
        return create_result(status=False, errors=[Errors.USER_ALREADY_EXISTS])

    # Создать экземляр User, задать роль в соответствии с конфигом, в поле пароля поместить его хэш
    user = User(**kwargs, role=Roles.CUSTOMER)
    if os.environ.get("FLASK_CONFIG") == "config.DevelopmentConfig":
        user.role = Roles.ADMIN
    user.password = generate_password_hash(kwargs["password"])
    db.session.add(user)
    db.session.commit()
    return create_result(user=user)
