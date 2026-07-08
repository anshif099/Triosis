import React, { useState, useEffect } from 'react';
import headerLogo from '../assets/header.png';
import './Header.css';

// Helper component to split text into individual spans for wave animation
const WaveText = ({ text }) => {
  return (
    <span className="wave-text">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="wave-char"
          style={{ '--char-index': index }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const onHome = !document.querySelector('.about-page-container') && !document.querySelector('.career-page-container') && !document.querySelector('.our-team-page-container') && !document.querySelector('.faqs-page-container') && !document.querySelector('.services-page-container');
    if (onHome) {
      window.dispatchEvent(new Event('trigger-preloader'));
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    } else {
      window.dispatchEvent(new CustomEvent('trigger-preloader', { detail: { fast: true } }));
      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'home' } }));
    }
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('trigger-preloader', { detail: { fast: true } }));
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'about' } }));
  };

  const handleCareerClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('trigger-preloader', { detail: { fast: true } }));
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'career' } }));
  };

  const handleOurTeamClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('trigger-preloader', { detail: { fast: true } }));
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'our-team' } }));
  };

  const handleFaqsClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('trigger-preloader', { detail: { fast: true } }));
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'faqs' } }));
  };

  const handleServicesClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('trigger-preloader', { detail: { fast: true } }));
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'services' } }));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`header ${isAtTop || menuOpen ? 'at-top' : ''}`}>
      <div className="header-inner">
        <div className="logo-container">
          <a href="#" onClick={handleHomeClick}>
            <img src={headerLogo} alt="Triosis Logo" />
          </a>
        </div>

        <button 
          className={`hamburger-btn ${menuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <nav className={`nav-container ${menuOpen ? 'menu-open' : ''}`}>
          <ul className="nav-links">
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={handleHomeClick}>
                <WaveText text="Home" />
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <WaveText text="Company" /> <span className="caret-icon"></span>
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <a href="#" onClick={handleAboutClick}>About Us</a>
                </li>
                <li className="dropdown-item">
                  <a href="#" onClick={handleCareerClick}>Career</a>
                </li>
                <li className="dropdown-item">
                  <a href="#" onClick={handleOurTeamClick}>Our Team</a>
                </li>
                <li className="dropdown-item">
                  <a href="#" onClick={handleFaqsClick}>FAQs</a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={handleServicesClick}>
                <WaveText text="Services" />
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={closeMenu}>
                <WaveText text="Portfolio" />
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={closeMenu}>
                <WaveText text="Blog" />
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={closeMenu}>
                <WaveText text="Contact Us" />
              </a>
            </li>
          </ul>
          <div className="mobile-action-btn">
            <a href="#" className="consultation-btn" onClick={closeMenu}>
              Book Free Consultation
            </a>
          </div>
        </nav>

        <div className="desktop-action-btn">
          <a href="#" className="consultation-btn">
            Book Free Consultation
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
