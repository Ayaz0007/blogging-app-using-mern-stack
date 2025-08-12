import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(); // uses context logout
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const handleNavClick = () => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const navLinkClass = (path) =>
    `text-sm font-medium transition-colors ${
      isActive(path)
        ? "text-gray-900 font-semibold"
        : "text-gray-700 hover:text-gray-900"
    }`;

  const categories = [
    "Tech",
    "Lifestyle",
    "Travel",
    "Food",
    "Education",
    "Business",
    "Health",
    "Entertainment",
    "Other",
  ];

  const navItems = (
    <>
      <Link to="/" className={navLinkClass("/")} onClick={handleNavClick}>
        Home
      </Link>
      <Link
        to="/about"
        className={navLinkClass("/about")}
        onClick={handleNavClick}
      >
        About
      </Link>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900 text-sm font-medium"
        >
          Categories <FiChevronDown className="w-4 h-4" />
        </button>
        {isDropdownOpen && (
          <div className="absolute mt-2 w-40 bg-white rounded-md shadow-md py-2 z-50">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={handleNavClick}
              >
                {cat}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link
        to="/add"
        className={navLinkClass("/add")}
        onClick={handleNavClick}
      >
        Add Blog
      </Link>

      {user ? (
        <>
          <Link
            to="/profile"
            className={navLinkClass("/profile")}
            onClick={handleNavClick}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-700 hover:text-red-600 font-medium transition-colors"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
            onClick={handleNavClick}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1.5 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-medium"
            onClick={handleNavClick}
          >
            Sign Up
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-shadow duration-300 ${
        isScrolled ? "shadow-sm bg-white/80" : "bg-white/60"
      }`}
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 font-inter">
        <div className="flex flex-wrap justify-between items-center h-16">
          <Link
            to="/"
            className="text-lg font-semibold text-gray-900 tracking-tight"
          >
            BlogBook
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">{navItems}</div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Items */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-2 py-2 space-y-3 bg-white/90 backdrop-blur-md border-t border-gray-200"
          >
            <div className="flex flex-col gap-2">{navItems}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
