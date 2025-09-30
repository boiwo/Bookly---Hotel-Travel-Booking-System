import React from "react";

interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  price: number;
  image_url: string;
}

interface HotelProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelProps> = ({ hotel }) => {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white">
      <img
        src={hotel.image_url}
        alt={hotel.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{hotel.name}</h2>
        <p className="text-gray-600">{hotel.description}</p>
        <p>📍 {hotel.location}</p>
        <p>💰 ${hotel.price} / night</p>
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          View Details
        </button>
      </div>
    </div>
  );
};

export default HotelCard;



