import React, { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";

export function CartPage() {
  const { cart, updateQuantity, clearCart } = useCart();
  const [total, setTotal] = useState(0);
  const [customization, setCustomization] = useState(""); // State for customization

  useEffect(() => {
    const calculateTotal = () =>
      cart.reduce(
        (acc, item) => acc + parseFloat(item.price.replace("$", "")) * item.quantity,
        0
      );
    setTotal(calculateTotal());
  }, [cart]);

  const handleCheckout = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const orderItems = cart.map((item) => ({
        itemId: item._id,
        quantity: item.quantity,
      }));

      const response = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderItems,
          totalPrice: total,
          customization, // Include customization in the request
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Response:", errorData);
        throw new Error(errorData.error || "Failed to place order");
      }

      const data = await response.json();
      alert("Order placed successfully!");
      clearCart();
      setCustomization(""); // Clear customization after checkout
    } catch (err) {
      console.error(err.message);
      alert(err.message || "Failed to place order.");
    }
  };

  return (
    <div className="bg-[rgb(15,11,11)] text-gray-200 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 mt-20">
        {cart.length > 0 ? (
          <h1 className="text-[rgb(205,164,94)] text-4xl font-bold mb-8 text-center">
            Your Cart
          </h1>
        ) : null}

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4 justify-center">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-[rgb(26,24,20)] rounded-lg overflow-hidden shadow-lg relative"
              >
                <img
                  src={item.image || "restaurent.jpg"}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-[rgb(205,164,94)] font-bold text-center mb-2">
                    {item.name}
                  </h4>
                  <div className="flex justify-between items-center">
                    <p className="text-[rgb(205,164,94)] text-lg font-bold">
                      {item.price}
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-[rgb(205,164,94)] text-black px-3 py-1 rounded-full font-bold hover:bg-[rgb(184,144,82)] transition"
                        onClick={() =>
                          updateQuantity(item._id, Math.max(item.quantity - 1, 1))
                        }
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        className="bg-[rgb(205,164,94)] text-black px-3 py-1 rounded-full font-bold hover:bg-[rgb(184,144,82)] transition"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <h2 className="text-[rgb(205,164,94)] text-4xl font-bold mb-4 mt-52">
              Empty Cart
            </h2>
            <p className="text-gray-400 text-lg">
              Your cart is empty. Add some items to get started!
            </p>
          </div>
        )}
        {cart.length > 0 && (
          <div className="mt-12 text-center">
            <h2 className="text-[rgb(205,164,94)] text-3xl font-bold mb-6">
              Total: ${total.toFixed(2)}
            </h2>
            <textarea
              value={customization}
              onChange={(e) => setCustomization(e.target.value)}
              className="w-full h-20 p-2 border rounded mb-4"
              placeholder="Add customizations for your order (e.g., no onions, extra spicy)..."
            ></textarea>
            <button
              onClick={handleCheckout}
              className="bg-[rgb(205,164,94)] text-black font-bold px-8 py-4 rounded-full shadow-lg hover:bg-[rgb(184,144,82)] transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}