from ariadne import convert_camel_case_to_snake
from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey

from core import db
from core.extras.common_constants import Roles, OrderStatus


class BaseMixin(db.Model):
    __abstract__ = True

    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)

    def update(self, **kwargs):
        for key, value in kwargs.items():
            snake_case_key = convert_camel_case_to_snake(key)
            if hasattr(self, snake_case_key):
                setattr(self, snake_case_key, value)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class User(BaseMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False, default=Roles.CUSTOMER)
    first_name = Column(String)
    last_name = Column(String)
    address = Column(String)
    phone_number = Column(String)


class Product(BaseMixin):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, default="DefaultProductName")
    price = Column(Integer, nullable=False, default=0)
    amount = Column(Integer, nullable=False, default=0)
    reserved = Column(Integer, nullable=False, default=0)
    description = Column(String, nullable=False, default="DefaultDescription")
    preview_image_id = Column(Integer, ForeignKey("product_images.id", ondelete="CASCADE"))


class Category(BaseMixin):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)


class ProductImage(BaseMixin):
    __tablename__ = "product_images"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"))
    image_name = Column(String, nullable=False)
    is_preview = Column(Boolean, nullable=False, default=False)


class ProductCategory(BaseMixin):
    __tablename__ = "product_categories"

    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), primary_key=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), primary_key=True)


class CartLine(BaseMixin):
    __tablename__ = "cartlines"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), primary_key=True)
    amount = Column(Integer, nullable=False, default=1)


class Review(BaseMixin):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"))
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"))
    rating = Column(Integer, nullable=False, default=5)
    text = Column(String)


class Order(BaseMixin):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"))
    creation_date = Column(Date, nullable=False)
    completion_date = Column(Date)
    delivery_address = Column(String, nullable=False)
    status = Column(String, nullable=False, default=OrderStatus.PROCESSING)


class OrderLine(BaseMixin):
    __tablename__ = "orderlines"

    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="SET NULL"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    amount = Column(Integer, nullable=False)


class FavoriteProduct(BaseMixin):
    __tablename__ = "favorite_products"

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), primary_key=True)
    addition_date = Column(String)


class Characteristic(BaseMixin):
    __tablename__ = "characteristics"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)


class ProductCharacteristic(BaseMixin):
    __tablename__ = "product_characteristics"

    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), primary_key=True)
    characteristic_id = Column(Integer, ForeignKey("characteristics.id", ondelete="CASCADE"), primary_key=True)
    value = Column(String)
