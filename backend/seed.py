# seed.py
from app import app, db
from models import User, Hotel
from werkzeug.security import generate_password_hash

def create_user():
    username = input("Enter username: ")
    email = input("Enter email: ")
    password = input("Enter password: ")
    is_admin = input("Is admin? (y/n): ").lower() == "y"

    user = User(
        username=username,
        email=email,
        password=generate_password_hash(password),
        is_admin=is_admin
    )
    db.session.add(user)
    db.session.commit()
    print(f"✅ User '{username}' created successfully!")

def create_hotel():
    name = input("Enter hotel name: ")
    location = input("Enter location: ")
    price = float(input("Enter price per night: "))

    hotel = Hotel(
        name=name,
        location=location,
        price=price
    )
    db.session.add(hotel)
    db.session.commit()
    print(f"🏨 Hotel '{name}' created successfully!")

if __name__ == "__main__":
    with app.app_context():
        print("Seeding options:")
        print("1. Create User")
        print("2. Create Hotel")
        choice = input("Choose an option (1/2): ")

        if choice == "1":
            create_user()
        elif choice == "2":
            create_hotel()
        else:
            print("❌ Invalid choice")
