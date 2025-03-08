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
  
  // This is a more robust formatDescription function
  const formatDescription = (description) => {
    // Handle empty content
    if (!description) return [];
    
    let descriptionText = typeof description === 'string' ? description : String(description);
    
    // Fix common formatting issues
    // 1. Replace sequences like "point1. - point2" with proper line breaks
    descriptionText = descriptionText.replace(/\.\s*-\s+/g, '.\n- ');
    
    // 2. If we have what looks like bullet points all in one line, split them
    if (descriptionText.includes(' - ') && !descriptionText.includes('\n')) {
      return descriptionText.split(' - ')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map((line, index) => index === 0 ? line : `- ${line}`);
    }
    
    // 3. Handle properly formatted bullet points with line breaks
    if (descriptionText.includes('\n')) {
      return descriptionText.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }
    
    // 4. Fallback: Just return the text as-is
    return [descriptionText];
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {heading}
        </h1>
      </div>
      
      {/* Download button with more space */}
      <div className="text-center mb-16">
        <a 
          href="/api/download-cv" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md inline-flex items-center transition duration-300 ease-in-out"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Resume
        </a>
      </div>
      
      {/* Experience section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Work Experience</h2>
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
                <span className="text-gray-600 font-medium">{job.period}</span>
              </div>
              
              {/* Handle bullet points or paragraph with improved rendering */}
              <div className="mb-4 text-gray-700">
                {formatDescription(job.description).map((line, i) => {
                  if (line.trim().startsWith('- ')) {
                    // Render as bullet point
                    return (
                      <div key={i} className="flex items-start mb-2">
                        <span className="mr-2 text-blue-600 flex-shrink-0">•</span>
                        <span className="text-justify">{line.substring(2)}</span>
                      </div>
                    );
                  } else if (line.trim().startsWith('-')) {
                    // Also handle bullet points without a space
                    return (
                      <div key={i} className="flex items-start mb-2">
                        <span className="mr-2 text-blue-600 flex-shrink-0">•</span>
                        <span className="text-justify">{line.substring(1).trim()}</span>
                      </div>
                    );
                  } else {
                    // Render as paragraph
                    return <p key={i} className="mb-2 text-justify">{line}</p>;
                  }
                })}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-gray-100 text-blue-600 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Skills section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => {
            // Handle different skill formats (object or nested object)
            const skillName = typeof skill === 'object' && skill.name ? skill.name : 
                             (typeof skill === 'object' ? Object.keys(skill)[0] : skill);
            const skillLevel = typeof skill === 'object' && skill.level ? skill.level : 
                              (typeof skill === 'object' ? skill[Object.keys(skill)[0]] : 50);
            
            return (
              <div key={index} className="bg-white p-5 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg">{skillName}</h3>
                  <span className="text-sm text-gray-600 font-medium">{skillLevel}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${skillLevel}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Currently Learning Section */}
      {content.currently_learning && (
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold mb-8">{content.currently_learning.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.currently_learning.items.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">{item.name}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CVPage; 