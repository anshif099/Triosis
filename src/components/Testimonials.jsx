import React from 'react';
import { EditableText, EditableSection } from '@anshif.rainhopes/reactcms-sdk';
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
    <EditableSection regionId="testimonials.section" label="Testimonials Section" className="testimonials-section">
      <div className="testimonials-header">
        <EditableText
          regionId="testimonials.title"
          label="Testimonials Title"
          defaultValue="What our clients say?"
          className="testimonials-title"
          as="h2"
        />
      </div>

      <div className="testimonial-marquee-wrapper">
        <div className="testimonial-marquee">
          {doubleData.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`testimonial-card ${item.isDark ? 'theme-black' : 'theme-white'}`}
            >
              <span className="quote-icon">“</span>
              <EditableText
                regionId={`testimonials.quote_${item.id}`}
                label={`Testimonial ${item.id} Quote`}
                defaultValue={item.quote}
                className="quote-text"
                as="p"
              />
              
              <div className="testimonial-user">
                <div className="user-avatar">
                  <svg className="avatar-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="user-details">
                  <EditableText
                    regionId={`testimonials.author_${item.id}`}
                    label={`Testimonial ${item.id} Author`}
                    defaultValue={item.author}
                    className="user-name"
                    as="h5"
                  />
                  <EditableText
                    regionId={`testimonials.role_${item.id}`}
                    label={`Testimonial ${item.id} Role`}
                    defaultValue={item.role}
                    className="user-role"
                    as="p"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditableSection>
  );
}

export default Testimonials;
