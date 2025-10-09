from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

# ========= USER MODEL =========
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    bookings = db.relationship("Booking", backref="user", lazy=True)

    def set_password(self, password):
        """Hashes and stores user password"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Verifies user password"""
        return check_password_hash(self.password_hash, password)


# ========= HOTEL MODEL =========
class Hotel(db.Model):
    __tablename__ = "hotels"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String, nullable=True)  # ✅ Added image_url

    bookings = db.relationship("Booking", backref="hotel", lazy=True)

    def as_dict(self):
        """Return a dictionary representation of the hotel"""
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "price": self.price,
            "description": self.description,
            "image_url": self.image_url,
        }


# ========= PRODUCT MODEL =========
class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)

    def as_dict(self):
        """Return a dictionary representation of the product"""
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
        }


# ========= BOOKING MODEL =========
class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    hotel_id = db.Column(db.Integer, db.ForeignKey("hotels.id"), nullable=False)
    check_in = db.Column(db.Date, nullable=False)
    check_out = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def as_dict(self):
        """Return a dictionary representation of the booking"""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "hotel_id": self.hotel_id,
            "hotel_name": self.hotel.name,
            "check_in": self.check_in.strftime("%Y-%m-%d"),
            "check_out": self.check_out.strftime("%Y-%m-%d"),
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
