import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContent } from '../utils/contentLoader';

const HomePage = () => {
  const { content, loading } = useContent();
  
  if (loading || !content) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }
  
  const { heading, subheading, ctaButton, ctaUrl } = content.home;
  const { name, title, bio, profileImage } = content.personal;
  
  // Format bio to handle multiline text
  const formattedBio = bio.replace(/\n+/g, ' ').trim();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 flex flex-col items-center"
    >
      <div className="flex flex-col items-center text-center max-w-4xl">
        <img 
          src={profileImage || "/profile-placeholder.jpg"} 
          alt={name} 
          className="w-40 h-40 rounded-full shadow-lg mb-8 object-cover"
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          {heading || `Hi, I'm ${name}`}
        </h1>
        <h2 className="text-xl sm:text-2xl font-medium text-gray-600 mb-6">
          {subheading || title}
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto text-justify">
          {formattedBio}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to={ctaUrl || "/projects"} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            {ctaButton || "View My Work"}
          </Link>
          <Link 
            to="/contact" 
            className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md border border-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage; 