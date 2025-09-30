
from app import app, db, Hotel

HOTELS = [
    {
        "name": "Sunset Resort",
        "location": "Mombasa",
        "price": 120,
        "description": "Beachside resort with ocean views",
        "image_url": "https://picsum.photos/id/1018/600/400"
    },
    {
        "name": "Mountain Lodge",
        "location": "Naivasha",
        "price": 90,
        "description": "Cozy mountain view retreat",
        "image_url": "https://picsum.photos/id/1015/600/400"
    },
    {
        "name": "City Inn",
        "location": "Nairobi",
        "price": 75,
        "description": "Affordable city stay close to transport",
        "image_url": "https://picsum.photos/id/1025/600/400"
    },
    {
        "name": "Lakeview Hotel",
        "location": "Kisumu",
        "price": 110,
        "description": "Relax by the lakeside with amazing sunsets",
        "image_url": "https://picsum.photos/id/1020/600/400"
    },
]

def seed_hotels():
    with app.app_context():
        db.create_all()
        for h in HOTELS:
            if not Hotel.query.filter_by(name=h["name"]).first():
                db.session.add(Hotel(**h))
        db.session.commit()
        print("✅ Hotels seeded!")

if __name__ == "__main__":
    seed_hotels()
