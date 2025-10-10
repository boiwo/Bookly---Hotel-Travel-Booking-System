from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

# ========== APP CONFIG ==========
app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///bookly.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# ========== MODELS ==========
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    bookings = db.relationship("Booking", backref="user", lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def as_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_admin": self.is_admin
        }


class Hotel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))

    bookings = db.relationship("Booking", backref="hotel", lazy=True)

    def as_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "price": self.price,
            "description": self.description,
            "image_url": self.image_url
        }


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))

    def as_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "image_url": self.image_url
        }


class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    hotel_id = db.Column(db.Integer, db.ForeignKey("hotel.id"), nullable=False)
    check_in = db.Column(db.Date, nullable=False)
    check_out = db.Column(db.Date, nullable=False)

    def as_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "user_name": self.user.username if self.user else None,
            "hotel_id": self.hotel_id,
            "hotel_name": self.hotel.name if self.hotel else None,
            "check_in": self.check_in.strftime("%Y-%m-%d"),
            "check_out": self.check_out.strftime("%Y-%m-%d")
        }


# ========== ROUTES ==========
@app.route("/")
def home():
    return jsonify({"message": "Welcome to Bookly API"})


# -------- LOGIN ONLY --------
@app.route("/api/login", methods=["POST"])
def login_user():
    data = request.json or {}

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 401

    if not user.check_password(password):
        return jsonify({"error": "Invalid password"}), 401

    return jsonify({"message": "Login successful", "user": user.as_dict()}), 200


@app.route("/api/users", methods=["GET"])
def list_users():
    users = User.query.all()
    return jsonify([u.as_dict() for u in users])


# -------- HOTELS --------
@app.route("/api/hotels", methods=["POST"])
def add_hotel():
    data = request.json or {}
    hotel = Hotel(**data)
    db.session.add(hotel)
    db.session.commit()
    return jsonify({"message": "Hotel added", "hotel": hotel.as_dict()}), 201


@app.route("/api/hotels", methods=["GET"])
def list_hotels():
    hotels = Hotel.query.all()
    return jsonify([h.as_dict() for h in hotels])


@app.route("/api/hotels/<int:id>", methods=["GET"])
def hotel_details(id):
    hotel = Hotel.query.get_or_404(id)
    return jsonify(hotel.as_dict())


@app.route("/api/hotels/<int:id>", methods=["PUT"])
def update_hotel(id):
    hotel = Hotel.query.get_or_404(id)
    for key, value in request.json.items():
        setattr(hotel, key, value)
    db.session.commit()
    return jsonify({"message": "Hotel updated", "hotel": hotel.as_dict()})


@app.route("/api/hotels/<int:id>", methods=["DELETE"])
def delete_hotel(id):
    hotel = Hotel.query.get_or_404(id)
    db.session.delete(hotel)
    db.session.commit()
    return jsonify({"message": "Hotel deleted"})


# -------- PRODUCTS --------
@app.route("/api/products", methods=["POST"])
def add_product():
    data = request.json or {}
    product = Product(**data)
    db.session.add(product)
    db.session.commit()
    return jsonify({"message": "Product added", "product": product.as_dict()}), 201


@app.route("/api/products", methods=["GET"])
def list_products():
    return jsonify([p.as_dict() for p in Product.query.all()])


@app.route("/api/products/<int:id>", methods=["GET"])
def product_details(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.as_dict())


@app.route("/api/products/<int:id>", methods=["PUT"])
def update_product(id):
    product = Product.query.get_or_404(id)
    for key, value in request.json.items():
        setattr(product, key, value)
    db.session.commit()
    return jsonify({"message": "Product updated", "product": product.as_dict()})


@app.route("/api/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted"})


# -------- BOOKINGS --------
@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.json
    try:
        booking = Booking(
            user_id=data["user_id"],
            hotel_id=data["hotel_id"],
            check_in=datetime.strptime(data["check_in"], "%Y-%m-%d"),
            check_out=datetime.strptime(data["check_out"], "%Y-%m-%d")
        )
        db.session.add(booking)
        db.session.commit()
        return jsonify({"message": "Booking created", "booking": booking.as_dict()}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/bookings", methods=["GET"])
def list_bookings():
    bookings = Booking.query.all()
    return jsonify([b.as_dict() for b in bookings])


@app.route("/api/bookings/<int:id>", methods=["DELETE"])
def delete_booking(id):
    booking = Booking.query.get_or_404(id)
    db.session.delete(booking)
    db.session.commit()
    return jsonify({"message": "Booking deleted"})


# ========== RUN APP ==========
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    print("🚀 Bookly API running on http://127.0.0.1:5001")
    app.run(host="0.0.0.0", port=5001, debug=True)
