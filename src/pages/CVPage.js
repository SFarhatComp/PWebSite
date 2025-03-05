import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../utils/contentLoader';

const CVPage = () => {
  const { content, loading } = useContent();
  
  if (loading || !content) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }
  
  // Use the experience data from content.yaml
  const { heading, jobs } = content.experience;
  const { skills } = content.about;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
          {heading}
        </h1>
        
        <a 
          href="/api/download-cv" 
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg shadow-md inline-flex items-center transition duration-300 ease-in-out"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download CV
        </a>
      </div>
      
      {/* Experience section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
        <div className="space-y-8">
          {jobs.map((job, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex flex-col md:flex-row md:justify-between mb-4">
                <h3 className="text-xl font-semibold">{job.title} at {job.company}</h3>
                <span className="text-gray-600">{job.period}</span>
              </div>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-gray-100 text-primary text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Skills section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{skill.name}</h3>
                <span className="text-sm text-gray-600">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CVPage; 