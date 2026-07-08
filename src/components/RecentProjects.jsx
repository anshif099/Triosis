import React, { useEffect, useRef, useState } from 'react';
import digitalSuccessImg from '../assets/digital_success.png';
import './RecentProjects.css';

function RecentProjects() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress of scroll through this section
      const totalHeight = rect.height - windowHeight;
      if (totalHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Calculate dynamic animations based on progress
  // Heading: fades out by progress = 0.55
  const titleOpacity = Math.max(0, 1 - scrollProgress * 1.8);
  const titleScale = 1 + scrollProgress * 0.05;

  // Project Card: fades in and slides into position starting at progress = 0.15
  const cardProgress = Math.min(1, Math.max(0, (scrollProgress - 0.15) * 1.3));
  const cardOpacity = cardProgress;
  const cardTranslateX = -80 + cardProgress * 80;
  const cardTranslateY = 60 - cardProgress * 60;

  return (
    <section className="projects-section" ref={sectionRef}>
      <div className="projects-sticky">
        <div className="projects-layout">
          {/* Centered Heading that disappears on scroll */}
          <div 
            className="projects-title-container"
            style={{
              opacity: titleOpacity,
              transform: `scale(${titleScale})`,
              display: titleOpacity === 0 ? 'none' : 'flex'
            }}
          >
            <span className="projects-subtitle">Our Recent Projects</span>
            <h2 className="projects-title">
              Building Digital Success<br />Across Industries
            </h2>
          </div>

          {/* Project Card that slides in from bottom-left */}
          <div 
            className="project-card"
            style={{
              opacity: cardOpacity,
              transform: `translate3d(${cardTranslateX}px, ${cardTranslateY}px, 0)`,
              pointerEvents: cardOpacity > 0.5 ? 'auto' : 'none'
            }}
          >
            <div className="project-image-wrapper">
              <img src={digitalSuccessImg} alt="Digital Success Platform" />
            </div>
            <div className="project-info">
              <h4>Digital Success Platform</h4>
              <p>Growth & Analytics</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentProjects;
