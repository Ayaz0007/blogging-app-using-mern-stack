import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-semibold text-gray-900">BlogBook</h2>
            <p className="text-sm text-gray-500 mt-1">
              Your daily dose of stories & insights.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <a href="/" className="hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="/about" className="hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="/contact" className="hover:text-gray-900 transition-colors">
              Contact
            </a>
            <a href="/privacy" className="hover:text-gray-900 transition-colors">
              Privacy
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 text-gray-400">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} BlogBook. All rights reserved.
          </p>
          <p className="mt-2 sm:mt-0">
            Crafted with ❤️ by <span className="font-medium text-gray-900">Mohd Ayaz</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
