# seed.py
from app import app, db, Hotel

def seed_hotels():
    # Drop and recreate tables
    db.drop_all()
    db.create_all()

    hotels = [
        Hotel(
            name="Sunset Resort",
            location="Mombasa",
            price=120,
            description="Beachside resort",
            image_url="https://images.unsplash.com/photo-1667125095636-dce94dcbdd96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
        ),
        Hotel(
            name="Mountain Lodge",
            location="Naivasha",
            price=90,
            description="Cozy mountain view",
            image_url="https://images.unsplash.com/photo-1660731513683-4cb0c9ac09b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
        ),
        Hotel(
            name="City Inn",
            location="Nairobi",
            price=75,
            description="Affordable city stay",
            image_url="https://images.unsplash.com/photo-1559414059-34fe0a59e57a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
        ),
    ]

    db.session.bulk_save_objects(hotels)
    db.session.commit()
    print("✅ Hotels seeded successfully!")

if __name__ == "__main__":
    with app.app_context():  # 🔑 fix here
        seed_hotels()
