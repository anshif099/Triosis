import React, { useState, useEffect } from 'react';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import './ContactPage.css';

const marqueeItems = [
  'DIGITAL MARKETING', 'BRANDING', 'WEB DESIGN', 'SEO', 'SOCIAL MEDIA',
  'CREATIVE DESIGN', 'CONTENT CREATION', 'STRATEGY', 'GROWTH', 'INNOVATION'
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  useEffect(() => {
    let mapInstance = null;

    const initMap = () => {
      if (!window.L) {
        setTimeout(initMap, 100);
        return;
      }

      // Check if element exists to avoid crashes
      const mapEl = document.getElementById('contact-leaflet-map');
      if (!mapEl) return;

      mapInstance = window.L.map('contact-leaflet-map', {
        scrollWheelZoom: false
      }).setView([11.254632, 75.824642], 15);

      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstance);

      const customIcon = window.L.divIcon({
        className: 'leaflet-custom-marker-wrapper',
        html: `
          <div class="leaflet-custom-marker">
            <img src="/logo.png" alt="Logo" class="leaflet-marker-logo" />
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 44]
      });

      window.L.marker([11.254632, 75.824642], { icon: customIcon }).addTo(mapInstance);
    };

    initMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  return (
    <div className="contact-page-container">
      <Preloader />
      <Header />

      {/* ── HERO ─────────────────────────────── */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          {/* Tag + heading */}
          <div className="contact-hero-top">
            <span className="contact-hero-tag">
              <span className="contact-tag-dot"></span>
              CONTACT US
            </span>
            <h1 className="contact-hero-heading">
              LET'S<br />GET IN TOUCH<span className="contact-accent-dot">.</span>
            </h1>
          </div>
          {/* Giant watermark text */}
          <div className="contact-watermark">CONTACT US</div>
        </div>
      </section>

      {/* ── WHITE MARQUEE CAROUSEL ────────────── */}
      <section className="contact-marquee-section">
        <div className="contact-marquee-wrapper">
          <div className="contact-marquee-track">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span className="contact-marquee-element" key={i}>
                <span className="contact-marquee-text">{item}</span>
                <span className="contact-marquee-bullet">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLASS CONTACT SECTION ─────────────── */}
      <section className="contact-form-section">
        {/* Glow blobs */}
        <div className="contact-glow contact-glow-left"></div>
        <div className="contact-glow contact-glow-right"></div>

        <div className="contact-form-inner">

          {/* Left info card */}
          <div className="contact-info-card">
            <div className="contact-phone">+91 9605507008</div>

            <div className="contact-info-block">
              <h4 className="contact-info-label">ADDRESS</h4>
              <p className="contact-info-text">
                Triosis Digital<br />
                Tower 2, HiLITE Business Park,<br />
                Door no : 2211, Second Floor,<br />
                Poovangal, Pantheeramkavu,<br />
                Kozhikode, Kerala 673014
              </p>
            </div>

            <div className="contact-info-block">
              <h4 className="contact-info-label">EMAIL</h4>
              <a href="mailto:info@adsdot.in" className="contact-info-link">info@adsdot.in</a>
            </div>

            <div className="contact-info-block">
              <h4 className="contact-info-label">HOURS</h4>
              <p className="contact-info-text">Mon – Sat: 9:00 AM – 6:00 PM</p>
            </div>

            {/* Social icons */}
            <div className="contact-socials">
              {/* X / Twitter */}
              <a href="#" className="contact-social-btn" aria-label="X">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.725-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="contact-social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="contact-social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="contact-social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="contact-social-btn" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>

            {/* Logo watermark */}
            <div className="contact-card-logo">Adsdot</div>
          </div>

          {/* Right form card */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success-msg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="form-input" />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="form-input" />
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required className="form-input form-textarea" rows={7}></textarea>
                </div>
                <button type="submit" className="contact-submit-btn">
                  Let's Talk
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── GOOGLE MAP ─────────────────────────── */}
      <section className="contact-map-section">
        <div className="contact-map-wrapper">
          <div className="contact-map-label">
            <img src="/logo.png" alt="Location Icon" className="contact-map-icon" />
            <span>
              Triosis Digital, Tower 2, HiLITE Business Park, Door no : 2211, Second Floor, Poovangal, Pantheeramkavu, Kozhikode, Kerala 673014
            </span>
          </div>
          <div
            id="contact-leaflet-map"
            className="contact-map-iframe"
          ></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactPage;
