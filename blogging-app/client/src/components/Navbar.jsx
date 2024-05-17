// client/src/components/Navbar.js
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!loggedInUser);
  }, []);

  const logout = async () => {
    await fetch("http://localhost:5000/auth/logout");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white text-2xl font-bold">BlogBook</span>
          </div>
          <div className="hidden md:flex">
            <Link to="/" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md">Home</Link>
            <Link to="/about" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md">About</Link>
            <Link to="/add" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md">Add Blog</Link>
            {isLoggedIn ? (
              <>
                <button onClick={logout} className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md">Logout</button>
                <Link to="/profile" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md">Profile</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md">Login</Link>
                <Link to="/signup" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md">Sign Up</Link>
              </>
            )}
          </div>
          <div className="md:hidden flex">
            <button className="text-white hover:bg-indigo-700 px-2 py-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
