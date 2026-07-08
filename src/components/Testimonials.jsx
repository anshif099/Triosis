import React from 'react';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    quote: "Triosis Digital completely transformed our online presence. Their strategy, creativity, and execution delivered measurable growth beyond our expectations.",
    author: "Business Owner",
    role: "Verified Client",
    isDark: true
  },
  {
    id: 2,
    quote: "Their team understands branding, websites, and digital marketing exceptionally well. Every project was delivered on time with outstanding quality.",
    author: "Managing Director",
    role: "Verified Client",
    isDark: false
  }
];

function Testimonials() {
  // Triple the data array for seamless infinite looping scroll (since 2 items is too small for a marquee)
  const doubleData = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="testimonials-title">
          What our <span className="serif-italic">clients</span> say?
        </h2>
      </div>

      <div className="testimonial-marquee-wrapper">
        <div className="testimonial-marquee">
          {doubleData.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`testimonial-card ${item.isDark ? 'theme-black' : 'theme-white'}`}
            >
              <span className="quote-icon">“</span>
              <p className="quote-text">{item.quote}</p>
              
              <div className="testimonial-user">
                <div className="user-avatar">
                  <svg className="avatar-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="user-details">
                  <h5 className="user-name">{item.author}</h5>
                  <p className="user-role">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
