import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        {/* Replace with your image path */}
        <img
          src="/restaurent.jpg"
          alt="Restaurant Ambiance"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-4xl px-4 md:px-24 py-8 mt-12 md:mt-28 text-center md:text-left">
          <h1 className="text-5xl md:text-5xl font-bold mb-4 text-white leading-tight">
            Welcome to{" "}
            <span className="text-[rgb(205,164,94)]">Sage And Salt</span>
          </h1>
          <p className="text-lg md:text-2xl mb-8 text-gray-200">
            Delivering great food for more than 18 years!
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link to="/#menu" className="inline-block">
              <button className="rounded-full px-6 md:px-8 py-2 border-2 border-[rgb(205,164,94)] text-white font-bold hover:bg-[rgb(205,164,94)] hover:text-white transition-colors duration-300">
                OUR MENU
              </button>
            </Link>
            <Link to="/#reservation" className="inline-block">
              <button className="rounded-full px-6 md:px-8 py-2 border-2 border-[rgb(205,164,94)] text-white font-bold hover:bg-[rgb(205,164,94)] hover:text-white transition-colors duration-300">
                BOOK A TABLE
              </button>
            </Link>
          </div>
        </div>
        {/* <button
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
          aria-label="Play video"
        >
          <Play className="h-6 w-6 md:h-8 md:w-8 text-white" />
        </button> */}
      </div>
    </div>
  );
}
