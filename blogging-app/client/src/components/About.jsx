// client/src/components/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto my-20 px-4">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="text-lg text-gray-800 leading-relaxed mb-6 rounded shadow-lg px-4 py-4 bg-beige">
        Welcome to BlogBook, your go-to platform for sharing and discovering
        compelling stories, insights, and ideas. At BlogBook, we believe in the
        power of storytelling to connect people, inspire change, and foster
        understanding. Our mission is to provide a welcoming space where
        writers, bloggers, and readers from all walks of life can come together
        to share their passions and engage in meaningful conversations.
      </p>
      <p className="text-lg text-gray-800 leading-relaxed mb-6 rounded shadow-lg px-4 py-4 bg-beige">
        Whether you're a seasoned writer or just starting out, BlogBook offers
        the tools and support you need to bring your stories to life. From
        personal blogs to thought-provoking essays, we welcome a diverse range
        of voices and perspectives. Join our community today and start sharing
        your story with the world!
      </p>
      <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
      <p className="text-lg text-gray-800 leading-relaxed mb-6 rounded shadow-lg px-4 py-4 bg-beige">
        Our vision is to create a vibrant and inclusive online community where
        everyone has a voice and every story matters. We believe in the power
        of storytelling to inspire, educate, and unite people across the globe.
        By providing a platform for sharing diverse perspectives and
        experiences, we hope to promote empathy, understanding, and positive
        change in the world.
      </p>
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="text-lg text-gray-800 leading-relaxed mb-6 rounded shadow-lg px-4 py-4 bg-beige">
        Have a question, suggestion, or just want to say hello? We'd love to
        hear from you! You can reach out to us at -
        <a
          className="text-blue-500 hover:underline"
          href="mailto:contact@blogbook.com"
        >
          contact@blogbook.com
        </a>
        , and we'll get back to you as soon as possible.
      </p>
    </div>
  );
};

export default About;
