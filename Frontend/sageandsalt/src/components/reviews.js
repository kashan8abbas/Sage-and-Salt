import React from "react";

export function CustomerReviews({ id }) {
  const reviews = [
    {
      quote:
        "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus.",
      name: "Saul Goodman",
      title: "CEO & Founder",
      image: "https://via.placeholder.com/64",
    },
    {
      quote:
        "Export tempor illum tamen malis malis eram quae irure esse labore quem cillum.",
      name: "Sara Wilson",
      title: "Designer",
      image: "https://via.placeholder.com/64",
    },
    {
      quote:
        "Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla.",
      name: "Jena Karlis",
      title: "Store Owner",
      image: "https://via.placeholder.com/64",
    },
  ];

  return (
    <div id={id} className=" bg-[rgb(26,24,20)] py-16">

      <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="text-center mb-12">
      <h3 className="text-left text-gray-400 uppercase tracking-wide mb-6 flex items-center">
        REVIEWS
        <span className="ml-2 w-24 h-px bg-gray-400"></span>
      </h3>

      <h2 className="text-left text-2xl md:text-3xl font-bold text-[rgb(205,164,94)] mb-8">
        What They're saying about us!
      </h2>
    </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[rgb(38,35,29)] rounded-lg p-6 shadow-lg text-left"
            >
              <p className="text-[#F4B41A] text-2xl mb-4">“</p>
              <p className="text-gray-300 italic mb-6">{review.quote}</p>
              <div className="flex items-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-[#F4B41A]"
                />
                <div className="ml-4">
                  <p className="text-gray-200 font-semibold">{review.name}</p>
                  <p className="text-gray-400 text-sm">{review.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center space-x-2">
          {reviews.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full bg-gray-600 hover:bg-[#F4B41A] transition ${
                index === 0 ? "bg-[#F4B41A]" : ""
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}