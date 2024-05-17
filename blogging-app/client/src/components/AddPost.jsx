import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddPost = ({ setPosts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/posts", { title, content });
      fetchPosts(); // Fetch posts after adding a new post
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto my-4 space-y-4 mt-20">
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        variant="outlined"
        color="primary"
        InputLabelProps={{ style: { color: "#007bff" } }}
        style={{ backgroundColor: "#f7f7f7" }} // Cool background color for title
      />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        color="primary"
        InputLabelProps={{ style: { color: "#007bff" } }}
        style={{ backgroundColor: "#f7f7f7" }} // Cool background color for content
      />
      <Button type="submit" variant="contained" className="bg-blue-500 text-white hover:bg-blue-600 mt-4">
        Add Post
      </Button>
    </form>
  );
};

export default AddPost;
