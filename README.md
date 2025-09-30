📌 Bookly – Hotel & Travel Booking System

A full-stack web application for hotel and travel bookings.
Users can browse hotels, register/login, and make bookings, while admins can manage hotels.

🚀 Features
🔑 Authentication

User registration & login (JWT authentication)

Profile endpoint to fetch logged-in user details

🏨 Hotels

List available hotels

View hotel details

Add, update, delete hotels (admin only)

📅 Bookings

Create a booking

View user bookings

Update a booking

Cancel a booking


🏗️ Project Structure

Bookly - Hotel & Travel Booking/
│── backend/                 
│   ├── app.py               
│   ├── models.py           
│   ├── seed.py              
│
│── frontend/                
│   ├── src/                 
│   ├── public/              
│   ├── package.json         
│   ├── vite.config.ts       
│
│── .gitignore
│── README.md


⚙️ Tech Stack
Backend

Python (Flask)

Flask-SQLAlchemy (ORM)

Flask-JWT-Extended (JWT authentication)

SQLite (default DB, can switch to Postgres/MySQL)

Frontend

React (Vite)
Javascript

Tailwind CSS

2️⃣ Backend Setup

cd backend
python3 -m venv venv
source venv/bin/activate   # On Windows use venv\Scripts\activate
pip install -r requirements.txt

Run database seed:

python seed.py

Start server:

python app.py

API runs at 👉 http://127.0.0.1:5000

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs at 👉 http://127.0.0.1:5173

🔗 API Endpoints
Auth

POST /api/auth/register → Register user

POST /api/auth/login → Login & get JWT

GET /api/auth/profile → Get logged-in user profile

Hotels

POST /api/hotels → Add hotel (admin only)

GET /api/hotels → List hotels

GET /api/hotels/:id → Hotel details

PUT /api/hotels/:id → Update hotel (admin only)

DELETE /api/hotels/:id → Delete hotel (admin only)

Bookings

POST /api/bookings → Create booking

GET /api/bookings → Get user bookings

PUT /api/bookings/:id → Update booking

DELETE /api/bookings/:id → Cancel booking
POST /api/hotels → Add hotel (admin only)

GET /api/hotels → List hotels

GET /api/hotels/:id → Hotel details

PUT /api/hotels/:id → Update hotel (admin only)

DELETE /api/hotels/:id → Delete hotel (admin only)

Bookings

POST /api/bookings → Create booking

GET /api/bookings → Get user bookings

PUT /api/bookings/:id → Update booking

DELETE /api/bookings/:id → Cancel booking

🧪 Testing with Postman

Import provided Postman collection (if included)

Start backend & frontend servers

Test endpoints with http://127.0.0.1:5000/api/...

📌 Future Improvements

Payment integration

Search & filter hotels

Admin dashboard (React)

Docker support

👨‍💻 Author

Developed by Boiwo Benard 🚀