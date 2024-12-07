import React from "react";
import { Check } from "lucide-react";

export function AboutSection({ id }) {
  return (
    <div
      id={id}
      className="relative min-h-screen py-16 bg-cover bg-center bg-fixed flex items-center justify-center px-4 md:px-12"
      style={{ backgroundImage: "url('/restaurent.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Section */}
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-white leading-tight max-w-xl mx-auto lg:mx-0">
              Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.
            </h2>

            <p className="text-gray-400 italic max-w-md mx-auto lg:mx-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <ul className="space-y-4 max-w-md mx-auto lg:mx-0">
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-[#F4B41A] mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm md:text-base">
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-[#F4B41A] mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm md:text-base">
                  Duis aute irure dolor in reprehenderit in voluptate velit.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-[#F4B41A] mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm md:text-base">
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.
                </span>
              </li>
            </ul>

            <p className="text-gray-400 max-w-md mx-auto lg:mx-0 text-sm md:text-base">
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Right Section */}
          <div className="relative group">
            <div className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 border-t-4 border-r-4 border-[rgb(205,164,94)] z-10 transition-all group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 border-b-4 border-l-4 border-[rgb(205,164,94)] z-10 transition-all group-hover:scale-110" />

              <img
                src="/aboutpic.jpg"
                alt="Restaurant Interior"
                className="w-full h-48 md:h-64 lg:h-full object-cover rounded-sm border-4 border-[rgb(205,164,94)] transition-transform transform group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Why Us Section */}
        <div className="p-6 md:p-12 mt-16 flex justify-center items-center bg-[#0F0B0B] rounded-lg">
          <div className="w-full max-w-7xl mx-auto">
            <h3 className="text-left text-gray-400 uppercase tracking-wide mb-6 flex items-center">
              Why Us
              <span className="ml-2 w-16 md:w-24 h-px bg-gray-400"></span>
            </h3>

            <h2 className="text-left text-xl md:text-3xl font-bold text-[rgb(205,164,94)] mb-8">
              Why Choose Our Restaurant
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-black p-6 text-white transition-colors duration-300 hover:bg-[rgb(205,164,94)] hover:text-white rounded-md">
                <h4 className="text-xl md:text-2xl font-semibold text-[#F4B41A] group-hover:text-black mb-4 transition-colors duration-300">
                  01
                </h4>
                <h5 className="font-bold mb-2 group-hover:text-black transition-colors duration-300">
                  Lorem Ipsum
                </h5>
                <p className="text-gray-400 text-sm md:text-base group-hover:text-black transition-colors duration-300">
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Et consectetur ducimus vero placeat.
                </p>
              </div>

              <div className="group bg-black p-6 text-white transition-colors duration-300 hover:bg-[rgb(205,164,94)] hover:text-white rounded-md">
                <h4 className="text-xl md:text-2xl font-semibold text-[#F4B41A] group-hover:text-black mb-4 transition-colors duration-300">
                  02
                </h4>
                <h5 className="font-bold mb-2 group-hover:text-black transition-colors duration-300">
                  Repellat Nihil
                </h5>
                <p className="text-gray-400 text-sm md:text-base group-hover:text-black transition-colors duration-300">
                  Dolorem est fugiat occaecati voluptate velit esse. Dicta veritatis dolor quod et vel dire leno para dest.
                </p>
              </div>

              <div className="group bg-black p-6 text-white transition-colors duration-300 hover:bg-[rgb(205,164,94)] hover:text-white rounded-md">
                <h4 className="text-xl md:text-2xl font-semibold text-[#F4B41A] group-hover:text-black mb-4 transition-colors duration-300">
                  03
                </h4>
                <h5 className="font-bold mb-2 group-hover:text-black transition-colors duration-300">
                  Ad ad velit qui
                </h5>
                <p className="text-gray-400 text-sm md:text-base group-hover:text-black transition-colors duration-300">
                  Molestiae officiis omnis illo asperiores. Aut doloribus vitae sunt debitis quo vel nam quis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
