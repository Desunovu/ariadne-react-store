import os
from datetime import timedelta

from werkzeug.security import generate_password_hash
from ariadne import convert_kwargs_to_snake_case

from api import app, db, minio_client
from api.extras import token_required, create_result, Errors, Roles
from api.models import User

avatars_bucket_name = os.environ.get("AVATARS_BUCKET")


@token_required()
@convert_kwargs_to_snake_case
def resolve_update_user(obj, info, **kwargs):
    user_id = info.context.current_user.id
    # Проверка на администратра при указании id
    if kwargs.get("id"):
        if info.context.current_user.role != Roles.ADMIN:
            return create_result(status=False, errors=[Errors.ACCESS_DENIED])
        user_id = kwargs["id"]

    # обновить поля user из переданных аргументов
    user = db.session.query(User).get(user_id)
    user.update(**kwargs)

    # Частные случаи полей
    if kwargs.get("password"):
        user.password = generate_password_hash(kwargs["password"])

    db.session.add(user)
    db.session.commit()
    return create_result(user=user)


@token_required()
def resolve_upload_avatar(_, info, **kwargs):
    user_id = kwargs.get("userId")

    # Проверка на права админа если указан не свой id
    if user_id != info.context.current_user.id and info.context.current_user.role != Roles.ADMIN:
        return create_result(status=False, errors=[Errors.ACCESS_DENIED], presignedUrl=None)

    try:
        presigned_url = minio_client.presigned_put_object(
            bucket_name=avatars_bucket_name,
            object_name=f"user_avatar_{user_id}.png",
            expires=timedelta(hours=1)
        )
    except:
        return create_result(status=False, errors=[Errors.IMAGES_NOT_UPLOADED], presignedUrl=None)

    return create_result(presignedUrl=presigned_url)
