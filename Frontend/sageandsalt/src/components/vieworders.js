import React, { useEffect, useState } from "react";

export function ViewOrders() {
  const [orders, setOrders] = useState([]); // State to store user orders
  const [loading, setLoading] = useState(true); // State to show loading spinner
  const [error, setError] = useState(null); // State to handle errors
  const [view, setView] = useState("active"); // State to toggle between active and history views
  const [feedbackDialog, setFeedbackDialog] = useState(false); // State to toggle feedback dialog
  const [selectedOrder, setSelectedOrder] = useState(null); // Track the order for feedback
  const [rating, setRating] = useState(0); // Star rating
  const [comment, setComment] = useState(""); // Feedback comment

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch("http://localhost:5000/api/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`, // Include user token for authentication
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data); // Set orders in state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle opening feedback dialog
  const openFeedbackDialog = (order) => {
    setSelectedOrder(order);
    setFeedbackDialog(true);
    setRating(order.rating || 0); // Pre-fill stars if feedback exists
    setComment(order.comment || ""); // Pre-fill comment if feedback exists
  };

  // Handle submitting feedback
  const submitFeedback = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("http://localhost:5000/api/feedback/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: selectedOrder._id,
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      const data = await response.json();
      alert("Feedback submitted successfully!");

      // Update the order in the list with the new feedback
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, rating, comment } // Update the order with feedback
            : order
        )
      );

      setFeedbackDialog(false);
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err.message);
      alert("Failed to submit feedback.");
    }
  };

  // Filter orders based on the view
  const filteredOrders =
    view === "active"
      ? orders.filter((order) => order.tracking?.status !== "Delivered") // Active orders (not completed)
      : orders.filter((order) => order.tracking?.status === "Delivered"); // Order history (completed)

  if (loading) return <div className="text-white text-center">Loading orders...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="bg-[rgb(15,11,11)] text-gray-200 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <h1 className="text-[rgb(205,164,94)] text-4xl font-bold mb-8 text-center">
          Order Management
        </h1>

        {/* Buttons for toggling views */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setView("active")}
            className={`px-6 py-2 font-medium rounded transition-transform transform ${
              view === "active"
                ? "bg-[rgb(205,164,94)] text-black scale-110"
                : "bg-gray-600 text-white hover:bg-gray-500 hover:scale-105"
            }`}
          >
            Active Orders
          </button>
          <button
            onClick={() => setView("history")}
            className={`px-6 py-2 font-medium rounded transition-transform transform ${
              view === "history"
                ? "bg-[rgb(205,164,94)] text-black scale-110"
                : "bg-gray-600 text-white hover:bg-gray-500 hover:scale-105"
            }`}
          >
            Order History
          </button>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center text-gray-400">
            {view === "active"
              ? "You don't have any active orders."
              : "You don't have any order history."}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-[rgb(26,24,20)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-lg font-semibold text-white mb-2">
                  Order ID:{" "}
                  <span className="text-[rgb(205,164,94)]">{order._id}</span>
                </h2>
                <p className="text-sm text-gray-400 mb-2">
                  Placed On: {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  Total Price: ${order.totalPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  Customization:{" "}
                  <span className="text-[rgb(205,164,94)]">
                    {order.customization || "None"}
                  </span>
                </p>
                <h3 className="text-md font-bold text-white mb-2">Items:</h3>
                <ul className="list-disc pl-5 text-gray-300">
  {order.items.map((item, index) => (
    <li key={index}>
      Item:{" "}
      <span className="text-[rgb(205,164,94)]">{item.itemId?.name || "Unknown Item"}</span>{" "}
      | Quantity: {item.quantity}
    </li>
  ))}
</ul>

                <div className="mt-4">
                  <h3 className="text-md font-bold text-white mb-2">
                    Tracking Status:
                  </h3>
                  <p className="text-gray-400">
                    Status:{" "}
                    <span className="font-bold text-[rgb(205,164,94)]">
                      {order.tracking?.status || "Not Available"}
                    </span>
                  </p>
                  <p className="text-gray-400">
                    Last Updated:{" "}
                    {new Date(order.tracking?.lastUpdated).toLocaleString()}
                  </p>
                </div>
                {/* Show Feedback Button for Completed Orders */}
                {view === "history" && (
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => openFeedbackDialog(order)}
                      className="text-[rgb(205,164,94)] font-bold underline transition hover:text-yellow-400"
                    >
                      Leave Feedback
                    </button>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`w-6 h-6 text-2xl transition-transform transform ${
                            order.rating >= star
                              ? "text-yellow-400 scale-110"
                              : "text-gray-400"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Dialog */}
      {feedbackDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Leave Feedback</h2>
            <div className="flex space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-6 h-6 text-2xl transition-transform transform ${
                    rating >= star
                      ? "text-yellow-400 scale-110"
                      : "text-gray-400 hover:scale-105"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-20 p-2 border rounded"
              placeholder="Write your feedback here..."
            ></textarea>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setFeedbackDialog(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={submitFeedback}
                className="px-4 py-2 bg-[rgb(205,164,94)] text-black rounded hover:bg-yellow-400"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
