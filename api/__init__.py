import os

import dotenv
from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from minio import Minio

dotenv.load_dotenv()

app = Flask(__name__, instance_relative_config=True)
app.config.from_object(os.environ.get("FLASK_CONFIG"))
app.secret_key = os.environ.get("APP_SECRET_KEY")

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
        print(f"[MINIO] Создан бакит {bucket_name}")

# Подключение роутов, моделей, создание таблиц
from api.routes import *
from api.models import *  # Требуется для работы alembic
