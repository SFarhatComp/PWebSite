import React from 'react';
import { useContent } from '../utils/contentLoader';

function Footer() {
  const { content, loading } = useContent();
  
  if (loading || !content) {
    return <div>Loading footer...</div>;
  }
  
  // Ensure we have footer content
  const footerContent = content.footer || {};
  const socialLinks = footerContent.socialLinks || [];
  const copyright = footerContent.copyright || `© ${new Date().getFullYear()} Sami Farhat. All rights reserved.`;
  
  // Get name from personal info
  const name = content.personal?.name || 'Sami Farhat';
  
  // Use the name from personal information to create a dynamic copyright message
  const copyrightText = copyright.replace('Sami Farhat', name);
  
  // Map platform names to appropriate icons (using Font Awesome classes)
  const getIconClass = (platform, iconName) => {
    if (iconName) {
      // Use icon specified in content.yaml
      return `fa fa-${iconName}`;
    }
    
    // Default icon mapping
    const iconMap = {
      'GitHub': 'fab fa-github',
      'LinkedIn': 'fab fa-linkedin',
      'Twitter': 'fab fa-twitter',
      'Email': 'fas fa-envelope',
      'Instagram': 'fab fa-instagram',
      'Facebook': 'fab fa-facebook'
    };
    
    return iconMap[platform] || 'fas fa-link'; // Default to a generic link icon
  };
  
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center mb-6">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="mx-3 flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <span className="mr-2 text-lg">{link.platform}</span>
              </a>
            ))}
          </div>
          <div className="text-gray-600 text-sm">
            {copyrightText}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 