import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn, login } = useContext(AuthContext); // use login instead of setUser
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("https://blogging-app-using-mern-stack.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save user info including role to localStorage and context
        login({ token: data.token, ...data.user }); // <-- use login from context
        localStorage.setItem("userEmail", email);
        localStorage.setItem("token", data.token);
        getLoggedIn();
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8fa] px-4 font-[Inter]">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-10">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Welcome Back 👋
        </h1>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Floating Email Field */}
          <div className="relative">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-black shadow-sm transition"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
            >
              Email address
            </label>
          </div>

          {/* Floating Password Field */}
          <div className="relative">
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-black shadow-sm transition"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition"
          >
            Continue
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
