// src/components/SinglePost.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://blogging-app-using-mern-stack.onrender.com/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6f8fa]">
        <span className="text-gray-400 text-lg">Loading...</span>
      </div>
    );

  return (
    <section className="min-h-screen bg-[#f6f8fa] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-3xl p-8 relative">
        <img
          src={
            post.image
              ? `https://blogging-app-using-mern-stack.onrender.com/uploads/${post.image}`
              : "/assets/elementor-placeholder-image.webp"
          }
          alt={post.title}
          className="w-full h-64 object-cover rounded-2xl mb-8 shadow"
        />
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
            {post.title}
          </h1>
          {post.category && (
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
              {post.category}
            </span>
          )}
          <p className="text-sm text-gray-400 mt-2">
            🗓{" "}
            {new Date(post.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="prose prose-lg max-w-none text-gray-800 mb-8">
          {post.content}
        </div>
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-900 text-sm font-medium transition"
          >
            ← Back to Blogs
          </Link>
          <Link
            to={`/edit/${post._id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            ✏️ Edit Post
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SinglePost;
