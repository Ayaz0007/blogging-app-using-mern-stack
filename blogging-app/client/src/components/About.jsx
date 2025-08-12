import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const team = [
  {
    name: "Anonymous",
    role: "Founder & Full Stack Developer",
    bio: "Passionate about storytelling, clean code, and building tools that empower creators.",
    image: "/team/img1.jpg", // Use real or placeholder image
    twitter: "#",
    linkedin: "#",
    github: "#",
  },
  {
    name: "John Doe",
    role: "Product Designer",
    bio: "Designs intuitive interfaces and focuses on a seamless reading experience.",
    image: "/team/img2.jpg",
    twitter: "#",
    linkedin: "#",
    github: "#",
  },
];

const timeline = [
  {
    year: "2024",
    title: "BlogBook was born",
    description: "Started as a side project to share developer stories and tech write-ups.",
  },
  {
    year: "2025",
    title: "Public Launch",
    description: "Opened the platform to creators across categories: lifestyle, tech, travel, and more.",
  },
  {
    year: "Future",
    title: "AI-powered Blogging",
    description: "We aim to integrate AI tools to make writing easier, faster, and more accessible.",
  },
];

const About = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 font-sans text-gray-800">
      {/* 🎨 Illustration Header */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-semibold mb-4 tracking-tight">
          Welcome to <span className="text-primary-600">BlogBook</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A modern blogging platform where creators share stories, insights, and experiences that
          matter. Built for writers, by writers.
        </p>
        <img
          src="/assets/blog-illustration.svg"
          alt="Blogging Illustration"
          className="mx-auto mt-10 max-w-md opacity-90"
        />
      </div>

      {/* 🧠 Mission */}
      <div className="space-y-6 mb-20">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed">
          We believe in the power of words to inspire, educate, and unite. BlogBook provides a
          platform for creators to express freely, connect deeply, and grow personally and
          professionally.
        </p>
      </div>

      {/* 👥 Meet the Team */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold mb-10 text-center">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-xl shadow-md p-6 bg-white hover:shadow-xl transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-medium">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{member.role}</p>
              <p className="text-sm text-gray-600 mb-3">{member.bio}</p>
              <div className="flex space-x-4 text-gray-500">
                <a href={member.twitter}><FaTwitter /></a>
                <a href={member.linkedin}><FaLinkedin /></a>
                <a href={member.github}><FaGithub /></a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 📜 Our Journey - Timeline */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold mb-10 text-center">Our Journey</h2>
        <ol className="relative border-l border-gray-300">
          {timeline.map((item, index) => (
            <li key={index} className="mb-12 ml-6">
              <div className="absolute w-3 h-3 bg-primary-600 rounded-full -left-1.5 top-2.5"></div>
              <h3 className="text-xl font-semibold">{item.year} - {item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* 📩 Contact */}
      <div className="text-center mt-20 bg-gray-50 rounded-xl py-12 px-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Let's Connect</h2>
        <p className="text-gray-600 mb-4">
          Have a suggestion, partnership idea, or just want to say hi?
        </p>
        <a
          className="text-primary-600 font-medium underline"
          href="mailto:contact@blogbook.com"
        >
          contact@blogbook.com
        </a>
      </div>
    </section>
  );
};

export default About;
