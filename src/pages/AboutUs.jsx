import React from 'react';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import './AboutUs.css';

const tickerItems = [
  'INNOVATION',
  'PERFORMANCE',
  'STRATEGY',
  'CREATIVITY',
  'GROWTH',
  'TECHNOLOGY',
  'EXCELLENCE',
  'LEADERSHIP'
];

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

      {/* Fast Moving Ticker Carousel */}
      <section className="about-ticker-section">
        <div className="about-ticker-wrapper">
          <div className="about-ticker-track">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
              <span className="ticker-element" key={index}>
                <span className="ticker-text">{item}</span>
                <span className="ticker-bullet">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About Details Section */}
      <section className="about-details-section">
        <div className="about-details-container">
          {/* Left Column: Stat */}
          <div className="about-details-left">
            <div className="details-stat-box">
              <div className="stat-number">
                3<span className="stat-plus">+</span>
              </div>
              <p className="stat-description">
                Years of transforming brands through bold ideas, innovative design, and full-spectrum marketing solutions that build visibility, trust, and measurable growth.
              </p>
            </div>
          </div>

          {/* Right Column: Mission and Agency Description */}
          <div className="about-details-right">
            <h2 className="details-heading-large">
              Triosis is a next-gen advertising agency built for brands that want to lead, not follow. We merge smart strategy, striking visuals, and high-performance marketing to help businesses scale in the digital world.
            </h2>
            
            <div className="details-mission-block">
              <p className="details-mission-text">
                From social media and design to branding, SEO, and paid advertising, we deliver integrated marketing solutions that amplify your presence across every platform. Our mission is simple—turn your vision into real-world results through creativity, precision, and seamless execution.
              </p>
              <div className="details-accent-dot"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutUs;
