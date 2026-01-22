import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
        const res = await axios.get(`https://blogging-app-using-mern-stack.onrender.com/posts?category=${formattedCategory}`);
        setPosts(res.data);
      } catch (err) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryPosts();
  }, [category]);

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
          {category.charAt(0).toUpperCase() + category.slice(1)} Blogs
        </h1>
        {loading ? (
          <div className="text-center text-gray-500 text-lg">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No blogs found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
              >
                <img
                  src={
                    post.image
                      ? `https://blogging-app-using-mern-stack.onrender.com/uploads/${post.image}`
                      : "/assets/elementor-placeholder-image.webp"
                  }
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-slate-800 mb-2">
                    {post.title}
                  </h2>
                  {post.category && (
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 w-fit">
                      {post.category}
                    </span>
                  )}
                  <p className="text-slate-600 mb-2 line-clamp-4">{post.content}</p>
                  <Link
                    to={`/post/${post._id}`}
                    className="text-sm font-semibold text-slate-800 hover:underline"
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;