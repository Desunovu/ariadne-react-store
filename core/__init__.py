import logging
import os

import dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from minio import Minio

dotenv.load_dotenv()

# Создание экземпляра логгера
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)  # Установка уровня логирования
# Создание обработчика для вывода логов в консоль
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s - %(name)s - [%(levelname)s]  %(message)s")
console_handler.setFormatter(formatter)
# Создание обработчика для записи логов в файл
file_handler = logging.FileHandler("log.txt", encoding="UTF-8")
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(formatter)
# Привязка обработчиков к логгеру
logger.addHandler(console_handler)
logger.addHandler(file_handler)

# Приложение Flask
app = Flask(__name__, instance_relative_config=True)
app.config.from_object(os.environ.get("FLASK_CONFIG"))
app.secret_key = os.environ.get("APP_SECRET_KEY")
logger.info(f"FLASK-приложение запущено")

# CORS
CORS(app)

# Database
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# MinIO client
minio_client = Minio(
    endpoint=os.environ.get("MINIO_ENDPOINT"),
    access_key=os.environ.get("MINIO_ROOT_USER"),
    secret_key=os.environ.get("MINIO_ROOT_PASSWORD"),
    secure=False
)
buckets = ["PRODUCTS_BUCKET", "AVATARS_BUCKET"]
for bucket in buckets:
    bucket_name = os.environ.get(bucket)
    if not minio_client.bucket_exists(bucket_name=bucket_name):
        minio_client.make_bucket(bucket_name=bucket_name)
        logger.info(f"Создан бакит {bucket_name}")


# Подключение роутов, моделей, создание таблиц
from core.routes import *
from core.models import *  # Требуется для работы alembic
