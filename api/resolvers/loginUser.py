import datetime

import jwt
from flask import request
from werkzeug.security import check_password_hash

from api.resolvers.common.common import create_result, WRONG_EMAIL_OR_PASSWORD_ERROR
from api.models import User
from api import app, db


def resolve_login_user(_obj, _info, email, password):
    user = db.session.query(User).filter(User.email == email).first()
    if user and check_password_hash(user.password, password):
        token = jwt.encode(payload={"id": user.id, "exp": datetime.datetime.now() + datetime.timedelta(days=7)},
                           key=app.secret_key, algorithm="HS256")
        return create_result(token=token)
    else:
        return create_result(status=False, errors=[WRONG_EMAIL_OR_PASSWORD_ERROR])
