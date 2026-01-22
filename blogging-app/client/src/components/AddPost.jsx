import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Pencil, ImagePlus, Tag } from "lucide-react";

// available categories here
const categories = [
  "Tech",
  "Lifestyle",
  "Travel",
  "Food",
  "Education",
  "Business",
  "Health",
  "Entertainment",
  "Other"
];

const AddPost = ({ setPosts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(""); // <-- new state
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required!");
      return;
    }
    if (!category) {
      toast.error("Please select a category!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category); // <-- add category to formData
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await axios.post("https://blogging-app-using-mern-stack.onrender.com/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("🎉 Blog post created successfully!");
      fetchPosts();
      setTitle("");
      setContent("");
      setImage(null);
      setCategory(""); // reset category
    } catch (error) {
      console.error("Error adding post:", error);
      toast.error("❌ Failed to create blog post");
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://blogging-app-using-mern-stack.onrender.com/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{ backgroundImage: "url('/assets/blog-bg.svg')" }}
    >
      {/* Overlay for blur and dimming */}
      <div
        className="absolute inset-0 bg-white/70 backdrop-blur-md z-0 pointer-events-none"
        aria-hidden="true"
      ></div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 relative z-10">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-2">
            <Pencil className="w-8 h-8 text-indigo-600" />
            Create a New Blog
          </h2>
          <p className="text-gray-500 mt-2 text-lg">Share your thoughts and inspire others.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7"
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Pencil className="w-4 h-4 text-indigo-500" />
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a catchy title"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-800 bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Pencil className="w-4 h-4 text-indigo-500" />
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="Write your post content here..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-y text-gray-800 bg-gray-50"
              required
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-500" />
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-800 bg-gray-50"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <ImagePlus className="w-4 h-4 text-indigo-500" />
              Upload Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Posting..." : "Add Post"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddPost;
