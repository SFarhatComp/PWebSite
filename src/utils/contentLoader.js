import React, { createContext, useState, useEffect } from 'react';
import yaml from 'js-yaml';

// Load content from YAML file
export async function loadContent() {
  try {
    const response = await fetch('/content.yaml');
    const yamlText = await response.text();
    return yaml.load(yamlText);
  } catch (error) {
    console.error('Error loading content:', error);
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