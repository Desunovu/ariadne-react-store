import logging
import os

import dotenv
from flask import Flask, Blueprint
from flask_cors import CORS
from flask_migrate import Migrate, upgrade
from flask_sqlalchemy import SQLAlchemy
from minio import Minio

# Если не обнаружены переменные окружения - загрузить из .env
if not os.environ.get("FLASK_CONFIG"):
    dotenv.load_dotenv()

# Объекты модуля CORE
db = SQLAlchemy()
migrate = Migrate()
minio_client = Minio(
        endpoint=os.environ.get("MINIO_ENDPOINT"),
        access_key=os.environ.get("MINIO_ROOT_USER"),
        secret_key=os.environ.get("MINIO_ROOT_PASSWORD"),
        secure=False
    )
logger = logging.getLogger(__name__)
graphql_bp = Blueprint("graphql", __name__)


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(os.environ.get("FLASK_CONFIG"))
    app.secret_key = os.environ.get("APP_SECRET_KEY")
    app.register_blueprint(graphql_bp)

    configure_logging()
    configure_database(app)
    configure_storage()
    configure_extensions(app)
    return app


def configure_extensions(app):
    CORS(app)


def configure_database(app):
    db.init_app(app)
    migrate.init_app(app, db)

    # Применение upgrade
    with app.app_context():
        # Получаем путь к текущему скрипту
        app_dir = os.path.abspath(os.path.dirname(__file__))
        # Поднимаемся на уровень вверх
        parent_dir = os.path.dirname(app_dir)
        # Составляем путь до директории migrations
        migrations_dir = os.path.join(parent_dir, 'migrations')
        # Обновляем базу данных
        upgrade(directory=migrations_dir)


def configure_storage():
    # Проверка, созданы ли бакиты
    buckets = ["PRODUCTS_BUCKET", "AVATARS_BUCKET"]
    for bucket in buckets:
        bucket_name = os.environ.get(bucket)
        if not minio_client.bucket_exists(bucket_name=bucket_name):
            minio_client.make_bucket(bucket_name=bucket_name)
            logger.info(f"Создан бакит {bucket_name}")


def configure_logging():
    # Создание экземпляра логгера
    logger.setLevel(logging.DEBUG)  # Установка уровня логирования
    # Создание обработчика для вывода логов в консоль
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - [%(levelname)s]  %(message)s")
    console_handler.setFormatter(formatter)
    # Создание обработчика для записи логов в файл
    file_handler = logging.FileHandler("log.txt", encoding="UTF-8")
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(formatter)
    # Привязка обработчиков к логгеру
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)


from core import routes, models
