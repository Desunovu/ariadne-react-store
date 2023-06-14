import pytest

from core import app


# TODO Апгрейд и заполнение базы данными перед тестами

@pytest.fixture
def test_client():
    with app.test_client() as client:
        yield client