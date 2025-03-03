import React, { useState, useEffect } from "react";

export function CustomerReviews({ id }) {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transition, setTransition] = useState("translate-x-0 opacity-100");
  const reviewsPerPage = 3;

  // Fetch Feedback Data from API
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/feedback/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reviews.");
      }

      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err.message);
    }
  };

  useEffect(() => {
    fetchFeedbacks(); // Fetch data on component mount
  }, []);

  // Pagination Logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Smooth Pagination Transition
  const handlePagination = (pageNumber) => {
    setTransition("-translate-x-full opacity-0"); // Start animation
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setTransition("translate-x-0 opacity-100"); // Reset animation
    }, 300); // Animation duration
  };

  return (
    <div id={id} className="bg-[rgb(26,24,20)] py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="text-center mb-12">
          <h3 className="text-left text-gray-400 uppercase tracking-wide mb-6 flex items-center">
            REVIEWS
            <span className="ml-2 w-24 h-px bg-gray-400"></span>
          </h3>

          <h2 className="text-left text-2xl md:text-3xl font-bold text-[rgb(205,164,94)] mb-8">
            What They're Saying About Us!
          </h2>
        </div>

        {/* Reviews Section with Smooth Transition */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-300 ease-in-out ${transition}`}
        >
          {currentReviews.length > 0 ? (
            currentReviews.map((review, index) => (
              <div
                key={index}
                className="bg-[rgb(38,35,29)] rounded-lg p-6 shadow-lg text-left"
              >
                <p className="text-[#F4B41A] text-2xl mb-4">“</p>
                <p className="text-gray-300 italic mb-6">
                  {review.comment || "No comment provided"}
                </p>
                <div className="flex items-center">
                  <img
                    src={review.userImage || "https://via.placeholder.com/64"}
                    alt={review.userName || "User"}
                    className="w-12 h-12 rounded-full border-2 border-[#F4B41A] object-cover"
                  />
                  <div className="ml-4">
                    <p className="text-gray-200 font-semibold">
                      {review.userName || "Anonymous"}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Rating: {review.rating || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-3">
              No reviews found.
            </p>
          )}
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center space-x-2">
          {Array.from(
            { length: Math.ceil(reviews.length / reviewsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePagination(index + 1)}
                className={`w-3 h-3 rounded-full bg-gray-600 hover:bg-[#F4B41A] transition ${
                  currentPage === index + 1 ? "bg-[#F4B41A]" : ""
                }`}
              ></button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
