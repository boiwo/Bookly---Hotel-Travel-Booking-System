import React from 'react';
import { Hotel, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Hotel className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Bookly</span>
            </div>
            <p className="text-gray-300">
              Your trusted partner for unforgettable travel experiences worldwide.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/hotels" className="text-gray-300 hover:text-white transition-colors">Hotels</a></li>
              <li><a href="/bookings" className="text-gray-300 hover:text-white transition-colors">My Bookings</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Paris</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Maldives</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">New York</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dubai</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">info@bookly.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">New York, NY</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">&copy; 2024 Bookly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;