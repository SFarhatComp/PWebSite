# Cursor AI Prompt for CV Website

## Overview  
Your personal CV website will be a sleek online resume and portfolio, composed of four key sections:
- **Home Page**: A professional introduction with a short bio and photo.
- **CV & Cover Letter Page**: Display your CV and cover letter, with an option to download the CV as a PDF.
- **Projects Page**: Showcase your projects with titles, descriptions, GitHub links, and possibly embedded videos.
- **Contact Page**: A contact form allowing visitors to reach out via email.

## Design & User Experience (Apple-Style Aesthetic)  
- Clean, uncluttered layout with plenty of white space.
- Light backgrounds, minimal text, and high contrast for readability.
- Sans-serif typography for a modern and professional look.
- Intuitive top navigation with responsive collapsibility.
- Subtle animations (fade-ins, smooth scrolling, hover effects).
- Fully responsive layout for mobile, tablet, and desktop.

## Pages & Content Structure  

### Home Page  
- Hero section with a professional photo and a brief introduction.
- Buttons for "View My CV" and "See My Projects."
- Smooth transitions for polished navigation.

### CV & Cover Letter Page  
- Well-structured CV layout with work experience, education, and skills.
- Cover letter or personal statement section.
- Prominent "Download CV as PDF" button.
- Secure backend route to serve the PDF dynamically.

### Projects Page  
- Grid or list format for projects.
- Each project includes:
  - Title, description, GitHub link, technologies used.
  - Optional embedded videos or screenshots.
- Clean cards with subtle hover animations.
- Responsive design ensuring clarity across devices.

### Contact Page  
- Contact form with fields for name, email, and message.
- Form validation and user feedback after submission.
- Email service integration using Flask-Mail or Django Email.
- Optional database storage for form submissions.
- Security measures (spam prevention, validation).

## Technical Implementation  

### Frontend: React & Tailwind CSS  
- React for a dynamic UI, React Router for seamless navigation.
- Tailwind CSS for a modern, consistent design.
- Lazy loading for images/videos, optimizing performance.
- Smooth animations via Framer Motion or GSAP.
- Responsive design ensuring mobile-first usability.

### Backend: Python (Flask or Django)  
- Flask for a lightweight API or Django for structured development.
- Secure file serving for the CV PDF download.
- Handling contact form submissions with email sending.
- Optional database for storing form submissions or projects.
- REST API endpoints to serve dynamic content (if required).

## Deployment, Security, and Performance  
- Hosting options: Heroku, PythonAnywhere, DigitalOcean.
- HTTPS enforcement for secure data transmission.
- Minified assets, lazy loading, caching for fast performance.
- Form input sanitization and spam prevention measures.
- Google Lighthouse testing for speed and accessibility.
- CI/CD setup for easy updates.

## Responsive & User-Friendly Experience  
- Mobile-first design ensuring all content is accessible.
- Proper HTML semantics for accessibility.
- Alt text for images, clear color contrast, and keyboard-friendly navigation.
- Performance optimizations for fast page loads.
- Error tracking and analytics for user experience insights.

By following this structured approach, the final website will be **modern, professional, fast, and user-friendly**, serving as a strong online representation of your CV and portfolio.
