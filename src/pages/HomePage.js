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
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 md:py-24"
    >
      <div className="max-w-4xl mx-auto text-center">
        {profileImage && (
          <div className="mb-8 flex justify-center">
            <img 
              src={profileImage} 
              alt={name} 
              className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow-lg"
            />
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          {heading || `Hi, I'm ${name}`}
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
          {subheading || title}
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          {bio}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to={ctaUrl || "/projects"} 
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            {ctaButton || "View My Work"}
          </Link>
          <Link 
            to="/contact" 
            className="bg-white hover:bg-gray-100 text-primary font-semibold py-3 px-8 rounded-lg shadow-md border border-primary transition duration-300 ease-in-out transform hover:scale-105"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage; 