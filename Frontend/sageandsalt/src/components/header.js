import { Link } from "react-router-dom";
import { Phone, Clock, Menu, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed w-full z-50">
      {/* Top Header */}
      <div className="bg-black/95 text-xs md:text-sm py-2 px-4 md:px-15">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          {/* Phone and Timings */}
          <div className="flex flex-wrap items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-4">
            <Phone className="h-4 w-4 md:h-5 md:w-5 text-[#F4B41A]" />
            <span className="text-gray-300 text-[12px] md:text-sm lg:text-base">
              +92 318 3933088
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-[#F4B41A]" />
            <span className="text-gray-300 text-[12px] md:text-sm lg:text-base">
              Mon-Sat: 11AM - 23PM
            </span>
          </div>
        </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-black border-b border-gray-900 py-3 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
                    <img
            src="/logo.jpg"
            alt="Sage & Salt Logo"
            className="h-12 w-12 rounded-full border-4 border-[rgb(205,164,94)] object-cover"
          />

            <img
              src="/name.png"
              alt="Sage & Salt Name"
              className="h-5 w-21 md:h-9 md:w-36"
            />
          </Link>

          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 ml-28" /> : <Menu className="h-6 w-6 ml-28" />}
          </button>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-8`}>
            <Link to="/" className="text-xs md:text-sm text-white hover:text-[#F4B41A] transition-colors">
              Home
            </Link>
            <Link
              to="/#about"
              className="text-xs md:text-sm text-white hover:text-[#F4B41A] transition-colors"
            >
              About
            </Link>
            <Link
              to="/#menu"
              className="text-xs md:text-sm text-white hover:text-[#F4B41A] transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/#specials"
              className="text-xs md:text-sm text-white hover:text-[#F4B41A] transition-colors"
            >
              Specials
            </Link>
            <Link
              to="/#events"
              className="text-xs md:text-sm text-white hover:text-[#F4B41A] transition-colors"
            >
              Events
            </Link>
            <Link
              to="/#reviews"
              className="text-xs md:text-sm text-white hover:text-[#F4B41A] transition-colors"
            >
              Reviews
            </Link>
            {/* <Link
              to="/#gallery"
              className="text-xs md:text-sm text-white hover:text-[#F4B41A] transition-colors"
            >
              Gallery
            </Link> */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="text-xs md:text-sm text-white hover:text-[#F4B41A] transition-colors"
              >
                Orders & Reservations
              </button>
              {isDropdownOpen && (
                <div className="absolute bg-[rgb(205,164,94)] text-white rounded-md shadow-lg mt-2 w-48">
                  <ul>
                    <li>
                      <Link
                        to="/cart"
                        className="text-[rgb(15,11,11)] font-medium block px-4 py-2 text-xs md:text-sm hover:bg-[rgb(15,11,11)] hover:text-[rgb(205,164,94)] transition-colors"
                        onClick={closeDropdown}
                      >
                        View Cart
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className="text-[rgb(15,11,11)] font-medium block px-4 py-2 text-xs md:text-sm hover:bg-[rgb(15,11,11)] hover:text-[rgb(205,164,94)] transition-colors"
                        onClick={closeDropdown}
                      >
                        View Orders
                      </Link>
                    </li>
                    
                    <li>
                      <Link
                        to="/reservations"
                        className="text-[rgb(15,11,11)] font-medium block px-4 py-2 text-xs md:text-sm hover:bg-[rgb(15,11,11)] hover:text-[rgb(205,164,94)] transition-colors"
                        onClick={closeDropdown}
                      >
                        View Reservations
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/#reservation"
                        className="text-[rgb(15,11,11)] font-medium block px-4 py-2 text-xs md:text-sm hover:bg-[rgb(15,11,11)] hover:text-[rgb(205,164,94)] transition-colors"
                        onClick={closeDropdown}
                      >
                        Reserve Table
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <Link
              to="/#contact"
              className="text-xs md:text-sm text-white hover:text-[#F4B41A] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Book Table Button */}
          <div className="flex items-center space-x-4">
          <Link to="/#reservation" className="hidden md:inline-block">
            <button className="rounded-full px-4 py-1 border-2 border-[rgb(205,164,94)] text-xs md:text-sm text-white font-normal hover:bg-[rgb(205,164,94)] hover:text-white transition-colors duration-300">
              BOOK A TABLE
            </button>
          </Link>
          <div className="rounded-full border-2 border-[rgb(205,164,94)] h-9 w-9 overflow-hidden">
            <Link to="/profile">
              <img
                src="person.png"
                alt="Profile Icon"
                className="h-full w-full object-cover"
              />
            </Link>
          </div>
        </div>

        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="bg-black border-t border-gray-900 mt-3 py-4 px-6 md:hidden">
            <ul className="space-y-4">
              {["Home", "About", "Menu", "Specials", "Events", "Reviews", "Gallery"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/#${item.toLowerCase()}`}
                    className="text-xs text-white hover:text-[#F4B41A] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/cart"
                  className="text-xs text-white hover:text-[#F4B41A] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  View Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="text-xs text-white hover:text-[#F4B41A] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  View Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/reservations"
                  className="text-xs text-white hover:text-[#F4B41A] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  View Reservations
                </Link>
              </li>
              <li>
                <Link
                  to="/#reservation"
                  className="text-xs text-white hover:text-[#F4B41A] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Reserve Table
                </Link>
              </li>
              <li>
                <Link
                  to="/#reservation"
                  className="rounded-full px-6 py-1 border-2 border-[rgb(205,164,94)] text-xs text-white font-normal hover:bg-[rgb(205,164,94)] hover:text-white transition-colors duration-300 block text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  BOOK A TABLE
                </Link>
              </li>
              <li>
              <div className="rounded-full border-2 border-[rgb(205,164,94)] h-16 w-16 overflow-hidden">
                <Link
                  to="/profile"
                >
                <img
                  src="person.png"
                  alt="Profile Icon"
                  className="h-full w-full object-cover"
                />
                </Link>
                
            </div>

              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
