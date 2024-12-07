import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import trash icon

export function ViewReservations() {
  const [reservations, setReservations] = useState([]); // State to store user reservations
  const [loading, setLoading] = useState(true); // State to show loading spinner
  const [error, setError] = useState(null); // State to handle errors
  const [view, setView] = useState("current"); // State to toggle between current and history

  // Fetch reservations from the backend
  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(
          "http://localhost:5000/api/reservations/my-reservations",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include user token for authentication
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }

        const data = await response.json();
        setReservations(data); // Set reservations in state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Helper function to determine if a reservation is in the past
  const isPastReservation = (reservation) => {
    const reservationDateTime = new Date(`${reservation.date}T${reservation.time}`);
    const currentDateTime = new Date();
    return reservationDateTime <= currentDateTime; // Check if the reservation time has passed
  };

  // Filter reservations based on the view
  const filteredReservations =
    view === "current"
      ? reservations.filter(
          (res) =>
            (res.status === "Pending" && !isPastReservation(res)) || // Pending and future
            (res.status === "Confirmed" && !isPastReservation(res)) // Confirmed and future
        )
      : reservations.filter(
          (res) =>
            res.status === "Cancelled" || // Cancelled
            (res.status === "Confirmed" && isPastReservation(res)) || // Confirmed and past
            (res.status === "Pending" && isPastReservation(res)) // Pending and past
        );

  // Handle reservation cancellation
  const cancelReservation = async (reservationId) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `http://localhost:5000/api/reservations/cancel/${reservationId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel reservation");
      }

      alert("Reservation canceled successfully!");
      // Update reservations state
      setReservations((prevReservations) =>
        prevReservations.map((res) =>
          res._id === reservationId ? { ...res, status: "Cancelled" } : res
        )
      );
    } catch (err) {
      console.error(err.message);
      alert("Failed to cancel reservation.");
    }
  };

  if (loading) return <div className="text-white text-center">Loading reservations...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="bg-[rgb(15,11,11)] text-gray-200 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <h1 className="text-[#CDA45E] text-4xl font-bold mb-8 text-center">
          Reservation Management
        </h1>

        {/* Buttons for toggling views */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setView("current")}
            className={`px-6 py-2 font-medium rounded transition-transform transform ${
              view === "current"
                ? "bg-[#CDA45E] text-black scale-110"
                : "bg-gray-600 text-white hover:bg-gray-500 hover:scale-105"
            }`}
          >
            Current Reservations
          </button>
          <button
            onClick={() => setView("history")}
            className={`px-6 py-2 font-medium rounded ${
              view === "history"
                ? "bg-[#CDA45E] text-black"
                : "bg-gray-600 text-white hover:bg-gray-500"
            } transition`}
          >
            Reservation History
          </button>
        </div>

        {/* Reservations List */}
        {filteredReservations.length === 0 ? (
          <div className="text-center text-gray-400">
            {view === "current"
              ? "You don't have any current reservations."
              : "You don't have any reservation history."}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReservations.map((reservation) => (
              <div
                key={reservation._id}
                className="bg-[rgb(26,24,20)] p-6 rounded-xl shadow-md flex justify-between items-center"
              >
                {/* Reservation Details */}
                <div className="grid grid-cols-3 gap-4 w-full text-center">
                  <div>
                    <p className="text-gray-400 text-sm">Reservation Date</p>
                    <p className="text-[#CDA45E] text-lg font-bold">{reservation.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Reservation Time</p>
                    <p className="text-[#CDA45E] text-lg font-bold">{reservation.time} hrs</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Reserved On</p>
                    <p className="text-[#CDA45E] text-lg font-bold">
                      {new Date(reservation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Party Size</p>
                    <p className="text-[#CDA45E] text-lg font-bold">
                      {reservation.partySize} Persons
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p
                      className={`text-lg font-bold ${
                        reservation.status === "Pending"
                          ? "text-[#CDA45E]"
                          : reservation.status === "Cancelled"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {reservation.status}
                    </p>
                  </div>
                </div>

                {/* Cancel Button */}
                {((reservation.status === "Pending" && !isPastReservation(reservation)) ||
                  (reservation.status === "Confirmed" && !isPastReservation(reservation))) && (
                  <button
                    onClick={() => cancelReservation(reservation._id)}
                    className="text-red-500 text-2xl hover:scale-110 transition mt-28"
                    title="Cancel Reservation"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
