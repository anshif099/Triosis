import React from 'react';
import { EditableText, EditableButton, EditableSection } from '@anshif.rainhopes/reactcms-sdk';
import blogCover from '../assets/blog_cover.jpg';
import './Journal.css';

function Journal() {
  const goToBlog = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('trigger-preloader', { detail: { fast: true } }));
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'blog' } }));
  };
  return (
    <EditableSection regionId="journal.section" label="Journal Section" className="journal-section">
      <div className="journal-container">
        
        {/* Header with left-aligned title & capsule button */}
        <div className="journal-header">
          <div className="journal-header-left">
            <EditableText regionId="journal.subtitle" label="Journal Subtitle" defaultValue="Blog" className="journal-subtitle" />
            <EditableText
              regionId="journal.title"
              label="Journal Title"
              defaultValue="Learn From Our Latest Insights"
              className="journal-title"
              as="h2"
            />
            <EditableText
              regionId="journal.desc"
              label="Journal Description"
              defaultValue="Explore practical articles on digital marketing, AI, branding, SEO, web development, and business growth."
              className="journal-desc"
              as="p"
            />
          </div>
          <EditableButton
            regionId="journal.cta"
            label="Journal CTA Button"
            defaultValue={{ text: "Explore all posts →", href: "#" }}
            className="explore-posts-btn"
            onClick={goToBlog}
          />
        </div>

        {/* Journal Cards List */}
        <div className="journal-list">
          <div className="journal-card" onClick={goToBlog} style={{ cursor: 'pointer' }}>
            
            <div className="journal-image-container">
              <img 
                src={blogCover} 
                alt="The Art of Designing: Where Creativity Meets Purpose" 
                className="journal-image" 
              />
              
              {/* Teardrop leaf shape date badge */}
              <div className="date-badge">
                {/* Normal State: Date */}
                <div className="normal-content">
                  <div className="date-text-wrapper">
                    <span className="date-day">28</span>
                    <span className="date-month">MAY</span>
                  </div>
                </div>
                
                {/* Hover State: White circle with arrow */}
                <div className="hover-content">
                  <div className="arrow-circle">
                    <svg className="badge-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Meta info: Category & Author */}
            <div className="journal-meta">
              <span className="journal-category">Creative Designing</span>
              <span className="journal-author">By : Triosis</span>
            </div>

            <h3 className="journal-card-title">
              The Art of Designing: Where Creativity Meets Purpose
            </h3>
            
            <div className="journal-divider"></div>
            
          </div>
        </div>

      </div>
    </EditableSection>
  );
}

export default Journal;
