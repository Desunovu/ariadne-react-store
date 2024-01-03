from core.models import Characteristic


# Characteristic
def resolve_characteristic_id(characteristic_obj: Characteristic,
                              _info) -> int:
    return characteristic_obj.id


def resolve_characteristic_name(characterictic_obj: Characteristic,
                                _info) -> str:
    return characterictic_obj.name
