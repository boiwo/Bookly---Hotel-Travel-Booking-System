# seed.py
from app import app, db
from models import User, Hotel, Product
from werkzeug.security import generate_password_hash

def create_user():
    username = input("Enter username: ")
    email = input("Enter email: ")
    password = input("Enter password: ")
    is_admin = input("Is admin? (y/n): ").lower() == "y"

    if User.query.filter((User.username == username) | (User.email == email)).first():
        print(f"❌ User '{username}' or email '{email}' already exists!")
        return

    user = User(username=username, email=email, is_admin=is_admin)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    print(f"✅ User '{username}' created successfully!")

def create_hotel():
    name = input("Enter hotel name: ")
    location = input("Enter hotel location: ")
    price = float(input("Enter hotel price per night: "))

    if Hotel.query.filter_by(name=name).first():
        print(f"❌ Hotel '{name}' already exists!")
        return

    hotel = Hotel(name=name, location=location, price=price)
    db.session.add(hotel)
    db.session.commit()
    print(f"🏨 Hotel '{name}' created successfully!")

def create_product():
    name = input("Enter product name: ")
    price = float(input("Enter product price: "))
    description = input("Enter product description: ")

    if Product.query.filter_by(name=name).first():
        print(f"❌ Product '{name}' already exists!")
        return

    product = Product(name=name, price=price, description=description)
    db.session.add(product)
    db.session.commit()
    print(f"📦 Product '{name}' created successfully!")

if __name__ == "__main__":
    with app.app_context():
        while True:
            print("\nSeeding options:")
            print("1. Create User")
            print("2. Create Hotel")
            print("3. Create Product")
            print("4. Exit")
            choice = input("Choose an option (1-4): ")

            if choice == "1":
                create_user()
            elif choice == "2":
                create_hotel()
            elif choice == "3":
                create_product()
            elif choice == "4":
                print("Exiting seeding script.")
                break
            else:
                print("❌ Invalid choice")

