import React, { useEffect, useState } from "react";
import { useCart } from "../components/CartContext";

export function Menu({ id }) {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu/menuitems");
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const categories = ["All", "Appetizer", "Main Course", "desserts", "Beverage"];

  const filteredMenuItems =
    filter === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === filter);

  if (loading) return <div className="text-white text-center">Loading menu...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div id={id} className="bg-[rgb(26,24,20)] py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-3">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h3 className="text-left text-gray-400 uppercase tracking-wide mb-6 flex items-center ">
            MENU
            <span className="ml-2 w-16 md:w-24 h-px bg-gray-400"></span>
          </h3>

          <h2 className="text-left text-xl md:text-3xl font-bold text-[rgb(205,164,94)] mb-8">
            Check Our Tasty Menu
          </h2>

          {/* Filter Options */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
                  filter === category
                    ? "text-[rgb(205,164,94)] bg-gray-800"
                    : "text-gray-300 hover:text-[rgb(205,164,94)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {filteredMenuItems.map((item, index) => (
            <div key={index} className="flex flex-row items-center">
              <img
                src={`http://localhost:5000/${item.image}`}
                alt={item.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gray-600 mb-4 md:mb-0 md:mr-6"
              />
              <div className="flex-1 border-b border-gray-700 pb-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-bold text-base md:text-lg">
                    {item.name}
                  </h4>
                  <span className="text-[#F4B41A] font-bold text-sm md:text-base">
                    ${item.price}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between items-center mt-4">
                  <p className="text-gray-400 text-xs md:text-sm flex-1">
                    {item.description}
                  </p>
                  <button onClick={() => addToCart(item)} className="mt-2 md:mt-0">
                    <div className="w-8 h-8 md:w-9 md:h-9 bg-[rgb(26,24,20)] border-2 border-yellow-500 rounded-full flex items-center justify-center hover:bg-black">
                      <img
                        className="w-3 h-3 md:w-4 md:h-4"
                        src="plus.png"
                        alt="Plus Icon"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal Scroll for Smaller Devices */}
        <div className="md:hidden space-y-8">
          <h3 className="text-xl font-bold text-[rgb(205,164,94)] mb-4">
            {filter} Items
          </h3>
          <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900">
            {filteredMenuItems.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 bg-gray-800 rounded-lg p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 rounded-lg object-cover mb-4"
                />
                <div className="flex-1 text-center">
                  <h4 className="text-white font-bold text-lg mb-2">
                    {item.name}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                  <span className="text-[#F4B41A] font-bold text-lg block mb-4">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-4 py-2 rounded-full bg-[rgb(205,164,94)] text-black font-bold hover:bg-[rgb(184,144,82)] transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
