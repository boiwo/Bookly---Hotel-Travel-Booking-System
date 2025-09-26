from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from models import db, User, Hotel, Booking
from datetime import datetime

# ========== APP CONFIG ==========
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///bookly.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "super-secret-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

db.init_app(app)
jwt = JWTManager(app)

# ========== HELPERS ==========
def is_admin(identity):
    return identity.get("is_admin", False)

# ========== AUTH ROUTES ==========
@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.json
    if not data or not all(k in data for k in ("username", "email", "password")):
        return jsonify({"msg": "Missing fields"}), 400

    if User.query.filter_by(email=data["email"]).first():
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

# ========== HOTEL ROUTES ==========
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

# ========== BOOKING ROUTES ==========
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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)


