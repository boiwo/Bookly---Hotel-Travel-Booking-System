// import React, { useState, useMemo, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import HotelCard from "./HotelCard";

// // ---- Hotel Type ----
// interface Hotel {
//   id: number;
//   name: string;
//   location: string;
//   price: number;
//   description?: string;
//   rating?: number; // optional because backend may not return it
// }

// const HotelsPage: React.FC = () => {
//   const [searchParams] = useSearchParams();

//   // ---- Filters ----
//   const [priceRange] = useState<[number, number]>([0, 1000]);
//   const [ratingFilter] = useState<number>(0);
//   const [sortBy] = useState<string>("price");

//   // ---- State ----
//   const [hotels, setHotels] = useState<Hotel[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   const destination = searchParams.get("destination") || "";

//   // ---- Fetch Hotels ----
//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         const url = `${import.meta.env.VITE_API_URL}/api/hotels`; // ✅ from env
//         const res = await fetch(url);

//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }

//         const data: Hotel[] = await res.json();
//         console.log("Fetched hotels:", data);
//         setHotels(data);
//       } catch (err: any) {
//         console.error("Error fetching hotels:", err);
//         setError("Unable to load hotels. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotels();
//   }, []);

//   // ---- Filtering + Sorting ----
//   const filteredHotels = useMemo(() => {
//     let filtered = hotels.filter((hotel) => {
//       const matchesDestination =
//         !destination ||
//         hotel.location.toLowerCase().includes(destination.toLowerCase());

//       const matchesPrice =
//         hotel.price >= priceRange[0] && hotel.price <= priceRange[1];

//       const matchesRating = (hotel.rating ?? 0) >= ratingFilter;

//       return matchesDestination && matchesPrice && matchesRating;
//     });

//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case "price":
//           return a.price - b.price;
//         case "price-desc":
//           return b.price - a.price;
//         case "rating":
//           return (b.rating ?? 0) - (a.rating ?? 0);
//         case "name":
//           return a.name.localeCompare(b.name);
//         default:
//           return 0;
//       }
//     });

//     return filtered;
//   }, [destination, priceRange, ratingFilter, sortBy, hotels]);

//   // ---- Render ----
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             {destination ? `Hotels in ${destination}` : "All Hotels"}
//           </h1>
//           <p className="text-gray-600">
//             {loading
//               ? "Loading hotels..."
//               : `${filteredHotels.length} hotels found`}
//           </p>
//         </div>

//         {error && (
//           <div className="mb-6 p-4 rounded-md bg-red-100 text-red-700">
//             {error}
//           </div>
//         )}

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Hotel List */}
//           <div className="lg:w-3/4">
//             {loading ? (
//               <div className="text-center py-12 text-gray-500">
//                 Loading hotels...
//               </div>
//             ) : filteredHotels.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {filteredHotels.map((hotel) => (
//                   <HotelCard key={hotel.id} hotel={hotel} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-lg">
//                   No hotels found matching your criteria.
//                 </p>
//                 <p className="text-gray-400 mt-2">
//                   Try adjusting your filters.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelsPage;

// HotelsPage.tsx
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HotelCard from "./HotelCard";

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  description?: string;
  image_url?: string;
}

const HotelsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const destination = searchParams.get("destination") || "";

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/hotels`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Hotel[] = await res.json();
        setHotels(data);
      } catch (err: any) {
        console.error(err);
        setError("Unable to load hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      return (
        (!destination ||
          hotel.location.toLowerCase().includes(destination.toLowerCase()))
      );
    });
  }, [hotels, destination]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          {destination ? `Hotels in ${destination}` : "All Hotels"}
        </h1>
        <p className="text-gray-600 mb-6">
          {loading
            ? "Loading hotels..."
            : `${filteredHotels.length} hotels found`}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading hotels...</div>
        ) : filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No hotels found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;


