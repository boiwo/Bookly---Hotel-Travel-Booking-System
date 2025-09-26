export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  featured: boolean;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  hotelId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  hotelsCount: number;
}