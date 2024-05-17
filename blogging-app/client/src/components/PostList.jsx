import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md"; // Importing delete icon from react-icons

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // Deleting posts using id
  const handleDelete = async (id) => {
    try {
      console.log("Deleting post with ID:", id);
      await axios.delete(`http://localhost:5000/posts/${id}`);
      console.log("Post deleted successfully");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error.response.data.message);
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

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto my-20">
      {posts.length === 0 ? (
        <div className="text-center text-gray-500">No blogs found. Add new blogs!</div>
      ) : (
        posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sorting in descending order of createdAt
          .map((post) => (
            <div key={post._id} className="posts my-4 p-4 border border-gray-200 rounded-md shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <p className="text-xs text-gray-400">Posted on: {new Date(post.createdAt).toLocaleString()}</p>
              <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-300">
                <MdDelete /> {/* Using delete icon */}
              </button>
            </div>
          ))
      )}
    </div>
  );
};

export default PostList;
