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

const hoverServices = [
  {
    title: 'Digital Marketing',
    description: 'We create data-backed, goal-oriented digital strategies that map your customer journey from awareness to conversion. Every plan blends market insights, competitor analysis, and performance forecasting to ensure your brand reaches the right audience with maximum impact.',
    icon: 'marketing'
  },
  {
    title: 'Social Media Management & Content Creation',
    description: 'Creative, consistent, and goal-focused content with full social media handling to build engagement, trust, and a strong brand presence. We design custom templates, high-retention reels, and monthly performance plans for your growth.',
    icon: 'social'
  },
  {
    title: 'Web Design & Development',
    description: 'Modern, responsive, and high-performing websites built to convert visitors into customers and elevate your online experience. We engineer fast layouts, seamless user flows, and optimized code tailored to your business goals.',
    icon: 'web'
  },
  {
    title: 'Branding & Visual Identity',
    description: 'Establishing a memorable, cohesive brand personality with premium visual guidelines, custom logo design, and brand assets that tell your unique story and connect with customers emotionally across all touchpoints.',
    icon: 'branding'
  }
];

const ServiceIcon = ({ type }) => {
  const svgProps = {
    className: "service-hover-svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  switch (type) {
    case 'marketing':
      return (
        <svg {...svgProps}>
          <path d="M12 18H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h9" />
          <path d="M16 17v-6a2 2 0 0 0-2-2h-2v8h2a2 2 0 0 0 2-2z" />
          <path d="M12 7.5V16.5" />
          <path d="M22 6s-3 1-3 6 3 6 3 6" />
        </svg>
      );
    case 'social':
      return (
        <svg {...svgProps}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    case 'web':
      return (
        <svg {...svgProps}>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case 'branding':
      return (
        <svg {...svgProps}>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
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

      {/* Hover Accordion Columns Section */}
      <section className="about-hover-services-section">
        <div className="hover-services-grid">
          {hoverServices.map((service, index) => (
            <div className="hover-service-card" key={index}>
              <div className="hover-card-inner">
                {/* Icon wrapper */}
                <div className="hover-card-icon-box">
                  <ServiceIcon type={service.icon} />
                </div>
                {/* Title */}
                <h3 className="hover-card-title">{service.title}</h3>
                {/* Collapsible/hover description */}
                <div className="hover-card-description-box">
                  <p className="hover-card-desc-text">
                    {service.description}
                    <span className="desc-bullet-dot">·</span>
                  </p>
                </div>
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
