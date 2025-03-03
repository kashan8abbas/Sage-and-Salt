import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar.jsx';
import './MenuManagement.css';
import menuImage from '../../assets/menu.jpeg';  // Import the image

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    _id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    availability: true,
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu/menuitems');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentItem((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setCurrentItem((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(currentItem).forEach((key) => {
      if (key !== 'image' && currentItem[key]) {
        formData.append(key, currentItem[key]);
      }
    });

    if (currentItem.image) {
      formData.append('image', currentItem.image);
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/menu/${currentItem._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://localhost:5000/api/menu/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      resetForm();
      fetchMenuItems();
    } catch (error) {
      console.error('Error saving menu item', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/menu/${id}`);
      const item = response.data;
      setCurrentItem({
        _id: item._id,
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
        availability: item.availability,
        image: null,
      });
      setIsEditing(true);
    } catch (error) {
      console.error('Error preparing item for edit', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item', error);
    }
  };

  const resetForm = () => {
    setCurrentItem({
      _id: '',
      name: '',
      description: '',
      price: '',
      category: '',
      availability: true,
      image: null,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed position */}
      <Sidebar className="w-1/4 bg-gray-800 text-white h-full fixed" />

      {/* Main content area with background */}
      <div
        className="flex-1 p-4 relative"
        style={{
          backgroundImage: `url(${menuImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">
            {isEditing ? 'Edit Menu Item' : 'Add Menu Item'}
          </h2>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={currentItem.name}
                onChange={handleInputChange}
                placeholder="Menu Item Name"
                required
                className="border p-2"
              />
              <input
                type="number"
                name="price"
                value={currentItem.price}
                onChange={handleInputChange}
                placeholder="Price"
                required
                className="border p-2"
              />
              <textarea
                name="description"
                value={currentItem.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
                className="border p-2 col-span-2"
              />
              <select
                name="category"
                value={currentItem.category}
                onChange={handleInputChange}
                required
                className="border p-2"
              >
                <option value="">Select Category</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={currentItem.availability}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Available
                </label>
              </div>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="border p-2 col-span-2"
              />
            </div>
            <div className="flex space-x-4 mt-4">
              <button type="submit" className="bg-blue-500 text-white p-2">
                {isEditing ? 'Update Item' : 'Add Menu Item'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white p-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div>
            <h3 className="text-xl font-semibold mb-4">Current Menu Items</h3>
            <div className="grid grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <div key={item._id} className="border p-4">
                  {item.image && (
                    <img
                      src={`data:${item.image.contentType};base64,${item.image.data}`}
                      alt={item.name}
                      className="w-full h-48 object-cover mb-4"
                    />
                  )}
                  <h4 className="font-bold">{item.name}</h4>
                  <p>{item.description}</p>
                  <p>Price: ${item.price.toString()}</p>
                  <p>Category: {item.category}</p>
                  <p>Available: {item.availability ? 'Yes' : 'No'}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="bg-yellow-500 text-white p-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white p-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
