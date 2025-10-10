import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './components/Home/HomePage';
import HotelsPage from './components/Hotels/HotelsPage';
import HotelDetailsPage from './components/HotelDetails/HotelDetailsPage';
import BookingsPage from './components/Bookings/BookingsPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup'; // ✅ Signup added

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header visible on all pages */}
        <Header />

        {/* Main content area where routes render */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/hotel/:id" element={<HotelDetailsPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} /> {/* ✅ Login */}
            <Route path="/signup" element={<Signup />} /> {/* ✅ Signup */}
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
