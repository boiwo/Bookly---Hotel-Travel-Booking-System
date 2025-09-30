import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Wifi, Car, Utensils, Camera, ArrowLeft } from 'lucide-react';
import { hotels, reviews } from '../../data/mockData';
import BookingForm from './BookingForm';

const HotelDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const hotel = hotels.find(h => h.id === id);
  const hotelReviews = reviews.filter(r => r.hotelId === id);

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Hotel not found</p>
      </div>
    );
  }

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="h-5 w-5" />;
    if (amenity.toLowerCase().includes('parking')) return <Car className="h-5 w-5" />;
    if (amenity.toLowerCase().includes('restaurant')) return <Utensils className="h-5 w-5" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6">
          <Link to="/hotels" className="text-blue-600 hover:text-blue-700 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Hotels
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-96">
                <img
                  src={hotel.images[selectedImageIndex]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {hotel.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        selectedImageIndex === index ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Camera className="h-5 w-5 text-gray-700" />
                </div>
              </div>
              
              <div className="flex space-x-2 p-4 overflow-x-auto">
                {hotel.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${hotel.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span className="text-lg">{hotel.location}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(hotel.rating) 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold ml-2">{hotel.rating}</span>
                    <span className="text-gray-600 ml-2">({hotel.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">${hotel.price}</div>
                  <div className="text-gray-600">per night</div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-3">About this hotel</h3>
                <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-6">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getAmenityIcon(amenity) || <div className="w-5 h-5 bg-blue-100 rounded" />}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-6">Guest Reviews</h3>
              <div className="space-y-6">
                {hotelReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {review.userName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{review.userName}</div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating 
                                ? 'text-yellow-500 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <BookingForm hotel={hotel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;


