import React, { useState, useEffect } from 'react';
import Home from './pages/home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Career from './pages/Career.jsx';
import OurTeamPage from './pages/OurTeamPage.jsx';
import FaqsPage from './pages/FaqsPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import Cursor from './components/Cursor.jsx';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleNavigate = (e) => {
      // Small timeout to allow the preloader transition to cover the screen
      setTimeout(() => {
        setCurrentPage(e.detail.page);
        window.scrollTo(0, 0);
      }, 800);
    };

    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
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
    </div>
  );
}

export default App;

