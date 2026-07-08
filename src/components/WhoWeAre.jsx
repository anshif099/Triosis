import React from 'react';
import heroLogo from '../assets/hero.png';
import './WhoWeAre.css';

function WhoWeAre() {
  const handleGetStartedClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new Event('trigger-preloader'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="whoweare-section">
      <div className="whoweare-container">
        
        {/* Row 1: Label & Headline */}
        <div className="whoweare-row-top">
          <div className="whoweare-label">
            <span>Who We Are</span>
          </div>
          <div className="whoweare-headline-block">
            <h2 className="whoweare-headline">
              Your business deserves more than beautiful designs—it deserves measurable digital growth.
            </h2>
            <a href="#" className="get-started-btn" onClick={handleGetStartedClick}>
              Get Started <span className="arrow">→</span>
            </a>
          </div>
        </div>

        {/* Row 2: Big Stat & Intro Paragraph & Tilted Logo */}
        <div className="whoweare-row-middle">
          <div className="whoweare-big-stat">
            <div className="stat-number-wrapper">
              <span className="big-number">18</span>
              <span className="unit">Y</span>
            </div>
            <p className="stat-label">18 Years of Delivering Digital Excellence</p>
          </div>

          <div className="whoweare-intro-logo">
            <p className="intro-text">
              At Triosis Digital, we combine strategy, creativity, technology, and marketing expertise to help businesses scale with confidence. From branding and websites to AI-powered marketing solutions, we build digital experiences that generate measurable business results.
            </p>
            <div className="tilted-logo-wrapper">
              <img src={heroLogo} alt="Triosis Symbol Logo" className="tilted-logo" />
            </div>
          </div>
        </div>

        {/* Row 3: Bottom Stat Grid */}
        <div className="whoweare-row-bottom">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-count">1500+</span>
              <span className="stat-text">Projects Delivered</span>
            </div>
            <div className="stat-item">
              <span className="stat-count">1000+</span>
              <span className="stat-text">Happy Clients</span>
            </div>
            <div className="stat-item">
              <span className="stat-count">25+</span>
              <span className="stat-text">Countries Served</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhoWeAre;
