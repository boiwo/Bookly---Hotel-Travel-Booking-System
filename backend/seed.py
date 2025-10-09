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
            description="Beachside resort with ocean views, infinity pool, and seafood dining.",
            image_url="https://images.unsplash.com/photo-1667125095636-dce94dcbdd96?w=500&auto=format&fit=crop&q=60"
        ),
        Hotel(
            name="Mountain Lodge",
            location="Naivasha",
            price=90,
            description="Cozy mountain retreat surrounded by lush greenery and hiking trails.",
            image_url="https://images.unsplash.com/photo-1660731513683-4cb0c9ac09b8?w=500&auto=format&fit=crop&q=60"
        ),
        Hotel(
            name="City Inn",
            location="Nairobi",
            price=75,
            description="Affordable city hotel with modern amenities and great access to public transport.",
            image_url="https://images.unsplash.com/photo-1559414059-34fe0a59e57a?w=500&auto=format&fit=crop&q=60"
        ),
        Hotel(
            name="Savannah Retreat",
            location="Amboseli",
            price=140,
            description="Luxury retreat with views of Mount Kilimanjaro, offering guided safari excursions.",
            image_url="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=60"
        ),
        Hotel(
            name="Lakeside Haven",
            location="Kisumu",
            price=110,
            description="Relaxing lakeside hotel with boat rides and sunset dinners on Lake Victoria.",
            image_url="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&auto=format&fit=crop&q=80"
        ),
        Hotel(
            name="Desert Pearl",
            location="Turkana",
            price=95,
            description="Cultural resort offering traditional huts, desert tours, and stargazing nights.",
            image_url="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80"
        ),
        Hotel(
            name="Rainforest Escape",
            location="Kakamega",
            price=130,
            description="Eco-friendly lodge deep in the rainforest, perfect for birdwatching and relaxation.",
            image_url="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80"
        ),
    ]

    db.session.bulk_save_objects(hotels)
    db.session.commit()
    print("✅ 7 Hotels seeded successfully!")

if __name__ == "__main__":
    with app.app_context():
        seed_hotels()
