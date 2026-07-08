import React from 'react';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import './AboutUs.css';

const coreValues = [
  {
    title: 'Innovation',
    description: 'We continuously push boundaries to implement the latest technology and creative strategies that keep businesses ahead.',
    icon: 'innovation'
  },
  {
    title: 'Measurable Growth',
    description: 'We focus on results that matter—building systems that drive long-term business success, not temporary hype.',
    icon: 'growth'
  },
  {
    title: 'Creative Excellence',
    description: 'We believe outstanding designs and intelligent brand strategies are key to building digital authority.',
    icon: 'excellence'
  },
  {
    title: 'Client Partnership',
    description: 'We build long-term relationships based on transparency, trust, and shared success with our clients globally.',
    icon: 'partnership'
  }
];

const ValueIcon = ({ type }) => {
  const svgProps = {
    className: "value-svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  switch (type) {
    case 'innovation':
      return (
        <svg {...svgProps}>
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
      );
    case 'growth':
      return (
        <svg {...svgProps}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'excellence':
      return (
        <svg {...svgProps}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case 'partnership':
      return (
        <svg {...svgProps}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return null;
  }
};

function AboutUs() {
  return (
    <div className="about-page-container">
      <Preloader />
      <Header />

      {/* About Hero Section */}
      <section className="about-hero">
        <div className="about-hero-glow"></div>
        <div className="about-hero-content">
          <span className="about-label">About Triosis Digital</span>
          <h1 className="about-title">
            Shaping the Future of <span className="text-gradient">Digital Growth</span>
          </h1>
          <p className="about-description">
            We combine strategy, creativity, and technology to help ambitious brands scale with confidence. From branding and high-performance websites to AI-powered marketing solutions, we build digital experiences that deliver long-term business success.
          </p>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="about-journey">
        <div className="about-journey-content">
          <div className="journey-left">
            <h2 className="journey-title">
              18 Years of Delivering <br />Digital Excellence
            </h2>
            <div className="journey-separator"></div>
          </div>
          <div className="journey-right">
            <p className="journey-text">
              Over the last 18 years, we have grown from a small creative team into a leading digital solutions partner. We believe that your business deserves more than beautiful designs—it deserves measurable digital growth.
            </p>
            <p className="journey-text">
              Through consistent marketing systems, intelligent branding, and innovative technology, we help businesses establish dominant authority in their industries. We don't rely on temporary marketing hype; we build structured platforms engineered for scaling.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values">
        <div className="values-header">
          <h2 className="values-title">Our Core Values</h2>
          <div className="values-separator"></div>
        </div>

        <div className="values-grid">
          {coreValues.map((value) => (
            <div className="value-card" key={value.title}>
              <div className="value-card-left icon-container">
                <ValueIcon type={value.icon} />
              </div>
              <div className="value-card-middle">
                <h3 className="value-card-title">{value.title}</h3>
                <p className="value-card-desc">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutUs;
