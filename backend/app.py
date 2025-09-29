from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta

# ========== APP CONFIG ==========
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///bookly.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "super-secret-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

db = SQLAlchemy(app)
jwt = JWTManager(app)

# ========== MODELS ==========
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Hotel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255))


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255))


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
            "hotel_id": self.hotel_id,
            "check_in": self.check_in.strftime("%Y-%m-%d"),
            "check_out": self.check_out.strftime("%Y-%m-%d")
        }

# ========== HELPERS ==========
def is_admin(identity):
    return identity.get("is_admin", False)

# ========== ROUTES ==========
@app.route("/")
def home():
    return jsonify({"msg": "Welcome to Bookly API"})

# -------- AUTH --------
@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.json
    if not data or not all(k in data for k in ("username", "email", "password")):
        return jsonify({"msg": "Missing fields"}), 400

    if User.query.filter((User.email==data["email"]) | (User.username==data["username"])).first():
        return jsonify({"msg": "User already exists"}), 400

    user = User(username=data["username"], email=data["email"])
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully"}), 201


@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get("email")).first()
    if user and user.check_password(data.get("password")):
        token = create_access_token(identity={"id": user.id, "is_admin": user.is_admin})
        return jsonify({"access_token": token}), 200
    return jsonify({"msg": "Invalid credentials"}), 401


@app.route("/api/auth/profile", methods=["GET"])
@jwt_required()
def profile():
    identity = get_jwt_identity()
    user = User.query.get(identity["id"])
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "is_admin": user.is_admin
    })

# -------- HOTELS --------
@app.route("/api/hotels", methods=["POST"])
@jwt_required()
def add_hotel():
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Admins only"}), 403
    data = request.json
    hotel = Hotel(**data)
    db.session.add(hotel)
    db.session.commit()
    return jsonify({"msg": "Hotel added", "id": hotel.id}), 201


@app.route("/api/hotels", methods=["GET"])
def list_hotels():
    return jsonify([{
        "id": h.id,
        "name": h.name,
        "location": h.location,
        "price": h.price,
        "description": h.description
    } for h in Hotel.query.all()])


@app.route("/api/hotels/<int:id>", methods=["GET"])
def hotel_details(id):
    hotel = Hotel.query.get_or_404(id)
    return jsonify({
        "id": hotel.id,
        "name": hotel.name,
        "location": hotel.location,
        "price": hotel.price,
        "description": hotel.description
    })


@app.route("/api/hotels/<int:id>", methods=["PUT"])
@jwt_required()
def update_hotel(id):
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Admins only"}), 403
    hotel = Hotel.query.get_or_404(id)
    for key, value in request.json.items():
        setattr(hotel, key, value)
    db.session.commit()
    return jsonify({"msg": "Hotel updated"})


@app.route("/api/hotels/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_hotel(id):
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Admins only"}), 403
    hotel = Hotel.query.get_or_404(id)
    db.session.delete(hotel)
    db.session.commit()
    return jsonify({"msg": "Hotel deleted"})

# -------- PRODUCTS --------
@app.route("/api/products", methods=["POST"])
@jwt_required()
def add_product():
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Admins only"}), 403
    data = request.json
    product = Product(**data)
    db.session.add(product)
    db.session.commit()
    return jsonify({"msg": "Product added", "id": product.id}), 201


@app.route("/api/products", methods=["GET"])
def list_products():
    return jsonify([{
        "id": p.id,
        "name": p.name,
        "price": p.price,
        "description": p.description
    } for p in Product.query.all()])


@app.route("/api/products/<int:id>", methods=["GET"])
def product_details(id):
    product = Product.query.get_or_404(id)
    return jsonify({
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "description": product.description
    })


@app.route("/api/products/<int:id>", methods=["PUT"])
@jwt_required()
def update_product(id):
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Admins only"}), 403
    product = Product.query.get_or_404(id)
    for key, value in request.json.items():
        setattr(product, key, value)
    db.session.commit()
    return jsonify({"msg": "Product updated"})


@app.route("/api/products/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_product(id):
    if not is_admin(get_jwt_identity()):
        return jsonify({"msg": "Admins only"}), 403
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"msg": "Product deleted"})

# -------- BOOKINGS --------
@app.route("/api/bookings", methods=["POST"])
@jwt_required()
def create_booking():
    identity = get_jwt_identity()
    data = request.json
    try:
        booking = Booking(
            user_id=identity["id"],
            hotel_id=data["hotel_id"],
            check_in=datetime.strptime(data["check_in"], "%Y-%m-%d"),
            check_out=datetime.strptime(data["check_out"], "%Y-%m-%d")
        )
        db.session.add(booking)
        db.session.commit()
        return jsonify({"msg": "Booking created", "id": booking.id}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400


@app.route("/api/bookings", methods=["GET"])
@jwt_required()
def get_bookings():
    identity = get_jwt_identity()
    bookings = Booking.query.filter_by(user_id=identity["id"]).all()
    return jsonify([b.as_dict() for b in bookings])


@app.route("/api/bookings/<int:id>", methods=["PUT"])
@jwt_required()
def update_booking(id):
    identity = get_jwt_identity()
    booking = Booking.query.get_or_404(id)
    if booking.user_id != identity["id"]:
        return jsonify({"msg": "Not your booking"}), 403
    for key, value in request.json.items():
        if key in ["check_in", "check_out"]:
            value = datetime.strptime(value, "%Y-%m-%d")
        setattr(booking, key, value)
    db.session.commit()
    return jsonify({"msg": "Booking updated"})


@app.route("/api/bookings/<int:id>", methods=["DELETE"])
@jwt_required()
def cancel_booking(id):
    identity = get_jwt_identity()
    booking = Booking.query.get_or_404(id)
    if booking.user_id != identity["id"]:
        return jsonify({"msg": "Not your booking"}), 403
    db.session.delete(booking)
    db.session.commit()
    return jsonify({"msg": "Booking canceled"})

# ========== RUN APP ==========
if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # automatically create tables if they don't exist
    app.run(host="0.0.0.0", port=5000, debug=True)
