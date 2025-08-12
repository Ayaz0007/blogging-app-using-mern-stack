import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddPost from "./components/AddPost";
import PostList from "./components/PostList";
import axios from "axios";
import About from "./components/About";
import "./index.css";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { useAuth } from "./context/AuthContext";
import SinglePost from "./components/SinglePost";
import EditPost from "./components/EditPost";
import Category from "./components/Category";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <>
      {/* Show navbar only if not on login/signup */}
      {!["/login", "/signup"].includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={user ? <PostList posts={posts} /> : <Navigate to="/login" />}
        />
        <Route
          path="/add"
          element={
            user ? <AddPost setPosts={setPosts} /> : <Navigate to="/login" />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route
          path="/category/:category"
          element={<Category />}
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>

      {/* Show footer only if not on login/signup */}
      {!["/login", "/signup"].includes(location.pathname) && <Footer />}

      {/* ✅ ToastContainer (Globally available toast notification UI) */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
