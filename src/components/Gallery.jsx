import React, { useEffect, useRef, useState } from 'react';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpeg';
import './Gallery.css';

function Gallery() {
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

  // Determine if item is expanded based on scroll progress:
  // Progress 0% - 5%: All collapsed (staggered narrow pills)
  // Progress 5%: Item 1 expands
  // Progress 28%: Item 2 expands
  // Progress 52%: Item 3 expands
  // Progress 76%: Item 4 expands
  const isExpanded = (index) => {
    if (index === 0) return scrollProgress >= 0.05;
    if (index === 1) return scrollProgress >= 0.28;
    if (index === 2) return scrollProgress >= 0.52;
    if (index === 3) return scrollProgress >= 0.76;
    return false;
  };

  const items = [
    { id: 1, img: img1, title: 'Falspace', subtitle: 'BRANDING' },
    { id: 2, img: img2, title: 'Aimlex Learning LLP', subtitle: 'BROUCHER' },
    { id: 3, img: img3, title: 'Mindsphere', subtitle: 'BRANDING' },
    { id: 4, img: img4, title: 'Code Sprint', subtitle: 'BRANDING' }
  ];

  return (
    <section className="scroll-gallery-section" ref={sectionRef}>
      <div className="sticky-container">
        <div className="gallery-layout">
          <div className="gallery-left">
            {/* Leaves space on the left to align with the hero text layout */}
          </div>
          <div className="gallery-right">
            <div className="scroll-capsule-gallery">
              {items.map((item, index) => {
                const expanded = isExpanded(index);
                return (
                  <div
                    key={item.id}
                    className={`scroll-capsule-item ${expanded ? 'expanded' : 'collapsed'}`}
                  >
                    <div className="img-container">
                      <img src={item.img} alt={item.title} />
                      <div className="glass-overlay"></div>
                    </div>

                    {/* Vertical label (displayed when collapsed) */}
                    <div className="vertical-label">
                      <div className="vertical-title">
                        {item.title.split('').map((char, i) => (
                          <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
                        ))}
                      </div>
                      <div className="vertical-subtitle">
                        {item.subtitle.split('').map((char, i) => (
                          <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
                        ))}
                      </div>
                    </div>

                    {/* Horizontal label (displayed when expanded) */}
                    <div className="horizontal-label">
                      <h3 className="label-title">{item.title}</h3>
                      <p className="label-subtitle">{item.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
