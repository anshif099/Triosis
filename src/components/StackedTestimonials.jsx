import React, { useState } from 'react';
import './StackedTestimonials.css';

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
    quote: "Triosis transformed our business identity with their exceptional branding solutions. Their creativity and attention to detail gave us a logo and brand style that truly reflects our values. We've received countless compliments from our customers!",
    name: 'Muhammed Ansar',
    role: 'Founder - Falspace',
    colorType: 'navy'
  }
];

function StackedTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
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
              const relativePos = (index - activeIdx + testimonials.length) % testimonials.length;
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
                  <div className="quote-mark">"</div>
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
  );
}

export default StackedTestimonials;
