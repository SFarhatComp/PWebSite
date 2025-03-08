import React from 'react';
import '../styles/content.css';

const StyleShowcase = () => {
  // Using ApplyMate project data from your content.yaml
  const sampleProject = {
    title: "ApplyMate - AI-Powered Job Application Assistant",
    description: "An AI tool that fetches job postings, filters relevant ones, and generates custom cover letters.",
    technologies: ["Python", "Web Scraping", "OpenAI API", "Automation"],
    image: "/static/projects/applymate.jpg",
    url: "https://github.com/SFarhatComp/ApplyMate"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Card Style Showcase</h1>
      
      {/* Style 1: Elegant Card */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Style 1: Elegant Card</h2>
        <div className="max-w-sm mx-auto">
          <div className="elegant-card">
            {sampleProject.image ? (
              <div className="elegant-image">
                <img src={sampleProject.image} alt={sampleProject.title} />
              </div>
            ) : (
              <div className="elegant-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div className="p-5">
              <h2 className="elegant-title">{sampleProject.title}</h2>
              <p className="elegant-desc">{sampleProject.description}</p>
              <div className="elegant-tags">
                {sampleProject.technologies.map((tech, i) => (
                  <span key={i} className="elegant-tag">{tech}</span>
                ))}
              </div>
              {sampleProject.url && (
                <a href={sampleProject.url} target="_blank" rel="noopener noreferrer" className="elegant-link">
                  View Project
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Style 2: Polaroid Card */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Style 2: Polaroid Card</h2>
        <div className="max-w-sm mx-auto">
          <div className="polaroid-card">
            {sampleProject.image ? (
              <div className="polaroid-image">
                <img src={sampleProject.image} alt={sampleProject.title} />
              </div>
            ) : (
              <div className="polaroid-placeholder">
                <span>{sampleProject.title}</span>
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{sampleProject.title}</h2>
              <p className="text-gray-700 mb-4">{sampleProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {sampleProject.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-blue-600 text-xs rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              {sampleProject.url && (
                <a href={sampleProject.url} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:text-blue-800 font-medium">
                  View Project
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Style 3: Magazine Style */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Style 3: Magazine Style</h2>
        <div className="max-w-2xl mx-auto">
          <div className="magazine-card">
            <div className="magazine-content">
              <h2 className="magazine-title">{sampleProject.title}</h2>
              <p className="magazine-desc">{sampleProject.description}</p>
              <div className="magazine-tags">
                {sampleProject.technologies.map((tech, i) => (
                  <span key={i} className="magazine-tag">{tech}</span>
                ))}
              </div>
              {sampleProject.url && (
                <a href={sampleProject.url} target="_blank" rel="noopener noreferrer" 
                   className="magazine-link">
                  View Project
                </a>
              )}
            </div>
            {sampleProject.image ? (
              <div className="magazine-image">
                <img src={sampleProject.image} alt={sampleProject.title} />
              </div>
            ) : (
              <div className="magazine-image-placeholder"></div>
            )}
          </div>
        </div>
      </div>
      
      {/* Style 4: Gradient Overlay Card */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Style 4: Gradient Overlay Card</h2>
        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {sampleProject.image ? (
              <div className="project-card-image">
                <img
                  src={sampleProject.image}
                  alt={sampleProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="project-card-overlay">
                  <h3 className="text-white text-xl font-bold">{sampleProject.title}</h3>
                </div>
              </div>
            ) : (
              <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-semibold text-xl">{sampleProject.title}</span>
              </div>
            )}
            <div className="p-6">
              <p className="text-gray-700 mb-4">{sampleProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {sampleProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 text-blue-600 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {sampleProject.url && (
                <a
                  href={sampleProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-300"
                >
                  View Project
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-500">Select your preferred style and update ProjectsPage.js accordingly</p>
      </div>
    </div>
  );
};

export default StyleShowcase; 