import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    preferredAddress: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to register user");
      }

      const data = await response.json();
      alert(data.message); // Show success message
      navigate("/login"); // Navigate to login page
    } catch (err) {
      console.error("Error during registration:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <img
          src="/restaurent.jpg"
          alt="Restaurant Ambiance"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-3xl bg-black/80 backdrop-blur-md p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">
            Create an Account at{" "}
            <span className="text-[rgb(205,164,94)]">Sage And Salt</span>
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleFormSubmit}>
            <div className="col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/70 text-gray-200 placeholder-gray-400 focus:ring-[rgb(205,164,94)] focus:border-[rgb(205,164,94)]"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/70 text-gray-200 placeholder-gray-400 focus:ring-[rgb(205,164,94)] focus:border-[rgb(205,164,94)]"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/70 text-gray-200 placeholder-gray-400 focus:ring-[rgb(205,164,94)] focus:border-[rgb(205,164,94)]"
                placeholder="Create a password"
                required
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-300 mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/70 text-gray-200 placeholder-gray-400 focus:ring-[rgb(205,164,94)] focus:border-[rgb(205,164,94)]"
                placeholder="Enter your contact number"
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="preferredAddress" className="block text-sm font-medium text-gray-300 mb-2">
                Preferred Address
              </label>
              <textarea
                id="preferredAddress"
                name="preferredAddress"
                value={formData.preferredAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/70 text-gray-200 placeholder-gray-400 focus:ring-[rgb(205,164,94)] focus:border-[rgb(205,164,94)]"
                placeholder="Enter your preferred address"
                rows="3"
                required
              />
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full py-2 bg-[rgb(205,164,94)] hover:bg-[rgb(185,144,74)] text-white font-bold rounded-full transition-colors duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-gray-400 mt-6 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-[rgb(205,164,94)] hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
