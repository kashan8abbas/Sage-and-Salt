import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar.jsx';
import locationImage from '../../assets/location.jpg';

const LocationManagement = () => {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    contactNumber: '',
    email: '',
    manager: '',
    operatingHours: { openTime: '', closeTime: '' }
  });
  const [image, setImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/locations/');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentLocation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    Object.keys(currentLocation).forEach(key => {
      if (key === 'operatingHours') {
        formData.append(key, JSON.stringify(currentLocation[key]));
      } else {
        formData.append(key, currentLocation[key]);
      }
    });

    if (image) {
      formData.append('image', image);
    }

    try {
      if (currentLocation._id) {
        await axios.put(`http://localhost:5000/api/locations/${currentLocation._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('http://localhost:5000/api/locations', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchLocations();
      resetForm();
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  const handleEdit = (location) => {
    setCurrentLocation(location);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/locations/${id}`);
      fetchLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/locations/search?query=${searchQuery}`);
      setLocations(response.data);
    } catch (error) {
      console.error('Error searching locations:', error);
    }
  };

  const resetForm = () => {
    setCurrentLocation({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      contactNumber: '',
      email: '',
      manager: '',
      operatingHours: { openTime: '', closeTime: '' }
    });
    setImage(null);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-1/4 bg-[#0c0b09] text-[#cda45e] h-full fixed transition-transform transform opacity-0 translate-x-[-100%] animate-slideIn" />

      <div 
        className="flex-1 p-4 relative min-h-screen"
        style={{ 
          backgroundImage: `url(${locationImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        
        <div className="relative z-20 text-[#cda45e]">
          <h2 className="text-3xl font-bold mb-4 text-[#cda45e]">Restaurant Location Management</h2>
          
          {/* Search Section */}
          <div className="relative flex items-center mb-4">
            <div className="grid grid-cols-3 gap-4 w-full">
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border p-2 rounded-md text-white pl-4"
              />
            </div>

            <div 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-20"
              onClick={handleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Restaurant Name"
              value={currentLocation.name}
              onChange={handleInputChange}
              required
              className="border p-2 rounded-md text-white bg-[#1a1814] border-[#625b4b]"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={currentLocation.address}
              onChange={handleInputChange}
              required
              className="border p-2 rounded-md text-white bg-[#1a1814] border-[#625b4b]"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={currentLocation.city}
              onChange={handleInputChange}
              required
              className="border p-2 rounded-md text-white bg-[#1a1814] border-[#625b4b]"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={currentLocation.state}
              onChange={handleInputChange}
              required
              className="border p-2 rounded-md text-white bg-[#1a1814] border-[#625b4b]"
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={currentLocation.zipCode}
              onChange={handleInputChange}
              required
              className="border p-2 rounded-md text-white bg-[#1a1814] border-[#625b4b]"
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={currentLocation.contactNumber}
              onChange={handleInputChange}
              required
              className="border p-2 rounded-md text-white bg-[#1a1814] border-[#625b4b]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={currentLocation.email}
              onChange={handleInputChange}
              required
              className="border p-2 rounded-md text-white bg-[#1a1814] border-[#625b4b]"
            />
            <input
              type="text"
              name="manager"
              placeholder="Manager Name"
              value={currentLocation.manager}
              onChange={handleInputChange}
              className="border p-2 rounded-md text-white bg-[#1a1814] border-[#625b4b]"
            />
            <div className="flex space-x-2">
              <input
                type="time"
                name="openTime"
                placeholder="Open Time"
                value={currentLocation.operatingHours.openTime}
                onChange={(e) => setCurrentLocation(prev => ({
                  ...prev,
                  operatingHours: {
                    ...prev.operatingHours,
                    openTime: e.target.value
                  }
                }))}
                className="border p-2 rounded-md text-white bg-[#1a1814] border-[#625b4b] flex-1"
              />
              <input
                type="time"
                name="closeTime"
                placeholder="Close Time"
                value={currentLocation.operatingHours.closeTime}
                onChange={(e) => setCurrentLocation(prev => ({
                  ...prev,
                  operatingHours: {
                    ...prev.operatingHours,
                    closeTime: e.target.value
                  }
                }))}
                className="border p-2 rounded-md text-white bg-[#1a1814] border-[#625b4b] flex-1"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 rounded-md text-white bg-[#1a1814] border-[#625b4b] col-span-3"
            />
            <button 
              type="submit" 
              className="col-span-3 bg-[#cda45e] text-black p-3 rounded hover:bg-[#625b4b] transition"
            >
              {currentLocation._id ? 'Update Location' : 'Add Location'}
            </button>
          </form>

          {/* Locations List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-[#cda45e]">All Locations</h2>
            {locations.map(location => (
              <div 
                key={location._id} 
                className="p-4 border rounded-lg shadow-md bg-opacity-60 mb-4 bg-[#1a1814] border-[#625b4b]"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-[#cda45e]">{location.name}</h3>
                    <p className="text-white">{location.address}, {location.city}, {location.state} {location.zipCode}</p>
                    <p className="text-white">Contact: {location.contactNumber}</p>
                    <p className="text-white">Hours: {location.operatingHours.openTime} - {location.operatingHours.closeTime}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    {location.image && (
                      <img 
                        src={`data:${location.image.contentType};base64,${location.image.data}`} 
                        alt={location.name} 
                        className="w-32 h-32 object-cover rounded-lg mb-2"
                      />
                    )}
                    <div className="space-x-2">
                      <button 
                        onClick={() => handleEdit(location)}
                        className="bg-[#cda45e] text-black p-2 rounded hover:bg-[#625b4b] transition"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(location._id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationManagement;