import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100">
      {/* Image (if available) */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-60 object-cover"
        />
      )}

      <div className="p-6 space-y-3">
        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-800 hover:text-primary-600 transition">
          {post.title}
        </h3>

        {/* Content (trimmed preview) */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {post.content.length > 160
            ? post.content.slice(0, 160) + "..."
            : post.content}
        </p>

        {/* Meta/Footer (optional) */}
        <div className="flex justify-between items-center pt-4 border-t text-sm text-gray-400">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <button className="text-primary-600 font-medium hover:underline">
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
