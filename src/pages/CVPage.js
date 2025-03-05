import React from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const CVPage = () => {
  const handleDownloadCV = async () => {
    try {
      const response = await axios.get('/api/download-cv', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Sami_Farhat_CV.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Failed to download CV. Please try again later.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Curriculum Vitae</h1>
          <p className="text-lg text-gray-600 mb-8">My professional experience and qualifications</p>
          <button
            onClick={handleDownloadCV}
            className="px-6 py-3 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 flex items-center mx-auto"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Download CV
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden p-8">
          {/* Personal Information */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600"><strong>Name:</strong> Sami Farhat</p>
                <p className="text-gray-600"><strong>Email:</strong> sfarhat4@gmail.com</p>
                <p className="text-gray-600"><strong>Phone:</strong> +1 (514) 581-2205</p>
              </div>
              <div>
                <p className="text-gray-600"><strong>Location:</strong> Quebec, Canada</p>
                <p className="text-gray-600"><strong>GitHub:</strong> <a href="https://github.com/SFarhatComp" target="_blank" rel="noopener noreferrer">github.com/SFarhatComp</a></p>
                <p className="text-gray-600"><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/samifarhat00/" target="_blank" rel="noopener noreferrer">linkedin.com/in/samifarhat</a></p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Work Experience</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Application Software Developer</h3>
              <p className="text-primary font-medium">Boeing - Montreal</p>
              <p className="text-sm text-gray-500 mb-2">Sept 2023 – Present</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Led development of a pilot bidding platform, enhancing performance and reducing costs.</li>
                <li>Automated workflows by replacing manual CSV imports with an API-based solution.</li>
                <li>Managed system migration and deployment of new versions to client environments.</li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Operational Effectiveness Analyst - Intern</h3>
              <p className="text-primary font-medium">BMO Financial Group - Montreal</p>
              <p className="text-sm text-gray-500 mb-2">Sept 2021 – Jan 2022</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Developed a TypeScript automation tool to streamline Excel workflows.</li>
                <li>Analyzed inefficiencies and proposed process improvements.</li>
              </ul>
            </div>
          </div>

          {/* Notable Projects */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Notable Projects</h2>
            <p className="text-gray-600"><strong>Real-Time Translation System</strong> - Python, Docker, RabbitMQ, Redis</p>
            <p className="text-gray-600">Developed a real-time translation system on Raspberry Pi using self-hosted models.</p>
            <p className="text-gray-600"><strong>Web Scraper for Job Postings</strong> - Python, BeautifulSoup, OpenAI API</p>
            <p className="text-gray-600">Built a web scraper that fetches job postings and curates them into a list with customized cover letters for each.</p>
            <p className="text-gray-600"><strong>More can be found on my GitHub</strong></p>
          </div>

          {/* Skills */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Skills</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>C++, Python, Java, XML, Git</li>
              <li>Docker, RabbitMQ, Networking, OpenStack, Ansible, Redis</li>
              <li>Technical Presentations, Public Speaking, Leadership</li>
              <li>Currently learning Rust in the hope of building my own blockchain</li>
            </ul>
          </div>

          {/* Education */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Education</h2>
            <p className="text-gray-600"><strong>B.Eng. Computer Engineering</strong> - Concordia University, Montreal</p>
            <p className="text-gray-600"><strong>College Degree in Natural Sciences</strong> - Collège de Bois-de-Boulogne, Montreal</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CVPage; 