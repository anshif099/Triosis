import React, { useState, useEffect } from 'react';
import Home from './pages/home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Career from './pages/Career.jsx';
import OurTeamPage from './pages/OurTeamPage.jsx';
import FaqsPage from './pages/FaqsPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import Cursor from './components/Cursor.jsx';
import './App.css';

const pathToPage = {
  '/': 'home',
  '/aboutus': 'about',
  '/career': 'career',
  '/our-team': 'our-team',
  '/faqs': 'faqs',
  '/services': 'services',
  '/portfolio': 'portfolio',
  '/blog': 'blog',
  '/contact': 'contact'
};

const pageToPath = {
  'home': '/',
  'about': '/aboutus',
  'career': '/career',
  'our-team': '/our-team',
  'faqs': '/faqs',
  'services': '/services',
  'portfolio': '/portfolio',
  'blog': '/blog',
  'contact': '/contact'
};

function App() {
  const getInitialPage = () => {
    const path = window.location.pathname.toLowerCase();
    const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
    return pathToPage[cleanPath] || 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);

  useEffect(() => {
    const handleNavigate = (e) => {
      const targetPage = e.detail.page;
      const targetPath = pageToPath[targetPage] || '/';
      
      if (window.location.pathname.toLowerCase() !== targetPath.toLowerCase()) {
        window.history.pushState(null, '', targetPath);
      }

      // Small timeout to allow the preloader transition to cover the screen
      setTimeout(() => {
        setCurrentPage(targetPage);
        window.scrollTo(0, 0);
      }, 800);
    };

    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
      const targetPage = pathToPage[cleanPath] || 'home';

      window.dispatchEvent(new CustomEvent('trigger-preloader', { detail: { fast: true } }));
      setTimeout(() => {
        setCurrentPage(targetPage);
      }, 800);
    };

    window.addEventListener('navigate', handleNavigate);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('navigate', handleNavigate);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="app">
      <Cursor />
      {currentPage === 'home' && <Home />}
      {currentPage === 'about' && <AboutUs />}
      {currentPage === 'career' && <Career />}
      {currentPage === 'our-team' && <OurTeamPage />}
      {currentPage === 'faqs' && <FaqsPage />}
      {currentPage === 'services' && <ServicesPage />}
      {currentPage === 'portfolio' && <PortfolioPage />}
      {currentPage === 'blog' && <BlogPage />}
      {currentPage === 'contact' && <ContactPage />}
    </div>
  );
}

export default App;

