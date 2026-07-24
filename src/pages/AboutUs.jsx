import React, { useState } from 'react';
import { EditableText, EditableSection } from '@anshif.rainhopes/reactcms-sdk';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Team from '../components/Team.jsx';
import BrandLogos from '../components/BrandLogos.jsx';
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

const testimonials = [
  {
    quote: 'Triosis has been an invaluable creative partner for us. Their exceptional designs, from our college football team jersey to engaging digital content, have greatly enhanced our presence. Their dedication and creativity make them a trusted partner in our digital journey.',
    name: 'Amir Suhail KV',
    role: 'HoD, Physical Education Department - SSA Areekode',
    colorType: 'navy'
  },
  {
    quote: 'Exceptional creativity and strategic execution—Triosis has elevated our brand with outstanding results. Highly recommended!',
    name: 'Dr. Suhail P',
    role: 'Founder, Zodha Research Solutions',
    colorType: 'white'
  },
  {
    quote: 'Working with Triosis has been a game-changer for our brand. Their creative posters for our product launches were captivating and drew in our target audience perfectly. Their team is highly talented and easy to work with!',
    name: 'Muhammed janish m',
    role: 'Founder & CEO of Dhiva pickles',
    colorType: 'blue'
  },
  {
    quote: 'Triosis transformed our business identity with their exceptional branding solutions. Their creativity and attention to detail gave us a logo and brand style that truly reflects our values. We’ve received countless compliments from our customers!',
    name: 'Muhammed Ansar',
    role: 'Founder - Falspace',
    colorType: 'navy'
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
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="about-page-container">
      <Preloader />
      <Header />

      {/* About Intro Section */}
      <EditableSection regionId="about.intro_section" label="About Intro Section" className="about-intro-section">
        <div className="about-intro-container">
          <div className="about-intro-left">
            <EditableText regionId="about.tag" label="About Tag" defaultValue="ABOUT US" className="about-tag" />
          </div>
          <div className="about-intro-right">
            <EditableText
              regionId="about.intro_heading"
              label="About Intro Heading"
              defaultValue="Crafting. smart concepts and turning them into conversion-driven marketing that elevates your brand."
              className="about-intro-heading"
              as="h1"
            />
          </div>
        </div>
      </EditableSection>

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
      <EditableSection regionId="about.details_section" label="About Details Section" className="about-details-section">
        <div className="about-details-container">
          {/* Left Column: Stat */}
          <div className="about-details-left">
            <div className="details-stat-box">
              <div className="stat-number">
                <EditableText regionId="about.years_count" label="Years Experience Count" defaultValue="3+" />
              </div>
              <EditableText
                regionId="about.years_desc"
                label="Years Experience Description"
                defaultValue="Years of transforming brands through bold ideas, innovative design, and full-spectrum marketing solutions that build visibility, trust, and measurable growth."
                className="stat-description"
                as="p"
              />
            </div>
          </div>

          {/* Right Column: Mission and Agency Description */}
          <div className="about-details-right">
            <EditableText
              regionId="about.heading_large"
              label="About Headline Large"
              defaultValue="Triosis is a next-gen advertising agency built for brands that want to lead, not follow. We merge smart strategy, striking visuals, and high-performance marketing to help businesses scale in the digital world."
              className="details-heading-large"
              as="h2"
            />

            <div className="details-mission-block">
              <EditableText
                regionId="about.mission_text"
                label="About Mission Text"
                defaultValue="From social media and design to branding, SEO, and paid advertising, we deliver integrated marketing solutions that amplify your presence across every platform. Our mission is simple—turn your vision into real-world results through creativity, precision, and seamless execution."
                className="details-mission-text"
                as="p"
              />
              <div className="details-accent-dot"></div>
            </div>
          </div>
        </div>
      </EditableSection>

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

      {/* Digital Experts Team Section */}
      <Team />

      {/* Stacked Testimonials Section */}
      <section className="about-testimonials-section">
        <div className="about-testimonials-container">
          {/* Left Column: Heading and Rating */}
          <div className="testimonials-left-col">
            <span className="testimonials-tag">
              <span className="tag-dot"></span>
              Testimonials
            </span>
            <h2 className="testimonials-title-large">
              What <span className="title-italic">our</span> <br />clients say?
            </h2>
            <div className="testimonials-rating-box">
              <span className="rating-number">4.8</span>
              <span className="rating-label">Total Reviews</span>
            </div>
          </div>

          {/* Right Column: Stacked Cards & Navigation */}
          <div className="testimonials-right-col">
            <button className="nav-arrow prev-arrow" onClick={handlePrev} aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div className="stacked-cards-wrapper">
              {testimonials.map((test, index) => {
                // Calculate position relative to active index
                const relativePos = (index - activeIdx + testimonials.length) % testimonials.length;

                // Only show top 3 cards in the visual stack
                const isVisible = relativePos < 3;

                return (
                  <div
                    className={`stacked-testimonial-card ${test.colorType} ${isVisible ? 'visible' : 'hidden'}`}
                    key={index}
                    style={{
                      transform: isVisible
                        ? `translate3d(${relativePos * 24}px, ${relativePos * 12}px, ${-relativePos * 40}px) rotate(${relativePos * 2}deg) scale(${1 - relativePos * 0.05})`
                        : 'translate3d(100px, 50px, -200px) rotate(10deg) scale(0.8)',
                      zIndex: 10 - relativePos,
                      opacity: isVisible ? (1 - relativePos * 0.15) : 0,
                      pointerEvents: relativePos === 0 ? 'auto' : 'none'
                    }}
                  >
                    <div className="quote-mark">“</div>
                    <p className="testimonial-quote-text">{test.quote}</p>

                    <div className="testimonial-author-box">
                      <div className="author-avatar-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="author-info">
                        <h4 className="author-name">{test.name}</h4>
                        <p className="author-role">{test.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="nav-arrow next-arrow" onClick={handleNext} aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              <div className="nav-accent-dot"></div>
            </button>
          </div>
        </div>
      </section>
      <BrandLogos />

      <Footer />
    </div>
  );
}

export default AboutUs;
