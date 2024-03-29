from typing import Dict


def create_error(code=0, message="Нет доступа"):
    return {"code": code, "message": message}


def create_simple_result(**kwargs):
    return kwargs


def create_result(status=True, errors=None, **kwargs):
    if errors is None:
        errors = []
    result = {
        "status": status,
        "errors": errors
    }
    return result | kwargs


def create_image_type_result(image_id: int, filename: str, url: str) -> Dict:
    image = {
        "id": image_id,
        "filename": filename,
        "url": url
    }
    return image
