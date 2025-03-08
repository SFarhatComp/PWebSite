import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../utils/contentLoader';

const ProjectsPage = () => {
  const { content, loading } = useContent();
  
  if (loading || !content) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }
  
  // Debug the content to see what's available
  console.log("Full content:", content);
  
  // Guard against missing projects data
  const projectsData = content.projects || { heading: 'Projects', items: [] };
  const { heading, items } = projectsData;
  
  // Log data for debugging
  console.log("Projects data:", projectsData);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{heading}</h1>
      </div>
      
      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="elegant-card">
                {project.image ? (
                  <div className="elegant-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                ) : (
                  <div className="elegant-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="p-5">
                  <h2 className="elegant-title">{project.title}</h2>
                  <p className="elegant-desc">{project.description}</p>
                  <div className="elegant-tags">
                    {project.technologies && project.technologies.map((tech, i) => (
                      <span key={i} className="elegant-tag">{tech}</span>
                    ))}
                  </div>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="elegant-link">
                      View Project
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No projects available at the moment.</p>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectsPage; 