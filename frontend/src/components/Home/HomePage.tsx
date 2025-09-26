import React from 'react';
import SearchBar from './SearchBar';
import FeaturedHotels from './FeaturedHotels';
import PopularDestinations from './PopularDestinations';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920)'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              Discover amazing hotels and resorts around the world
            </p>
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <FeaturedHotels />
        <PopularDestinations />
      </div>
    </div>
  );
};

export default HomePage;