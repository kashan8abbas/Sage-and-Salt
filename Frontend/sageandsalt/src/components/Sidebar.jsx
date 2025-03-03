import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Utensils, MapPin, ShoppingBag, MessageSquare } from 'lucide-react';
import menuImage from '../../assets/logo.jpeg';

const Sidebar = () => {
  return (
    <div className="bg-[#0c0b09] text-[#cda45e] w-64 min-h-screen p-6 shadow-lg">
      {/* Restaurant Logo and Name */}
      <div className="flex flex-col items-center mb-10">
        <img 
          src={menuImage} 
          alt="Sage and Salt Logo" 
          className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#cda45e]"
        />
        <h1 className="text-3xl font-bold text-[#cda45e]">Sage and Salt</h1>
      </div>
      
      <nav>
        <ul className="space-y-4">
          <li>
            <Link 
              to="/dashboard" 
              className="flex items-center p-3 rounded-lg hover:bg-[#1a1814] hover:text-white transition-colors"
            >
              <Users className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/staff" 
              className="flex items-center p-3 rounded-lg hover:bg-[#1a1814] hover:text-white transition-colors"
            >
              <Users className="mr-3" /> Staff Management
            </Link>
          </li>
          <li>
            <Link 
              to="/menu" 
              className="flex items-center p-3 rounded-lg hover:bg-[#1a1814] hover:text-white transition-colors"
            >
              <Utensils className="mr-3" /> Menu Management
            </Link>
          </li>
          <li>
            <Link 
              to="/locations" 
              className="flex items-center p-3 rounded-lg hover:bg-[#1a1814] hover:text-white transition-colors"
            >
              <MapPin className="mr-3" /> Restaurant Locations
            </Link>
          </li>
          <li>
            <Link 
              to="/order" 
              className="flex items-center p-3 rounded-lg hover:bg-[#1a1814] hover:text-white transition-colors"
            >
              <ShoppingBag className="mr-3" /> Order Management
            </Link>
          </li>
          <li>
            <Link 
              to="/feedback" 
              className="flex items-center p-3 rounded-lg hover:bg-[#1a1814] hover:text-white transition-colors"
            >
              <MessageSquare className="mr-3" /> Customer Feedback
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;