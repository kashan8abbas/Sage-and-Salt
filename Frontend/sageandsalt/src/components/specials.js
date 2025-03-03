import React, { useState } from "react";

export function Specials({ id }) {
  const specials = [
    {
      title: "Modi sit est",
      heading: "Et blanditiis nemo veritatis excepturi",
      description:
        "Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka",
      details:
        "Ea ipsum voluptatem consequatur quis est. Illum error ullam omnis quia et reiciendis sunt sunt est. Non aliquid repellendus itaque accusamus eius et velit ipsa voluptates. Optio nesciunt eaque beatae accusamus lerode pakto madrina desera vafle de nideran pal",
      image: "path-to-image-1.jpg",
    },
    {
      title: "Unde praesentium sed",
      heading: "Praesentium dolorem exercitationem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis est iste veniam sit qui natus.",
      details:
        "Voluptatum voluptatem pariatur nihil vero. Saepe et sit voluptas quisquam neque ut laudantium rerum eligendi explicabo beatae.",
      image: "path-to-image-2.jpg",
    },
    {
      title: "Pariatur explicabo vel",
      heading: "Vel quidem aliquid dolorem",
      description:
        "Adipisci atque velit repellendus asperiores. Corporis assumenda rem. Nemo asperiores et sit exercitationem.",
      details:
        "Accusamus deleniti labore atque voluptatum et. Nihil eligendi sit voluptatum corporis labore rerum non facere minima!",
      image: "path-to-image-3.jpg",
    },
    {
      title: "Nostrum qui quasi",
      heading: "Molestiae vitae repellendus",
      description:
        "Vel nostrum aliquid quisquam autem tempora quisquam totam accusantium deserunt dolor.",
      details:
        "Dignissimos delectus accusamus in deleniti. Eos voluptatem distinctio omnis nostrum corrupti beatae ex voluptatem suscipit.",
      image: "path-to-image-4.jpg",
    },
    {
      title: "Iusto ut expedita aut",
      heading: "Ratione impedit voluptas",
      description:
        "Enim dolorem magnam neque quibusdam voluptatem molestiae. Aspernatur sed recusandae aliquid velit.",
      details:
        "Eaque reprehenderit in aliquid tempora suscipit. Consequuntur necessitatibus exercitationem quidem libero labore. Adipisci voluptatem rerum molestiae.",
      image: "path-to-image-5.jpg",
    },
  ];

  const [selectedSpecial, setSelectedSpecial] = useState(specials[0]); // Default selected

  return (
    <div id={id} className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h3 className="text-left text-gray-400 uppercase tracking-wide mb-6 flex items-center">
            SPECIALS
            <span className="ml-2 w-24 h-px bg-gray-400"></span>
          </h3>

          <h2 className="text-left text-2xl md:text-3xl font-bold text-[rgb(205,164,94)] mb-8">
            Check Our Specials
          </h2>
        </div>

        {/* Menu Content Row */}
        <div className="flex flex-wrap lg:flex-nowrap lg:gap-8">
          {/* Left Section (Vertical Buttons) */}
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
          {specials.map((special, index) => (
            <button
              key={index}
              onClick={() => setSelectedSpecial(special)}
              className={`block w-full text-left py-4 px-6 text-sm font-medium border-l-4 lg:border-r-4 ${
                selectedSpecial.title === special.title
                  ? "bg-[rgb(205,164,94)] text-black border-[rgb(205,164,94)]"
                  : "text-gray-400 hover:text-[#F4B41A] hover:bg-gray-800 transition border-[rgb(205,164,94)]"
              }`}
            >
              {special.title}
            </button>
          ))}
        </div>


          {/* Middle Section (Details) */}
          <div className="w-full lg:w-2/4 mb-6 lg:mb-0 lg:pr-8">
            <h3 className="text-white text-2xl font-bold mb-2">
              {selectedSpecial.heading}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {selectedSpecial.description}
            </p>
            <p className="text-gray-400 text-sm">{selectedSpecial.details}</p>
          </div>

          {/* Right Section (Image) */}
          <div className="w-full lg:w-1/4 flex justify-center lg:block">
            <img
              src={"logo.png"}
              alt={selectedSpecial.title}
              className="rounded-lg shadow-lg h-64 lg:h-80 w-full lg:w-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
