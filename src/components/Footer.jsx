import React, { useState, useEffect } from 'react';
import './Footer.css';

// SVG Social Icons Helper
const SocialIcon = ({ type }) => {
  if (type === 'x') {
    return (
      <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }
  if (type === 'facebook') {
    return (
      <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
      </svg>
    );
  }
  if (type === 'instagram') {
    return (
      <svg className="social-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    );
  }
  if (type === 'linkedin') {
    return (
      <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    );
  }
  if (type === 'youtube') {
    return (
      <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    );
  }
  return null;
};

function Footer() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Monitor scroll height to show/hide the floating scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialsList = ['x', 'facebook', 'instagram', 'linkedin', 'youtube'];
  const linksList = [
    { name: 'Home', path: '#home' },
    { name: 'About Us', path: '#about' },
    { name: 'Services', path: '#services' },
    { name: 'Works', path: '#works' },
    { name: 'Career', path: '#career' },
    { name: 'FAQ\'s', path: '#faqs' },
    { name: 'Contact Us', path: '#contact' }
  ];

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Column 1: Social Toggles */}
        <div className="footer-social-column">
          <div className="footer-socials">
            {socialsList.map((social) => (
              <a href={`#${social}`} className="footer-social-btn" key={social}>
                <SocialIcon type={social} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Location/Address details */}
        <div className="footer-address-column">
          <h4 className="footer-column-title">Find Us</h4>
          <div className="address-content">
            <p className="address-text">
              Adsdot Advertising Agency Office, Saudi Complex, Kizhisseri, Kerala 673641
            </p>
            <a href="mailto:info@adsdot.in" className="contact-link">
              info@adsdot.in
            </a>
            <a href="tel:+919605507008" className="contact-link">
              +91 9605507008
            </a>
          </div>
        </div>

        {/* Column 3: Navigation Links */}
        <div className="footer-links-column">
          <h4 className="footer-column-title">Links</h4>
          <ul className="footer-links-list">
            {linksList.map((link) => (
              <li key={link.name}>
                <a href={link.path} className="footer-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Footer Bottom copyright */}
      <div className="footer-bottom">
        <p className="copyright-text">
          © {new Date().getFullYear()} Adsdot. All Rights Reserved.
        </p>
      </div>

      {/* Floating Back to Top Button */}
      {showScrollBtn && (
        <div className="back-to-top-btn" onClick={scrollToTop} title="Scroll to Top">
          <svg className="chevron-up-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
      )}
    </footer>
  );
}

export default Footer;
