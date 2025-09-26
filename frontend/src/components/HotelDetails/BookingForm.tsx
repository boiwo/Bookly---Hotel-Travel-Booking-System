import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, CreditCard } from 'lucide-react';
import { Hotel } from '../../types';

interface BookingFormProps {
  hotel: Hotel;
}

const BookingForm: React.FC<BookingFormProps> = ({ hotel }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalPrice = nights * hotel.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return;

    setIsLoading(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newBooking = {
      id: Date.now().toString(),
      hotelId: hotel.id,
      hotelName: hotel.name,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      status: 'confirmed' as const,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // In a real app, this would be saved to a database
    localStorage.setItem('bookings', JSON.stringify([
      ...JSON.parse(localStorage.getItem('bookings') || '[]'),
      newBooking
    ]));

    setIsLoading(false);
    navigate('/bookings', { state: { newBooking } });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <h3 className="text-xl font-semibold mb-6">Book Your Stay</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-in Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-out Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guests
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
              <option value={5}>5+ Guests</option>
            </select>
          </div>
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>${hotel.price} × {nights} nights</span>
              <span>${hotel.price * nights}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Service fee</span>
              <span>$29</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Taxes</span>
              <span>${Math.round(totalPrice * 0.1)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${totalPrice + 29 + Math.round(totalPrice * 0.1)}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!checkIn || !checkOut || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          ) : (
            <>
              <CreditCard className="h-5 w-5" />
              <span>Book Now</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        You won't be charged yet. Free cancellation available.
      </div>
    </div>
  );
};

export default BookingForm;