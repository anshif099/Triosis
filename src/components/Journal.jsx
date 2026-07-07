import React from 'react';
import blogCover from '../assets/blog_cover.jpg';
import './Journal.css';

function Journal() {
  return (
    <section className="journal-section">
      <div className="journal-container">
        
        {/* Header with left-aligned title & capsule button */}
        <div className="journal-header">
          <h2 className="journal-title">
            Learn our recent<br />journal
          </h2>
          <a href="#explore" className="explore-posts-btn">
            Explore all posts <span className="arrow">→</span>
          </a>
        </div>

        {/* Journal Cards List */}
        <div className="journal-list">
          <div className="journal-card">
            
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
    </section>
  );
}

export default Journal;
