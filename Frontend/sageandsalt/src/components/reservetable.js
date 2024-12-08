import React, { useState } from "react";

export function Reservation({ id }) {
  const [reservationDetails, setReservationDetails] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "",
    message: "",
  });
  const [reservationStatus, setReservationStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const pendingResponse = await fetch(
        "http://localhost:5000/api/reservations/my-reservations",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!pendingResponse.ok) {
        const errorData = await pendingResponse.json();
        throw new Error(errorData.error || "Failed to fetch reservations");
      }

      const reservations = await pendingResponse.json();
      const pendingCount = reservations.filter((res) => res.status === "Pending").length;

      if (pendingCount >= 2) {
        alert("You already have two pending reservation requests.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/reservations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to book the table");
      }

      const data = await response.json();
      setReservationStatus("success");
      alert("Table reserved successfully!");
      setReservationDetails({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        partySize: "",
        message: "",
      });
    } catch (err) {
      setReservationStatus("error");
      console.error(err.message);
      alert(err.message || "Failed to reserve the table.");
    }
  };

  return (
    <div id={id} className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h3 className="text-left text-gray-400 uppercase tracking-wide mb-6 flex items-center">
            RESERVATION
            <span className="ml-2 w-24 h-px bg-gray-400"></span>
          </h3>
          <h2 className="text-left text-xl md:text-3xl font-bold text-[rgb(205,164,94)] mb-8">
            Reserve Your Table
          </h2>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              value={reservationDetails.name}
              onChange={handleInputChange}
              className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 focus:outline-none focus:border-[#F4B41A] placeholder-[rgb(205,164,94,0.7)]"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              value={reservationDetails.email}
              onChange={handleInputChange}
              className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 focus:outline-none focus:border-[#F4B41A] placeholder-[rgb(205,164,94,0.7)]"
              placeholder="Your Email"
              required
            />
            <input
              type="tel"
              name="phone"
              value={reservationDetails.phone}
              onChange={handleInputChange}
              className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 focus:outline-none focus:border-[#F4B41A] placeholder-[rgb(205,164,94,0.7)]"
              placeholder="Your Phone"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="date"
              name="date"
              value={reservationDetails.date}
              onChange={handleInputChange}
              className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 focus:outline-none focus:border-[#F4B41A] placeholder-[rgb(205,164,94,0.7)]"
              placeholder="Date"
              required
            />
            <input
              type="time"
              name="time"
              value={reservationDetails.time}
              onChange={handleInputChange}
              className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 focus:outline-none focus:border-[#F4B41A] placeholder-[rgb(205,164,94,0.7)]"
              placeholder="Time"
              required
            />
            <input
              type="number"
              name="partySize"
              value={reservationDetails.partySize}
              onChange={handleInputChange}
              className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 focus:outline-none focus:border-[#F4B41A] placeholder-[rgb(205,164,94,0.7)]"
              placeholder="# of People"
              required
            />
          </div>
          <textarea
            name="message"
            value={reservationDetails.message}
            onChange={handleInputChange}
            rows={4}
            placeholder="Message"
            className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 w-full focus:outline-none focus:border-[#F4B41A] placeholder-[rgb(205,164,94,0.7)]"
          ></textarea>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[rgb(205,164,94)] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#d69e19] transition"
            >
              Book a Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
