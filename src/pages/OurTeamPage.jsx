import React from 'react';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Team from '../components/Team.jsx';
import Footer from '../components/Footer.jsx';
import './OurTeamPage.css';

function OurTeamPage() {
  // Generate repeated text for the infinite marquee
  // White solid and glass outline one by one
  const marqueeItems = Array.from({ length: 12 }, (_, i) => ({
    text: 'OUR TEAM',
    isOutline: i % 2 !== 0
  }));

  return (
    <div className="our-team-page-container">
      <Preloader />
      <Header />

      {/* Our Team Hero Section */}
      <section className="our-team-hero">
        <div className="team-hero-glow"></div>
        
        <div className="team-hero-top-row">
          <div className="team-hero-left">
            <span className="team-hero-tag">
              <span className="tag-dot"></span>
              OUR TEAM
            </span>
          </div>
          <div className="team-hero-right">
            <h1 className="team-hero-title">
              OUR TALENTED <br />SQUAD<span className="cyan-dot-title">.</span>
            </h1>
          </div>
        </div>

        {/* Infinite Moving Text Carousel (Solid and Outline) */}
        <div className="team-hero-carousel-container">
          <div className="team-hero-carousel-track">
            {/* Repeat twice to ensure seamless transition loop */}
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span 
                key={index} 
                className={`carousel-text-item ${item.isOutline ? 'text-outline' : 'text-solid'}`}
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Digital Experts Grid Component */}
      <Team />

      <Footer />
    </div>
  );
}

export default OurTeamPage;
