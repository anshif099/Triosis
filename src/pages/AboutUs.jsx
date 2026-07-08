import React from 'react';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-page-container">
      <Preloader />
      <Header />

      {/* About Intro Section */}
      <section className="about-intro-section">
        <div className="about-intro-container">
          <div className="about-intro-left">
            <span className="about-tag">
              <span className="tag-dot"></span>
              ABOUT US
            </span>
          </div>
          <div className="about-intro-right">
            <h1 className="about-intro-heading">
              Crafting<span className="cyan-dot">.</span>smart concepts and turning them into conversion-driven marketing that elevates your brand.
            </h1>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutUs;
