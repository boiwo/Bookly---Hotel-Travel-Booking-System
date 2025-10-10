
import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { MapPin, Wifi, Car, Utensils, ArrowLeft } from "lucide-react";
import BookingForm from "./BookingForm";

// Hotel interface
interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  price: number;
  image_url: string;
  amenities?: string[];
  images?: string[];
}

// Example local hotels
const localHotels: Hotel[] = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    location: "Paris, France",
    price: 229,
    description: "Luxury hotel in the heart of Paris with stunning views of the Eiffel Tower. Experience elegance.",
    image_url: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
    amenities: ["WiFi", "Parking", "Restaurant"],
  },
  {
    id: 2,
    name: "Ocean Breeze Resort",
    location: "Maldives",
    price: 599,
    description: "Paradise found in the Maldives. Overwater bungalows with direct access to crystal clear",
    image_url: "https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=800",
    amenities: ["WiFi", "Parking"],
  },
  {
    id: 4,
    name: "Urban Chic Hotel",
    location: "New York, USA",
    price: 599,
    description: "Modern design meets urban sophistication in the heart of Manhattan. Steps from Times Square.",
    image_url: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
    amenities: ["WiFi", "Parking"],
  },
  
];

const HotelDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [hotel, setHotel] = useState<Hotel | null>(location.state?.hotel || null);
  const [loading, setLoading] = useState(!hotel);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!hotel && id) {
      setLoading(true);

      // Try local data first
      const found = localHotels.find(h => h.id === Number(id)) || null;
      if (found) {
        setHotel(found);
        setLoading(false);
      } else {
        // Optional: fetch from backend if not in local data
        fetch(`http://localhost:5001/api/hotels/${id}`)
          .then(res => {
            if (!res.ok) throw new Error("Hotel not found");
            return res.json();
          })
          .then(data => setHotel(data))
          .catch(err => {
            console.error(err);
            setHotel(null);
          })
          .finally(() => setLoading(false));
      }
    }
  }, [id, hotel]);

  if (loading) return <p className="p-8">Loading hotel details...</p>;
  if (!hotel) return <p className="p-8">Hotel not found</p>;

  const images = hotel.images && hotel.images.length > 0
    ? hotel.images
    : [hotel.image_url];

  const mainImage = images[selectedImageIndex];

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes("wifi")) return <Wifi className="h-5 w-5" />;
    if (amenity.toLowerCase().includes("parking")) return <Car className="h-5 w-5" />;
    if (amenity.toLowerCase().includes("restaurant")) return <Utensils className="h-5 w-5" />;
    return <div className="w-5 h-5 bg-blue-100 rounded" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link to="/hotels" className="text-blue-600 hover:text-blue-700 flex items-center mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Hotels
      </Link>

      <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Image */}
          <img src={mainImage} alt={hotel.name} className="w-full h-72 object-cover rounded-lg" />

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="flex space-x-2 mt-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === idx ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <img src={img} alt={`${hotel.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <p className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {hotel.location}</p>
          <p className="font-semibold">💰 ${hotel.price} / night</p>
          <div className="prose max-w-none mt-4">{hotel.description}</div>

          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <BookingForm hotel={hotel} />
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;

