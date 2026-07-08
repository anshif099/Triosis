import React from 'react';
import heroLogo from '../assets/hero.png';
import './Hero.css';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <h1 className="hero-heading">
            Strategic<br />
            Digital Solutions<br />
            for Businesses<br />
            That Want to Lead <span className="dot">.</span>
          </h1>
          {/* Foggy spotlight effect behind the text */}
          <div className="foggy-glow"></div>
        </div>

        <div className="hero-right">
          <div className="we-help-container">
            <img src={heroLogo} alt="Triosis Symbol" className="we-help-logo" />
            <p className="we-help-text">
              We help ambitious businesses grow through innovative technology, creative marketing, and
              measurable digital strategies that deliver long-term business success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
