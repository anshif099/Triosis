import React, { useState, useEffect } from 'react';
import Home from './pages/home.jsx';
import AboutUs from './pages/AboutUs.jsx';
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
    </div>
  );
}

export default App;

