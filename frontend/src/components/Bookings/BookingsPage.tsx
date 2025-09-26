import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, MapPin, Users, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Booking } from '../../types';
import { bookings as mockBookings } from '../../data/mockData';

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const location = useLocation();
  const newBooking = location.state?.newBooking;

  useEffect(() => {
    // Load bookings from localStorage (in a real app, this would be from an API)
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const allBookings = [...mockBookings, ...storedBookings];
    setBookings(allBookings);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    );
    setBookings(updatedBookings);
    
    // Update localStorage
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedStoredBookings = storedBookings.map((booking: Booking) =>
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updatedStoredBookings));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h1>
          <p className="text-gray-600">Manage your hotel reservations</p>
        </div>

        {newBooking && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-green-800">Booking Confirmed!</h3>
                <p className="text-green-700">Your reservation at {newBooking.hotelName} has been confirmed.</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {bookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-6">Start planning your next trip by browsing our hotels.</p>
              <a
                href="/hotels"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Browse Hotels
              </a>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.hotelName}</h3>
                      <div className="flex items-center space-x-1 mb-2">
                        {getStatusIcon(booking.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">${booking.totalPrice}</div>
                      <div className="text-sm text-gray-600">Total</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">Check-in</div>
                        <div className="text-sm text-gray-600">{booking.checkIn}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">Check-out</div>
                        <div className="text-sm text-gray-600">{booking.checkOut}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">Guests</div>
                        <div className="text-sm text-gray-600">{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Booked on {booking.createdAt}
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={`/hotel/${booking.hotelId}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                      >
                        View Hotel
                      </a>
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;