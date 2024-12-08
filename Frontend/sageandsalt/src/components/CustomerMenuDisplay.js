import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerMenuDisplay = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Categories available in the menu
  const categories = [
    'All', 
    'Appetizer', 
    'Main Course', 
    'Dessert', 
    'Beverage'
  ];

  // Fetch menu items on component mount
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Fetch menu items from backend
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu/menuitems');
      const availableItems = response.data.filter(item => item.availability);
      setMenuItems(availableItems);
      setFilteredItems(availableItems);
    } catch (error) {
      console.error('Error fetching menu items', error);
    }
  };

  // Filter items based on category and search term
  useEffect(() => {
    let result = menuItems;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(item => 
        item.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(result);
  }, [selectedCategory, searchTerm, menuItems]);

  // Group items by category for better organization
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Our Restaurant Menu
      </h1>

      {/* Search and Filter Section */}
      <div className="mb-6 flex justify-between items-center">
        {/* Search Input */}
        <input 
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 p-2 border rounded"
        />

        {/* Category Filter */}
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Display */}
      {Object.keys(groupedItems).length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No menu items found
        </div>
      ) : (
        Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map(item => (
                <div 
                  key={item._id} 
                  className="border rounded-lg overflow-hidden shadow-lg"
                >
                  {/* Item Image */}
                  {item.image && (
                    <img 
                      src={`data:${item.image.contentType};base64,${item.image.data}`}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  {/* Item Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <span className="text-green-600 font-semibold">
                        ${item.price.toString()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerMenuDisplay;