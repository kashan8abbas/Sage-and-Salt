import React, { useState } from "react";

export function Contact({ id }) {
  const [contactDetails, setContactDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to send your message.");
      }

      setStatus("success");
      alert("Message sent successfully!");

      // Reset Form
      setContactDetails({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Error sending message:", err.message);
      setStatus("error");
      alert("Failed to send your message.");
    }
  };

  return (
    <div id={id} className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h3 className="text-left text-gray-400 uppercase tracking-wide mb-6 flex items-center">
            CONTACT US
            <span className="ml-2 w-24 h-px bg-gray-400"></span>
          </h3>

          <h2 className="text-left text-xl md:text-3xl font-bold text-[rgb(205,164,94)] mb-8">
            We'd love to hear from you!
          </h2>
        </div>

        {/* Contact Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              name="fullName"
              value={contactDetails.fullName}
              onChange={handleInputChange}
              className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 focus:outline-none focus:border-[#F4B41A] placeholder-[rgb(205,164,94,0.7)]"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              name="email"
              value={contactDetails.email}
              onChange={handleInputChange}
              className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 focus:outline-none focus:border-[#F4B41A] placeholder-[rgb(205,164,94,0.7)]"
              placeholder="Your Email"
              required
            />

            <input
              type="tel"
              name="phone"
              value={contactDetails.phone}
              onChange={handleInputChange}
              className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 focus:outline-none focus:border-[#F4B41A] placeholder-[rgb(205,164,94,0.7)]"
              placeholder="Your Phone"
              required
            />
          </div>

          <input
            type="text"
            name="subject"
            value={contactDetails.subject}
            onChange={handleInputChange}
            className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 w-full focus:outline-none focus:border-[#F4B41A] placeholder-[rgb(205,164,94,0.7)]"
            placeholder="Subject"
            required
          />

          <textarea
            name="message"
            value={contactDetails.message}
            onChange={handleInputChange}
            rows={4}
            placeholder="Your Message"
            className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 w-full focus:outline-none focus:border-[#F4B41A] placeholder-[rgb(205,164,94,0.7)]"
            required
          ></textarea>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[rgb(205,164,94)] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#d69e19] transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
