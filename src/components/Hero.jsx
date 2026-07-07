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
            Branding &<br />
            Marketing for<br />
            Businesses That<br />
            Aim Higher <span className="dot">.</span>
          </h1>
          {/* Foggy spotlight effect behind the text */}
          <div className="foggy-glow"></div>
        </div>

        <div className="hero-right">
          <div className="we-help-container">
            <img src={heroLogo} alt="Triosis Symbol" className="we-help-logo" />
            <p className="we-help-text">
              We help ambitious brands grow through structured strategy, 
              intelligent creativity, and consistent marketing systems, 
              not temporary marketing hype.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
