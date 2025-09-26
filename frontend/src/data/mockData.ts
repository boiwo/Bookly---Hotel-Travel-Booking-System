import { Hotel, Booking, Review, Destination } from '../types';

export const hotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Palace Hotel',
    location: 'Paris, France',
    price: 299,
    rating: 4.8,
    reviews: 1247,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Luxury hotel in the heart of Paris with stunning views of the Eiffel Tower. Experience elegance and sophistication in every detail.',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service', 'Concierge'],
    featured: true
  },
  {
    id: '2',
    name: 'Ocean Breeze Resort',
    location: 'Maldives',
    price: 599,
    rating: 4.9,
    reviews: 892,
    image: 'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Paradise found in the Maldives. Overwater bungalows with direct access to crystal clear lagoons.',
    amenities: ['Private Beach', 'Water Sports', 'Spa', 'All-Inclusive', 'Diving Center', 'Sunset Cruise'],
    featured: true
  },
  {
    id: '3',
    name: 'Mountain Vista Lodge',
    location: 'Swiss Alps, Switzerland',
    price: 399,
    rating: 4.7,
    reviews: 634,
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/161758/governor-generals-residence-rideau-hall-drawing-room-ballroom-161758.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Breathtaking mountain views and alpine luxury. Perfect for skiing in winter and hiking in summer.',
    amenities: ['Ski Access', 'Mountain Views', 'Fireplace', 'Restaurant', 'Spa', 'Hiking Trails'],
    featured: false
  },
  {
    id: '4',
    name: 'Urban Chic Hotel',
    location: 'New York, USA',
    price: 249,
    rating: 4.6,
    reviews: 1876,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Modern design meets urban sophistication in the heart of Manhattan. Steps from Times Square.',
    amenities: ['City Views', 'Rooftop Bar', 'Fitness Center', 'Business Center', 'Pet-Friendly'],
    featured: true
  },
  {
    id: '5',
    name: 'Tropical Paradise Resort',
    location: 'Bali, Indonesia',
    price: 199,
    rating: 4.5,
    reviews: 967,
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Experience authentic Balinese culture with modern luxury amenities surrounded by rice terraces.',
    amenities: ['Pool', 'Spa', 'Cultural Tours', 'Cooking Classes', 'Yoga Studio', 'Garden Views'],
    featured: false
  },
  {
    id: '6',
    name: 'Desert Oasis Hotel',
    location: 'Dubai, UAE',
    price: 449,
    rating: 4.8,
    reviews: 543,
    image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Luxury meets tradition in this stunning desert resort with world-class amenities and service.',
    amenities: ['Desert Safari', 'Luxury Spa', 'Fine Dining', 'Pool Complex', 'Golf Course', 'Shopping Mall Access'],
    featured: false
  }
];

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    hotelsCount: 234
  },
  {
    id: '2',
    name: 'Maldives',
    country: 'Maldives',
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800',
    hotelsCount: 89
  },
  {
    id: '3',
    name: 'New York',
    country: 'USA',
    image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800',
    hotelsCount: 567
  },
  {
    id: '4',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
    hotelsCount: 198
  }
];

export const bookings: Booking[] = [
  {
    id: '1',
    hotelId: '1',
    hotelName: 'Grand Palace Hotel',
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    guests: 2,
    totalPrice: 897,
    status: 'confirmed',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    hotelId: '2',
    hotelName: 'Ocean Breeze Resort',
    checkIn: '2024-02-20',
    checkOut: '2024-02-27',
    guests: 4,
    totalPrice: 4193,
    status: 'confirmed',
    createdAt: '2024-01-25'
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    hotelId: '1',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely stunning hotel! The service was impeccable and the location perfect.',
    date: '2024-01-05'
  },
  {
    id: '2',
    hotelId: '1',
    userName: 'Michael Chen',
    rating: 4,
    comment: 'Great hotel with beautiful rooms. The breakfast was exceptional.',
    date: '2024-01-12'
  },
  {
    id: '3',
    hotelId: '2',
    userName: 'Emma Wilson',
    rating: 5,
    comment: 'Paradise on earth! The overwater bungalow was a dream come true.',
    date: '2023-12-28'
  }
];