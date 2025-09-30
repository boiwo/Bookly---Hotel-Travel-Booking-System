
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


