import os

from core.extras.resolver_utils import get_image_url

avatars_bucket = os.environ.get("AVATARS_BUCKET")


def resolve_user_id(user_obj: 'core.models.User', _info) -> int:
    return user_obj.id


def resolve_user_email(user_obj: 'core.models.User', _info) -> str:
    return user_obj.email


def resolve_user_role(user_obj: 'core.models.User', _info) -> str:
    return user_obj.role


def resolve_user_avatar_url(user_obj: 'core.models.User', _info) -> str:
    object_name = f"user_avatar_{user_obj.id}.png"
    return get_image_url(bucket_name=avatars_bucket, object_name=object_name)


def resolve_user_first_name(user_obj: 'core.models.User', _info) -> str:
    return user_obj.first_name


def resolve_user_last_name(user_obj: 'core.models.User', _info) -> str:
    return user_obj.last_name


def resolve_user_address(user_obj: 'core.models.User', _info) -> str:
    return user_obj.address


def resolve_user_phone_number(user_obj: 'core.models.User', _info) -> str:
    return user_obj.phone_number
