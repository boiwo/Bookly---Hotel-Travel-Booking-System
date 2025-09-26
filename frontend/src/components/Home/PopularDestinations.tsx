import React from 'react';
import { destinations } from '../../data/mockData';

const PopularDestinations: React.FC = () => {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the world's most sought-after travel destinations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
              <p className="text-sm opacity-90">{destination.country}</p>
              <p className="text-xs opacity-75 mt-1">{destination.hotelsCount} hotels</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;