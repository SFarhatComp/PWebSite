import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ContentProvider } from './utils/contentLoader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SiteMetadata from './components/SiteMetadata';
import HomePage from './pages/HomePage';
import CVPage from './pages/CVPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import './App.css';
import './styles/content.css';

function App() {
  return (
    <ContentProvider>
      <Router>
        <SiteMetadata />
        <div className="flex flex-col min-h-screen bg-light">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cv" element={<CVPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Catch-all route - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </ContentProvider>
  );
}

export default App; 