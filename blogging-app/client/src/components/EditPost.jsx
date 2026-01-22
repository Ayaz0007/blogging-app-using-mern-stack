// src/components/EditPost.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://blogging-app-using-mern-stack.onrender.com/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://blogging-app-using-mern-stack.onrender.com/posts/${id}`, { title, content });
      navigate(`/post/${id}`);
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-6">✏️ Edit Post</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
          className="w-full px-4 py-2 border rounded"
          placeholder="Content"
          required
        />
        <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
