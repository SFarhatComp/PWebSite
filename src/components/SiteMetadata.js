import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useContent } from '../utils/contentLoader';

const SiteMetadata = () => {
  const location = useLocation();
  const { content, loading } = useContent();
  
  useEffect(() => {
    if (loading || !content) return;
    
    const { metadata, personal } = content;
    
    // Default metadata
    const defaults = {
      siteTitle: personal.name || 'Portfolio Website',
      siteDescription: personal.bio || 'Professional portfolio and resume',
      siteAuthor: personal.name || 'Portfolio Owner',
      siteFavicon: '/favicon.ico',
      siteLanguage: 'en',
      siteUrl: window.location.origin,
      ogImage: personal.profileImage || '/og-image.jpg'
    };
    
    // Use metadata from content.yaml or fallback to defaults
    const meta = {
      ...defaults,
      ...(metadata || {})
    };
    
    // Set page title based on current route
    let pageTitle = meta.siteTitle;
    
    if (location.pathname === '/cv') {
      pageTitle = `CV | ${meta.siteTitle}`;
    } else if (location.pathname === '/projects') {
      pageTitle = `Projects | ${meta.siteTitle}`;
    } else if (location.pathname === '/contact') {
      pageTitle = `Contact | ${meta.siteTitle}`;
    }
    
    // Update document metadata
    document.title = pageTitle;
    
    // Update meta tags
    const metaTags = {
      'description': meta.siteDescription,
      'author': meta.siteAuthor,
      'og:title': pageTitle,
      'og:description': meta.siteDescription,
      'og:image': meta.ogImage,
      'og:url': meta.siteUrl + location.pathname,
      'og:type': 'website',
      'twitter:card': 'summary_large_image',
      'twitter:title': pageTitle,
      'twitter:description': meta.siteDescription,
      'twitter:image': meta.ogImage
    };
    
    // Update all meta tags
    Object.entries(metaTags).forEach(([name, content]) => {
      let metaElement;
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        metaElement = document.querySelector(`meta[property="${name}"]`);
        if (!metaElement) {
          metaElement = document.createElement('meta');
          metaElement.setAttribute('property', name);
          document.head.appendChild(metaElement);
        }
      } else {
        metaElement = document.querySelector(`meta[name="${name}"]`);
        if (!metaElement) {
          metaElement = document.createElement('meta');
          metaElement.setAttribute('name', name);
          document.head.appendChild(metaElement);
        }
      }
      metaElement.setAttribute('content', content);
    });
    
    // Update language
    document.documentElement.lang = meta.siteLanguage || 'en';
    
    // Update favicon
    let faviconLink = document.querySelector('link[rel="icon"]');
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.setAttribute('rel', 'icon');
      document.head.appendChild(faviconLink);
    }
    faviconLink.setAttribute('href', meta.siteFavicon);
    
  }, [content, loading, location]);
  
  // This component doesn't render anything visible
  return null;
};

export default SiteMetadata; 