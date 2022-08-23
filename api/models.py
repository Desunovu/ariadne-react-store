from api import db
from sqlalchemy import Column, Integer, String, ForeignKey


class BaseMixin(db.Model):
    __abstract__ = True

    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class User(BaseMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    role = Column(String)


class Product(BaseMixin):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Integer, default=0)
    amount = Column(Integer, default=0)
    description = Column(String, default="Нет описания")


class Category(BaseMixin):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)


class ProductCategory(BaseMixin):
    __tablename__ = "product_categories"

    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), primary_key=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), primary_key=True)


class Cart(BaseMixin):
    __tablename__ = "carts"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)


class CartLine(BaseMixin):
    __tablename__ = "cartlines"
    
    cart_id = Column(Integer, ForeignKey("carts.id", ondelete="CASCADE"), primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), primary_key=True)
    amount = Column(Integer, nullable=False, default=1)
