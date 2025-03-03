import React, { useState } from "react";

export function Events({ id }) {
  const events = [
    {
      title: "Private Parties",
      price: "$290",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      details: [
        "Ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit.",
        "Ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      ],
      image: "restaurent.jpg",
    },
    {
      title: "Corporate Events",
      price: "$350",
      description: "Proin eget tortor risus. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt.",
      details: [
        "Fusce suscipit ligula vel quam viverra sit amet.",
        "Curabitur aliquet quam id dui posuere blandit.",
        "Cras ultricies ligula sed magna dictum porta.",
        "Donec rutrum congue leo eget malesuada.",
      ],
      image: "restaurent.jpg",
    },
    {
      title: "Wedding Receptions",
      price: "$500",
      description: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.",
      details: [
        "Sed porttitor lectus nibh.",
        "Donec sollicitudin molestie malesuada.",
        "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.",
        "Nulla porttitor accumsan tincidunt.",
      ],
      image: "restaurent.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const currentEvent = events[currentIndex];

  return (
    <div
      id={id}
      className="relative min-h-screen pb-4 bg-cover bg-center bg-fixed flex items-center justify-center pt-10"
      style={{
        backgroundImage: "url('/restaurent.jpg')",
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-80 pointer-events-none"></div>

      {/* Content Wrapper */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h3 className="text-left text-gray-400 uppercase tracking-wide mb-6 flex items-center">
            EVENTS
            <span className="ml-2 w-24 h-px bg-gray-400"></span>
          </h3>

          <h2 className="text-left text-2xl md:text-3xl font-bold text-[rgb(205,164,94)] mb-8">
            Organize Your Birthdays
          </h2>
        </div>

        {/* Event Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Image */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={currentEvent.image}
              alt={currentEvent.title}
              className="rounded-lg shadow-lg w-full lg:w-auto"
            />
          </div>

          {/* Event Details */}
          <div>
            <h3 className="text-white text-3xl font-bold">{currentEvent.title}</h3>
            <p className="text-[#F4B41A] text-2xl font-bold mb-4 mt-2">{currentEvent.price}</p>
            <p className="text-gray-400 text-sm mb-4">{currentEvent.description}</p>
            <ul className="text-gray-400 text-sm list-disc list-inside space-y-2">
              {currentEvent.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={handlePrev}
            className="w-8 h-8 bg-gray-800 text-white flex items-center justify-center rounded-full hover:bg-gray-700 transition"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 bg-gray-800 text-white flex items-center justify-center rounded-full hover:bg-gray-700 transition"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
