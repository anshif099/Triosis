import React, { useState } from 'react';
import { EditableText, EditableSection } from '@anshif.rainhopes/reactcms-sdk';
import './StackedTestimonials.css';

const testimonials = [
  {
    id: 1,
    quote: 'Triosis has been an invaluable creative partner for us. Their exceptional designs, from our college football team jersey to engaging digital content, have greatly enhanced our presence. Their dedication and creativity make them a trusted partner in our digital journey.',
    name: 'Amir Suhail KV',
    role: 'HoD, Physical Education Department - SSA Areekode',
    colorType: 'navy'
  },
  {
    id: 2,
    quote: 'Exceptional creativity and strategic execution—Triosis has elevated our brand with outstanding results. Highly recommended!',
    name: 'Dr. Suhail P',
    role: 'Founder, Zodha Research Solutions',
    colorType: 'white'
  },
  {
    id: 3,
    quote: 'Working with Triosis has been a game-changer for our brand. Their creative posters for our product launches were captivating and drew in our target audience perfectly. Their team is highly talented and easy to work with!',
    name: 'Muhammed janish m',
    role: 'Founder & CEO of Dhiva pickles',
    colorType: 'blue'
  },
  {
    id: 4,
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
    <EditableSection regionId="stacked_testimonials.section" label="Stacked Testimonials Section" className="about-testimonials-section">
      <div className="about-testimonials-container">
        {/* Left Column: Heading and Rating */}
        <div className="testimonials-left-col">
          <EditableText
            regionId="stacked_testimonials.tag"
            label="Stacked Testimonials Tag"
            defaultValue="Testimonials"
            className="testimonials-tag"
            as="span"
          />
          <EditableText
            regionId="stacked_testimonials.title"
            label="Stacked Testimonials Title"
            defaultValue="What our clients say?"
            className="testimonials-title-large"
            as="h2"
          />
          <div className="testimonials-rating-box">
            <EditableText
              regionId="stacked_testimonials.rating_num"
              label="Rating Number"
              defaultValue="4.8"
              className="rating-number"
              as="span"
            />
            <EditableText
              regionId="stacked_testimonials.rating_label"
              label="Rating Label"
              defaultValue="Total Reviews"
              className="rating-label"
              as="span"
            />
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
                  <EditableText
                    regionId={`stacked_testimonials.item_${test.id || (index + 1)}.quote`}
                    label={`Testimonial ${index + 1} Quote`}
                    defaultValue={test.quote}
                    className="testimonial-quote-text"
                    as="p"
                  />

                  <div className="testimonial-author-box">
                    <div className="author-avatar-placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div className="author-info">
                      <EditableText
                        regionId={`stacked_testimonials.item_${test.id || (index + 1)}.name`}
                        label={`Testimonial ${index + 1} Author Name`}
                        defaultValue={test.name}
                        className="author-name"
                        as="h4"
                      />
                      <EditableText
                        regionId={`stacked_testimonials.item_${test.id || (index + 1)}.role`}
                        label={`Testimonial ${index + 1} Author Role`}
                        defaultValue={test.role}
                        className="author-role"
                        as="p"
                      />
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
    </EditableSection>
  );
}

export default StackedTestimonials;
