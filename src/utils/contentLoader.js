import React, { createContext, useState, useEffect } from 'react';
import yaml from 'js-yaml';

// Load content from YAML file
export async function loadContent() {
  try {
    const response = await fetch('/content.yaml');
    const yamlText = await response.text();
    
    // Debug: Log the first few characters of the YAML file
    console.log('YAML content preview:', yamlText.substring(0, 100));
    
    return yaml.load(yamlText);
  } catch (error) {
    console.error('Error loading or parsing content:', error);
    console.error('Error details:', error.message);
    
    // Provide a fallback content for debugging
    return {
      personal: { name: "Error loading content", bio: "There was an error loading the content. Check console for details." },
      navigation: [{ title: "Home", url: "/" }],
      footer: { copyright: "© Error loading content", socialLinks: [] }
    };
    return null;
  }
}

// Context for providing content throughout the app
export const ContentContext = createContext({});

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      const data = await loadContent();
      setContent(data);
      setLoading(false);
    }
    
    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

// Hook to use content in components
export function useContent() {
  const context = React.useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
} 