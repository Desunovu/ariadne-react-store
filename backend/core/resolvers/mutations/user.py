import os
from datetime import timedelta

from werkzeug.security import generate_password_hash

from core import db, minio_client
from core.extras import token_required, create_result, Errors, Roles
from core.extras.utils.resolver_utils import \
    get_user_id_from_kwargs_or_current_user
from core.models import User

avatars_bucket_name = os.environ.get("AVATARS_BUCKET")


@token_required()
def resolve_update_user(_obj, info, **kwargs):
    user_id = info.context.current_user.id
    # Проверка на администратра при указании id
    if kwargs.get("id"):
        if info.context.current_user.role != Roles.ADMIN:
            return create_result(status=False, errors=[Errors.ACCESS_DENIED])
        user_id = kwargs["id"]

    # обновить поля user из переданных аргументов
    user = db.session.query(User).get(user_id)
    if not user:
        return create_result(status=False, errors=[Errors.OBJECT_NOT_FOUND])
    user.update(**kwargs)

    # Частные случаи полей
    if kwargs.get("password"):
        user.password = generate_password_hash(kwargs["password"])

    db.session.add(user)
    db.session.commit()
    return create_result(user=user)


@token_required()
def resolve_upload_avatar(_obj, info, **kwargs):
    user_id = get_user_id_from_kwargs_or_current_user(
        current_user=info.context.current_user,
        kwargs=kwargs
    )

    presigned_url = minio_client.presigned_put_object(
        bucket_name=avatars_bucket_name,
        object_name=f"user_avatar_{user_id}.png",
        expires=timedelta(hours=1)
    )

    return create_result(presignedUrl=presigned_url)
