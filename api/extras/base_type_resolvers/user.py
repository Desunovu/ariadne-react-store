# В resolver верхнего уровня возвращается объект api.models.User
import os

import api.models
from api.extras.resolver_utils import get_image_url


def resolve_user_id(user_obj, _info):
    return user_obj.id


def resolve_user_email(user_obj, _info):
    return user_obj.email


def resolve_user_role(user_obj, _info):
    return user_obj.role


def resolve_user_avatar_url(user_obj: api.models.User, _info):
    object_name = f"user_avatar_{user_obj.id}.png"
    try:
        avatar_url = get_image_url(bucket_name=os.environ.get("AVATARS_BUCKET"),
                                   object_name=object_name)
    except Exception as ex:
        print(ex)
        avatar_url = None
    return avatar_url


def resolve_user_first_name(user_obj, _info):
    return user_obj.first_name


def resolve_user_last_name(user_obj, _info):
    return user_obj.last_name


def resolve_user_address(user_obj, _info):
    return user_obj.address


def resolve_user_phone_number(user_obj, _info):
    return user_obj.phone_number
