import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export function Footer() {
  const [locations, setLocations] = useState([]);

  // Fetch Locations from the API
  const fetchLocations = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/locations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch locations.");
      }

      const data = await response.json();
      setLocations(data);
    } catch (err) {
      console.error("Error fetching locations:", err.message);
    }
  };

  useEffect(() => {
    fetchLocations(); // Fetch locations on component mount
  }, []);

  return (
    <footer className="bg-black text-white py-12 flex justify-center">
      <div className="max-w-7xl w-full px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left justify-items-center md:justify-items-center">
          
          {/* Our Locations Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[rgb(205,164,94)] mb-4 ">
              Our Locations
            </h2>
            {locations.length > 0 ? (
              <ul className="space-y-4">
                {locations.map((location, index) => (
                  <li
                    key={index}
                    className="text-gray-300 text-sm hover:text-[#F4B41A] transition"
                  >
                    <strong>{location.name}</strong>: {location.address}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No locations found.</p>
            )}
          </div>

          {/* Contact Us Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[rgb(205,164,94)] mb-4">
              Contact Us
            </h2>
            <p className="text-gray-400 text-sm">Phone: +92 (318) 393-3088</p>
            <p className="text-gray-400 text-sm">Email: support@sageandsalt.com</p>
            <p className="text-gray-400 text-sm">Support: 24/7</p>
          </div>

          {/* Follow Us Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[rgb(205,164,94)] mb-4">
              Follow Us
            </h2>
            
            <div className="flex space-x-6 justify-center md:justify-center">
            <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-[#F4B41A] transition text-3xl"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaFacebookF />
            </a>

            <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-[#F4B41A] transition text-3xl"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaInstagram />
            </a>

            <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-[#F4B41A] transition text-3xl"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaTwitter />
            </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Sage & Salt. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
