import React from 'react';
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
  return (
    <header className="header">
      <div className="logo-container">
        <a href="#">
          <img src={headerLogo} alt="Adsdot Logo" />
        </a>
      </div>

      <nav>
        <ul className="nav-links">
          <li className="nav-item">
            <a href="#" className="nav-link">
              <WaveText text="Home" />
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <WaveText text="Company" /> <span className="caret-icon"></span>
            </a>
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <a href="#">About Us</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Career</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Our Team</a>
              </li>
              <li className="dropdown-item">
                <a href="#">FAQs</a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <WaveText text="Services" />
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <WaveText text="Portfolio" />
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <WaveText text="Blog" />
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <WaveText text="Contact Us" />
            </a>
          </li>
        </ul>
      </nav>

      <div>
        <a href="#" className="consultation-btn">
          Book Free Consultation
        </a>
      </div>
    </header>
  );
}

export default Header;
