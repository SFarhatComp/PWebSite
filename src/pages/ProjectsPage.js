import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    "id": 1,
    "title": "Real-Time Offline Translation System",
    "description": "A self-hosted real-time speech-to-text translation system designed for offline use. The system acts as a router, ensuring all data remains private and internal. It leverages FastAPI for the backend, React for the frontend, RabbitMQ for message queuing, and Redis for caching translations. Optimized for performance on a Raspberry Pi , it uses VOSK for speech-to-text and a custom translation model and LibreTranslate for translation.",
    "image": "/projects/real-time-translation.jpg",
    "technologies": ["Python", "FastAPI", "React", "RabbitMQ", "Redis", "Docker", "Raspberry Pi", "VOSK", "LibreTranslate"],
    "githubLink": "https://github.com/SFarhatComp/Real-Time-Translation-Device",
    "liveLink": null,
    "featured": true
  },
  {
    "id": 2,
    "title": "ApplyMate - AI-Powered Job Application Assistant",
    "description": "ApplyMate automates job searching by querying job sites, fetching relevant listings, and filtering them based on user-defined criteria. It provides job suggestions and generates customized cover letters using Ollama and Mistral AI. Built with Python for backend development, ApplyMate streamlines the job application process efficiently.",
    "image": "/projects/applymate.jpg",
    "technologies": ["Python", "Ollama AI", "Mistral AI", "Web Scraping", "Automation", "Docker", "Cuda"],
    "githubLink": "https://github.com/SFarhatComp/ApplyMate",
    "liveLink": null,
    "featured": true
  },
  {
    "id": 3,
    "title": "FTP Protocol Implementation",
    "description": "A custom implementation of the FTP protocol, designed for secure and efficient file transfers. This project includes client-server communication, and support for various FTP commands. Built using Python and socket programming, it provides a foundational understanding of network protocols.",
    "image": "/projects/ftp-protocol.jpg",
    "technologies": ["Python", "Sockets", "Networking", "FTP Protocol"],
    "githubLink": "https://github.com/SFarhatComp/FTP-Protocol-Project",
    "liveLink": null,
    "featured": false
  }
  ,
  {
    "id": 4,
    "title": "Alcohol Sensor",
    "description": "An Android application designed to detect alcohol levels using sensor data. This project utilizes Java for Android development and integrates with hardware sensors to monitor and report alcohol concentration. It aims to promote safety by providing real-time feedback to users.",
    "image": "/projects/alcohol-sensor.jpg",
    "technologies": ["Java", "Android Development", "Sensor Integration","Arduino"],
    "githubLink": "https://github.com/SFarhatComp/AlcoholSensor",
    "liveLink": null,
    "featured": false
  }
  
];

const ProjectsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
          <p className="text-lg text-gray-600 mb-8">Here are some of the projects I've worked on.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex space-x-3">
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsPage; 