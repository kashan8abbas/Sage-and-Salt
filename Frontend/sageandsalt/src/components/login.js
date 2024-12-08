import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ onSubmit }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    setError(null); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to login");
      }

      const data = await response.json();
      console.log("Login successful:", data); // Debug log
      alert(data.message); // Show success message

      // Save token and invoke onSubmit
      localStorage.setItem("authToken", data.token); // Save token to local storage
      onSubmit(); // Update isAuthenticated state in App.js
      navigate("/", { state: { userId: data.userId } }); // Redirect to main page with userId
    } catch (err) {
      console.error("Login failed:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <img
          src="/restaurent.jpg"
          alt="Restaurant Ambiance"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Login Form */}
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-md w-full bg-black/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg mx-auto">
          <h2 className="text-xl sm:text-3xl font-bold mb-4 text-white text-center">
            Welcome Back to{" "}
            <span className="text-[rgb(205,164,94)]">Sage And Salt</span>
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-600 rounded-md bg-black/70 text-gray-200 placeholder-gray-400 focus:ring-[rgb(205,164,94)] focus:border-[rgb(205,164,94)]"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-600 rounded-md bg-black/70 text-gray-200 placeholder-gray-400 focus:ring-[rgb(205,164,94)] focus:border-[rgb(205,164,94)]"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[rgb(205,164,94)] hover:bg-[rgb(185,144,74)] text-black font-bold rounded-full transition-colors duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-gray-400 mt-6 text-center text-sm sm:text-base">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[rgb(205,164,94)] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
