import React, { useState, useEffect } from "react";

export function Profile() {
  const [user, setUser] = useState(null); 
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    preferredAddress: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("authToken");
  
      if (!token) throw new Error("Token not found. Please log in.");
  
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Check if response is not JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid API response format");
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch user data.");
      }
  
      const data = await response.json();
      setUser(data); 
      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err.message);
      setError(err.message);
      setLoading(false);
    }
  };
  
  

  // Handle Form Submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      const data = await response.json();
      setUser(data.user); 
      setEditing(false); 
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="relative min-h-screen bg-[rgb(15,11,11)] py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 justify-center">
          <h2 className="text-left text-xl md:text-4xl font-bold text-[rgb(205,164,94)] mb-8 mt-20 text-center">
            Manage Your Profile
          </h2>
        </div>

        {loading && <p className="text-white">Loading profile...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {user && !editing && (
          <div className="flex justify-center items-center h-300 bg-black">
          <div className="bg-black border border-[rgb(205,164,94,0.8)] rounded-lg p-8 max-w-full w-full space-y-6 shadow-lg">
        
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              <p className="text-[rgb(205,164,94,0.8)] text-lg">
                <strong className="font-semibold text-[rgb(205,164,94)]">
                  Name:
                </strong>{" "}
                {user.name || "N/A"}
              </p>
        
              <p className="text-[rgb(205,164,94,0.8)] text-lg">
                <strong className="font-semibold text-[rgb(205,164,94)]">
                  Email:
                </strong>{" "}
                {user.email || "N/A"}
              </p>
        
              <p className="text-[rgb(205,164,94,0.8)] text-lg">
                <strong className="font-semibold text-[rgb(205,164,94)]">
                  Contact:
                </strong>{" "}
                {user.contactNumber || "N/A"}
              </p>
            </div>
        
            <p className="text-[rgb(205,164,94,0.8)] text-lg text-center">
              <strong className="font-semibold text-[rgb(205,164,94)]">
                Preferred Address:
              </strong>{" "}
              {user.preferredAddress || "N/A"}
            </p>
        
            <div className="flex justify-center">
              <button
                onClick={() => setEditing(true)}
                className="mt-4 px-8 py-3 bg-[rgb(205,164,94)] text-black font-semibold rounded-full hover:bg-[#d69e19] transition"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        
        )}

        {editing && (
          <form className="space-y-6" onSubmit={handleUpdateProfile}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 focus:outline-none focus:border-[#F4B41A]"
                placeholder="Name"
                required
              />
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
                className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 focus:outline-none focus:border-[#F4B41A]"
                placeholder="Contact Number"
                required
              />
            </div>

            <input
              type="text"
              name="preferredAddress"
              value={formData.preferredAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferredAddress: e.target.value,
                })
              }
              className="bg-black border border-[rgb(205,164,94,0.5)] text-[rgb(205,164,94,0.8)] px-4 py-2 w-full focus:outline-none focus:border-[#F4B41A]"
              placeholder="Preferred Address"
              required
            />

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-3 bg-[rgb(205,164,94)] text-black font-semibold rounded-full hover:bg-[#d69e19] transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-gray-600 text-white rounded-full"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
