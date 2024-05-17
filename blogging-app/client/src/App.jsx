import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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

const App = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<PostList posts={posts} />} />
          <Route path="/add" element={<AddPost setPosts={setPosts} />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
