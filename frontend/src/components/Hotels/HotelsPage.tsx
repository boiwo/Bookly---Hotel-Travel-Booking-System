
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import HotelCard from './HotelCard';

const HotelsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
 

const [priceRange] = useState([0, 1000]);
const [ratingFilter] = useState(0);
const [sortBy] = useState('price');

  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const destination = searchParams.get('destination') || '';

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL}/api/hotels`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setHotels(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const filteredHotels = useMemo(() => {
    let filtered = hotels.filter(hotel => {
      const matchesDestination =
        !destination || hotel.location.toLowerCase().includes(destination.toLowerCase());
      const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
      const matchesRating = hotel.rating >= ratingFilter;

      return matchesDestination && matchesPrice && matchesRating;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [destination, priceRange, ratingFilter, sortBy, hotels]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {destination ? `Hotels in ${destination}` : 'All Hotels'}
          </h1>
          <p className="text-gray-600">
            {loading ? 'Loading hotels...' : `${filteredHotels.length} hotels found`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters here (same as before) */}

          <div className="lg:w-3/4">
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading hotels...</div>
            ) : filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No hotels found matching your criteria.</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;
