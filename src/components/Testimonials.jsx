import React from 'react';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    quote: "Adsdot transformed our business identity with their exceptional branding solutions. Their creativity and attention to detail gave us a logo and brand style that truly reflects our values. We've received countless compliments from our customers!",
    author: "Emily Watson",
    role: "Co-Founder, GreenLife",
    isDark: true
  },
  {
    id: 2,
    quote: "Adsdot has been an invaluable creative partner for us. Their exceptional designs, from our college football team jersey to engaging digital content, have greatly enhanced our presence. Their dedication and creativity make them a trusted partner in our digital journey.",
    author: "Dr. Suhail P",
    role: "Founder, Zodiac Research",
    isDark: true
  },
  {
    id: 3,
    quote: "Exceptional creativity and strategic execution—ADSDOT has elevated our brand with outstanding results. Highly recommended!",
    author: "Dr. Suhail P",
    role: "Founder, Zodiac Research",
    isDark: false
  },
  {
    id: 4,
    quote: "Working with Adsdot has been a game-changer for our brand. Their creative posters for our product launches were captivating and drew in our target audience perfectly. Their team is highly talented and easy to work with!",
    author: "Sarah Jenkins",
    role: "Marketing Director, Bloom Co.",
    isDark: true
  },
  {
    id: 5,
    quote: "Their team was extremely professional and delivered outstanding brand strategy solutions. They took our complex vision and simplified it into a beautiful brand identity system.",
    author: "David Miller",
    role: "Product Manager, TechFlow",
    isDark: false
  }
];

function Testimonials() {
  // Duplicate array for seamless infinite looping scroll
  const doubleData = [...testimonialsData, ...testimonialsData];

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
