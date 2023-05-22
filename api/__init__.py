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
product_bucket = minio_client.bucket_exists(os.environ.get("PRODUCTS_BUCKET"))
if not product_bucket:
    minio_client.make_bucket(os.environ.get("PRODUCTS_BUCKET"))

# Подключение роутов, моделей, создание таблиц
from api.routes import *
from api.models import *  # Требуется для работы alembic
