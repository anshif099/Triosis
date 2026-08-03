import React, { useState, useEffect } from 'react';
import { EditableText, EditableImage, EditableButton, EditableSection, EditableRepeater } from '@anshif.rainhopes/reactcms-sdk';
import headerLogo from '../assets/header.png';
import ConsultationModal from './ConsultationModal.jsx';
import './Header.css';

// Helper component to split text into individual spans for wave animation
const WaveText = ({ text }) => {
  if (!text) return null;
  const textStr = String(text);
  return (
    <span className="wave-text">
      {textStr.split('').map((char, index) => (
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

const defaultNavItems = [
  { id: 'nav-1', text: 'HOME', href: 'home' },
  { id: 'nav-2', text: 'ABOUT US', href: 'about' },
  { id: 'nav-3', text: 'SERVICES', href: 'services' },
  { id: 'nav-4', text: 'PORTFOLIO', href: 'portfolio' },
  { id: 'nav-5', text: 'BLOG', href: 'blog' },
  { id: 'nav-6', text: 'CONTACT US', href: 'contact' },
];

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

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConsultationClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    setMenuOpen(false);
  };

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
    if (e && e.preventDefault) e.preventDefault();
    setMenuOpen(false);
    const onHome = !document.querySelector('.about-page-container') && 
                   !document.querySelector('.career-page-container') && 
                   !document.querySelector('.our-team-page-container') && 
                   !document.querySelector('.faqs-page-container') && 
                   !document.querySelector('.services-page-container') && 
                   !document.querySelector('.portfolio-page-container') && 
                   !document.querySelector('.blog-page-container') && 
                   !document.querySelector('.contact-page-container');
    if (onHome) {
      window.dispatchEvent(new Event('trigger-preloader'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.dispatchEvent(new CustomEvent('trigger-preloader', { detail: { fast: true } }));
      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'home' } }));
    }
  };

  const handleNavClick = (e, rawHref, rawText) => {
    if (e && e.preventDefault) e.preventDefault();
    setMenuOpen(false);

    const target = (rawHref || rawText || '').trim();
    if (!target || target === '#') return;

    if (/^https?:\/\//i.test(target)) {
      window.location.href = target;
      return;
    }

    const lowerTarget = target.toLowerCase();
    const resolvedPage = pathToPage[lowerTarget] 
      || (pageToPath[lowerTarget] ? lowerTarget : target.replace(/^\/+/, ''));

    if (resolvedPage === 'home' || lowerTarget === '/' || lowerTarget === 'home') {
      handleHomeClick(e);
    } else {
      window.dispatchEvent(new CustomEvent('trigger-preloader', { detail: { fast: true } }));
      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: resolvedPage } }));
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <EditableSection
      regionId="header.section"
      label="Header Section"
      as="header"
      className={`header ${isAtTop || menuOpen ? 'at-top' : ''}`}
    >
      <div className="header-inner">
        <div className="logo-container">
          <a href="#" onClick={handleHomeClick}>
            <EditableImage
              regionId="header.logo"
              label="Header Logo"
              defaultValue={{ src: headerLogo, alt: "Triosis Logo" }}
            />
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
          <EditableRepeater
            regionId="header.navigation"
            label="Header Navigation Links"
            defaultValue={defaultNavItems}
          >
            {(items) => {
              const list = Array.isArray(items) && items.length > 0 ? items : defaultNavItems;
              return (
                <ul className="nav-links">
                  {list.map((item, index) => {
                    const itemText = typeof item === 'string' ? item : (item.text || item.label || '');
                    const itemHref = typeof item === 'object' ? (item.href || item.page || item.path || '#') : '#';
                    const regionId = `header.nav_link_${index + 1}`;

                    return (
                      <li className="nav-item" key={item.id || index}>
                        <EditableButton
                          regionId={regionId}
                          label={`Nav Link ${index + 1}: ${itemText}`}
                          defaultValue={{ text: itemText, href: itemHref }}
                          className="nav-link"
                          as="a"
                          onClick={(e) => handleNavClick(e, itemHref, itemText)}
                        >
                          {(val) => {
                            const currentText = typeof val === 'string' ? val : (val?.text || itemText);
                            return <WaveText text={currentText} />;
                          }}
                        </EditableButton>
                      </li>
                    );
                  })}
                </ul>
              );
            }}
          </EditableRepeater>

          <div className="mobile-action-btn">
            <EditableButton
              regionId="header.cta_mobile"
              label="Mobile Consultation Button"
              defaultValue={{ text: "Book Free Consultation", href: "#" }}
              className="consultation-btn"
              onClick={handleConsultationClick}
            />
          </div>
        </nav>

        <div className="desktop-action-btn">
          <EditableButton
            regionId="header.cta"
            label="Book Free Consultation Button"
            defaultValue={{ text: "Book Free Consultation", href: "#" }}
            className="consultation-btn"
            onClick={handleConsultationClick}
          />
        </div>
      </div>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </EditableSection>
  );
}

export default Header;
