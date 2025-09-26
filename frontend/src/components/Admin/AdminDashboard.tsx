import React, { useState } from 'react';
import { Plus, CreditCard as Edit, Trash2, Eye, Users, Calendar, DollarSign } from 'lucide-react';
import { hotels, bookings } from '../../data/mockData';
import { Hotel, Booking } from '../../types';
import HotelForm from './HotelForm';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'hotels' | 'bookings'>('overview');
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [hotelsList, setHotelsList] = useState<Hotel[]>(hotels);
  const [bookingsList] = useState<Booking[]>(bookings);

  const totalRevenue = bookingsList.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const confirmedBookings = bookingsList.filter(b => b.status === 'confirmed').length;

  const handleAddHotel = () => {
    setEditingHotel(null);
    setShowHotelForm(true);
  };

  const handleEditHotel = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setShowHotelForm(true);
  };

  const handleDeleteHotel = (hotelId: string) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      setHotelsList(hotelsList.filter(h => h.id !== hotelId));
    }
  };

  const handleSaveHotel = (hotelData: Omit<Hotel, 'id'>) => {
    if (editingHotel) {
      // Update existing hotel
      setHotelsList(hotelsList.map(h => 
        h.id === editingHotel.id 
          ? { ...hotelData, id: editingHotel.id }
          : h
      ));
    } else {
      // Add new hotel
      const newHotel: Hotel = {
        ...hotelData,
        id: Date.now().toString()
      };
      setHotelsList([...hotelsList, newHotel]);
    }
    setShowHotelForm(false);
    setEditingHotel(null);
  };

  const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-opacity-20 ${color.replace('border-', 'bg-')}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'hotels', label: 'Hotels' },
              { key: 'bookings', label: 'Bookings' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                title="Total Hotels"
                value={hotelsList.length}
                icon={<Eye className="h-6 w-6 text-blue-600" />}
                color="border-blue-500"
              />
              <StatCard
                title="Total Bookings"
                value={bookingsList.length}
                icon={<Calendar className="h-6 w-6 text-green-600" />}
                color="border-green-500"
              />
              <StatCard
                title="Confirmed Bookings"
                value={confirmedBookings}
                icon={<Users className="h-6 w-6 text-purple-600" />}
                color="border-purple-500"
              />
              <StatCard
                title="Total Revenue"
                value={`$${totalRevenue.toLocaleString()}`}
                icon={<DollarSign className="h-6 w-6 text-orange-600" />}
                color="border-orange-500"
              />
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Hotel</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Check-in</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Check-out</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Guests</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Total</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingsList.slice(0, 5).map(booking => (
                      <tr key={booking.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">{booking.hotelName}</td>
                        <td className="py-3 px-4">{booking.checkIn}</td>
                        <td className="py-3 px-4">{booking.checkOut}</td>
                        <td className="py-3 px-4">{booking.guests}</td>
                        <td className="py-3 px-4">${booking.totalPrice}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hotels' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Hotel Management</h2>
              <button
                onClick={handleAddHotel}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Hotel</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Hotel</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Rating</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Featured</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotelsList.map(hotel => (
                      <tr key={hotel.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <img src={hotel.image} alt={hotel.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <div className="font-semibold">{hotel.name}</div>
                              <div className="text-sm text-gray-600">{hotel.reviews} reviews</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{hotel.location}</td>
                        <td className="py-3 px-4">${hotel.price}/night</td>
                        <td className="py-3 px-4">{hotel.rating}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            hotel.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {hotel.featured ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditHotel(hotel)}
                              className="text-blue-600 hover:text-blue-700 p-1 rounded transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteHotel(hotel.id)}
                              className="text-red-600 hover:text-red-700 p-1 rounded transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Booking Management</h2>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Booking ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Hotel</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Check-in</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Check-out</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Guests</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Total</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingsList.map(booking => (
                      <tr key={booking.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-mono text-sm">{booking.id}</td>
                        <td className="py-3 px-4">{booking.hotelName}</td>
                        <td className="py-3 px-4">{booking.checkIn}</td>
                        <td className="py-3 px-4">{booking.checkOut}</td>
                        <td className="py-3 px-4">{booking.guests}</td>
                        <td className="py-3 px-4 font-semibold">${booking.totalPrice}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Hotel Form Modal */}
        {showHotelForm && (
          <HotelForm
            hotel={editingHotel}
            onSave={handleSaveHotel}
            onCancel={() => {
              setShowHotelForm(false);
              setEditingHotel(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;