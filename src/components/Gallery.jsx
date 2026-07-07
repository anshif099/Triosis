import React from 'react';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpeg';
import './Gallery.css';

function Gallery() {
  return (
    <section className="gallery-section">
      <div className="gallery-content">
        <div className="gallery-left">
          {/* Left spacer column aligns with the hero text layout */}
        </div>
        <div className="gallery-right">
          <div className="capsule-gallery">
            <div className="capsule-item">
              <img src={img1} alt="Portfolio Item 1" />
            </div>
            <div className="capsule-item">
              <img src={img2} alt="Portfolio Item 2" />
            </div>
            <div className="capsule-item">
              <img src={img3} alt="Portfolio Item 3" />
            </div>
            <div className="capsule-item">
              <img src={img4} alt="Portfolio Item 4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
