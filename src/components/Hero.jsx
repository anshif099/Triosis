import React, { useState } from 'react';
import heroLogo from '../assets/hero.png';
import innovateBg from '../assets/innovate_bg.png';
import transformBg from '../assets/transform_bg.png';
import growBg from '../assets/grow_bg.png';
import './Hero.css';

function Hero() {
  const [hoveredTagline, setHoveredTagline] = useState(null);

  return (
    <section className={`hero-section ${hoveredTagline ? 'has-bg-hover' : ''}`}>
      {/* Interactive hover background layers */}
      <div 
        className={`hero-hover-bg innovate-bg ${hoveredTagline === 'innovate' ? 'active' : ''}`}
        style={{ backgroundImage: `url(${innovateBg})` }}
      />
      <div 
        className={`hero-hover-bg transform-bg ${hoveredTagline === 'transform' ? 'active' : ''}`}
        style={{ backgroundImage: `url(${transformBg})` }}
      />
      <div 
        className={`hero-hover-bg grow-bg ${hoveredTagline === 'grow' ? 'active' : ''}`}
        style={{ backgroundImage: `url(${growBg})` }}
      />

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

      {/* Interactive Taglines & Popups */}
      <div className="hero-taglines-wrapper">
        {hoveredTagline && (
          <div className={`animation-popup-card ${hoveredTagline}-active`}>
            {hoveredTagline === 'innovate' && (
              <div className="animation-content innovate-anim">
                <svg viewBox="0 0 100 100" className="anim-svg">
                  {/* Concentric rotating orbital rings */}
                  <circle cx="50" cy="50" r="40" className="ring ring-1" />
                  <circle cx="50" cy="50" r="30" className="ring ring-2" />
                  <circle cx="50" cy="50" r="20" className="ring ring-3" />
                  {/* Orbiting dots */}
                  <circle cx="50" cy="10" r="3" className="orbit-dot dot-1" />
                  <circle cx="90" cy="50" r="3" className="orbit-dot dot-2" />
                  <circle cx="50" cy="90" r="3" className="orbit-dot dot-3" />
                  {/* Glowing center core */}
                  <circle cx="50" cy="50" r="8" className="core-dot" />
                </svg>
                <div className="popup-label">INNOVATING FUTURE TECH</div>
              </div>
            )}

            {hoveredTagline === 'transform' && (
              <div className="animation-content transform-anim">
                <div className="morph-blobs-container">
                  <div className="morph-blob blob-1"></div>
                  <div className="morph-blob blob-2"></div>
                  <div className="morph-blob blob-3"></div>
                </div>
                <div className="popup-label">TRANSFORMING BUSINESSES</div>
              </div>
            )}

            {hoveredTagline === 'grow' && (
              <div className="animation-content grow-anim">
                <svg viewBox="0 0 120 120" className="anim-svg">
                  <defs>
                    <linearGradient id="grow-bar-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00ff88" />
                      <stop offset="100%" stopColor="#00b894" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  
                  {/* Chart Grid Lines */}
                  <line x1="20" y1="20" x2="20" y2="100" className="grid-line" />
                  <line x1="20" y1="100" x2="100" y2="100" className="grid-line" />
                  
                  {/* Growing Bars */}
                  <rect x="30" y="80" width="8" height="20" className="bar bar-1" />
                  <rect x="48" y="65" width="8" height="35" className="bar bar-2" />
                  <rect x="66" y="50" width="8" height="50" className="bar bar-3" />
                  <rect x="84" y="30" width="8" height="70" className="bar bar-4" />
                  
                  {/* Glowing Trend Line */}
                  <path d="M 34 80 L 52 65 L 70 50 L 88 30" className="trend-line" />
                  
                  {/* Pulse Nodes */}
                  <circle cx="34" cy="80" r="3.5" className="node node-1" />
                  <circle cx="52" cy="65" r="3.5" className="node node-2" />
                  <circle cx="70" cy="50" r="3.5" className="node node-3" />
                  <circle cx="88" cy="30" r="3.5" className="node node-4" />
                </svg>
                <div className="popup-label">SCALING GROWTH</div>
              </div>
            )}
          </div>
        )}

        <div className="hero-taglines">
          <span 
            className={`tagline-word innovate ${hoveredTagline === 'innovate' ? 'active' : ''}`}
            onMouseEnter={() => setHoveredTagline('innovate')}
            onMouseLeave={() => setHoveredTagline(null)}
          >
            Innovate.
          </span>
          <span 
            className={`tagline-word transform ${hoveredTagline === 'transform' ? 'active' : ''}`}
            onMouseEnter={() => setHoveredTagline('transform')}
            onMouseLeave={() => setHoveredTagline(null)}
          >
            Transform.
          </span>
          <span 
            className={`tagline-word grow ${hoveredTagline === 'grow' ? 'active' : ''}`}
            onMouseEnter={() => setHoveredTagline('grow')}
            onMouseLeave={() => setHoveredTagline(null)}
          >
            Grow.
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
