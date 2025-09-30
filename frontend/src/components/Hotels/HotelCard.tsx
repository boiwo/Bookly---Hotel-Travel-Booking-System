// import React from "react";

// type Hotel = {
//   id: number;
//   name?: string;
//   description?: string;
//   location?: string;
//   price?: number;
// };

// interface HotelCardProps {
//   hotel: Hotel;
// }

// const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
//   return (
//     <div className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition">
//       <h2 className="text-xl font-bold text-gray-800">
//         {hotel.name || "Unnamed Hotel"}
//       </h2>

//       <p className="text-gray-600 text-sm mt-2">
//         {hotel.description?.slice(0, 100) || "No description available"}
//       </p>

//       <div className="mt-3 text-sm text-gray-500">
//         <span className="block">
//           📍 {hotel.location || "Location not specified"}
//         </span>
//         <span className="block">
//           💰 ${hotel.price !== undefined ? hotel.price : "N/A"} / night
//         </span>
//       </div>

//       <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
//         View Details
//       </button>
//     </div>
//   );
// };

// export default HotelCard;
// HotelCard.tsx
import React from "react";

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  description?: string;
  image_url?: string;
}

interface Props {
  hotel: Hotel;
}

const HotelCard: React.FC<Props> = ({ hotel }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {hotel.image_url && (
        <img
          src={hotel.image_url}
          alt={hotel.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
        <p className="text-gray-600 mb-2">{hotel.description}</p>
        <p className="text-gray-500">
          📍 {hotel.location}
        </p>
        <p className="text-gray-700 font-semibold">
          💰 ${hotel.price} / night
        </p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
