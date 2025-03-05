import React from 'react';
import { useContent } from '../utils/contentLoader';

function Footer() {
  const { content, loading } = useContent();
  
  if (loading || !content) {
    return <div>Loading footer...</div>;
  }
  
  const { copyright, socialLinks } = content.footer;
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="social-links">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.platform}
            >
              <i className={`icon-${link.icon}`}></i>
            </a>
          ))}
        </div>
        <div className="copyright">
          {copyright}
        </div>
      </div>
    </footer>
  );
}

export default Footer; 