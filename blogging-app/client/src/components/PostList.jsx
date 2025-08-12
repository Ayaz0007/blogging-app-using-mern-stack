import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext); // Get user from context

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      style={{ backgroundImage: "url('/assets/blog-bg.svg')" }}
    >
      {/* Overlay for blur and dimming */}
      <div
        className="absolute inset-0 bg-white/60 backdrop-blur-md z-0 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          📝 Latest Blogs
        </h1>

        {posts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No blogs found. Add new blogs!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-md transition duration-300 overflow-hidden flex flex-col group
    hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-400 hover:bg-indigo-50/60 border border-transparent"
              >
                {/* Blog Image */}
                <img
                  src={
                    post.image
                      ? `http://localhost:5000/uploads/${post.image}`
                      : "/assets/elementor-placeholder-image.webp"
                  }
                  alt={post.title}
                  className="h-48 w-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-95"
                />

                {/* Blog Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold text-slate-800 group-hover:text-indigo-700 transition">
                      {post.title}
                    </h2>
                    {/* Category Badge aligned right */}
                    {post.category && (
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full w-fit ml-2">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mb-2 line-clamp-4 group-hover:text-slate-800 transition">{post.content}</p>

                  {/* Read More Link */}
                  <Link
                    to={`/post/${post._id}`}
                    className="text-sm font-semibold text-slate-800 hover:underline group-hover:text-indigo-600 transition"
                  >
                    Read more...
                  </Link>

                  <p className="text-xs text-slate-400 mt-auto">
                    🗓 Posted on:{" "}
                    {new Date(post.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  {/* Only show delete button for admin */}
                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 text-sm"
                    >
                      <MdDelete className="text-lg" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PostList;
