import React from 'react';
import heroLogo from '../assets/hero.png';
import './WhoWeAre.css';

function WhoWeAre() {
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
              Your ideas deserve more than just great visuals they deserve creative performance.
            </h2>
            <a href="#contact" className="get-started-btn">
              Get Started <span className="arrow">→</span>
            </a>
          </div>
        </div>

        {/* Row 2: Big Stat & Intro Paragraph & Tilted Logo */}
        <div className="whoweare-row-middle">
          <div className="whoweare-big-stat">
            <div className="stat-number-wrapper">
              <span className="big-number">3</span>
              <span className="unit">M</span>
            </div>
            <p className="stat-label">3 Years of Delivering Results That Matter</p>
          </div>

          <div className="whoweare-intro-logo">
            <p className="intro-text">
              At Adsdot, we blend strategy, design, and digital innovation to help businesses 
              grow with confidence. Our team crafts powerful brand identities, compelling visuals, 
              and high-performing marketing campaigns that connect with the right audience and create measurable impact.
            </p>
            <div className="tilted-logo-wrapper">
              <img src={heroLogo} alt="Adsdot Symbol Logo" className="tilted-logo" />
            </div>
          </div>
        </div>

        {/* Row 3: Bottom Stat Grid */}
        <div className="whoweare-row-bottom">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-count">100+</span>
              <span className="stat-text">Projects Done</span>
            </div>
            <div className="stat-item">
              <span className="stat-count">100%</span>
              <span className="stat-text">Successful Rating</span>
            </div>
            <div className="stat-item">
              <span className="stat-count">100%</span>
              <span className="stat-text">Growth Net Worth</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhoWeAre;
