import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Hello, I'm <span className="text-primary">Sami Farhat</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              A passionate software developer with expertise in Python, I specialize in creating solutions that are both functional and beautiful.
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                to="/cv" 
                className="px-6 py-3 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300"
              >
                View My CV
              </Link>
              <Link 
                to="/projects" 
                className="px-6 py-3 bg-white text-primary border border-primary rounded-md hover:bg-gray-50 transition-colors duration-300"
              >
                See My Projects
              </Link>
            </motion.div>
          </div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="md:w-1/2"
          >
            <div className="relative rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80 mx-auto border-4 border-white shadow-xl">
              <img 
                src="/profile-photo.jpg" 
                alt="Sami Farhat" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brief About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            I'm a software developer with a passion for creating innovative solutions. I have experience in various technologies and enjoy working on challenging projects. When I'm not coding, I love exploring new technologies and learning new skills.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
          >
            Get in touch
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage; 