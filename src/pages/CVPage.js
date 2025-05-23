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
        
        {/* Skills Matrix with modern, clean styling */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="py-4 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Skill
                </th>
                <th scope="col" className="py-4 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Proficiency
                </th>
                <th scope="col" className="py-4 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Experience
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {skills.map((skill, index) => {
                // Extract skill data
                const skillName = typeof skill === 'object' && skill.name ? skill.name : 
                                (typeof skill === 'object' ? Object.keys(skill)[0] : skill);
                const skillLevel = typeof skill === 'object' && skill.level ? skill.level : 
                                (typeof skill === 'object' ? skill[Object.keys(skill)[0]] : 50);
                // Extract experience data if available
                const skillExperience = typeof skill === 'object' && skill.experience ? skill.experience : 'Occasionally';
                
                // CUSTOMIZE HERE: Map numeric level to proficiency descriptions
                // You can adjust these thresholds to change how skills are categorized
                let proficiency;
                let proficiencyBadgeClass;
                
                if (skillLevel >= 90) {
                  proficiency = "Expert";
                  proficiencyBadgeClass = "bg-blue-50 text-blue-700 border border-blue-200";
                } else if (skillLevel >= 75) {
                  proficiency = "Advanced";
                  proficiencyBadgeClass = "bg-indigo-50 text-indigo-700 border border-indigo-200";
                } else if (skillLevel >= 50) {
                  proficiency = "Intermediate";
                  proficiencyBadgeClass = "bg-purple-50 text-purple-700 border border-purple-200";
                } else {
                  proficiency = "Familiar";
                  proficiencyBadgeClass = "bg-violet-50 text-violet-700 border border-violet-200";
                }
                
                // Map experience to badge classes based on value from content.yaml
                let experience = skillExperience;
                let experienceBadgeClass;
                
                if (experience === "Daily") {
                  experienceBadgeClass = "bg-green-50 text-green-700 border border-green-200";
                } else if (experience === "Weekly") {
                  experienceBadgeClass = "bg-amber-50 text-amber-700 border border-amber-200";
                } else {
                  // Default to "Occasionally" or any other value
                  experience = "Occasionally"; // normalize any other values
                  experienceBadgeClass = "bg-slate-50 text-slate-600 border border-slate-200";
                }
                
                return (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-800">{skillName}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${proficiencyBadgeClass}`}>
                        {proficiency}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${experienceBadgeClass}`}>
                        {experience}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Skills Legend - Now simplified without the experience levels section */}
        <div className="mt-4 bg-white p-5 rounded-xl shadow-sm">
          <h3 className="text-base font-medium text-gray-700 mb-3">Proficiency Levels</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <span className="px-3 py-1 mr-2 inline-flex text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Expert
              </span>
              <span className="text-sm text-gray-600">Mastered, can teach others</span>
            </div>
            <div className="flex items-center">
              <span className="px-3 py-1 mr-2 inline-flex text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Advanced
              </span>
              <span className="text-sm text-gray-600">Strong knowledge, use confidently</span>
            </div>
            <div className="flex items-center">
              <span className="px-3 py-1 mr-2 inline-flex text-xs font-medium rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                Intermediate
              </span>
              <span className="text-sm text-gray-600">Good working knowledge</span>
            </div>
            <div className="flex items-center">
              <span className="px-3 py-1 mr-2 inline-flex text-xs font-medium rounded-full bg-violet-50 text-violet-700 border border-violet-200">
                Familiar
              </span>
              <span className="text-sm text-gray-600">Basic understanding</span>
            </div>
          </div>
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