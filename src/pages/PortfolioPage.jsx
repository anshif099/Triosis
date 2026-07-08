import React, { useState } from 'react';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import img9 from '../assets/img9.jpg';
import img4 from '../assets/img4.jpeg';
import blogCover from '../assets/blog_cover.jpg';
import './PortfolioPage.css';

const portfolioItems = [
  {
    id: 1,
    name: 'Academy of Excellence',
    category: 'Creative Brochures',
    year: '2024',
    image: img4,
    type: 'image'
  },
  {
    id: 2,
    name: 'Anoor Online Academy',
    category: 'Creative Designs',
    year: '2025',
    image: img5,
    type: 'image'
  },
  {
    id: 3,
    name: 'Misbah Academy',
    category: 'Social Media Creatives',
    year: '2025',
    image: img6,
    type: 'image'
  },
  {
    id: 4,
    name: 'Al Ajr Academy of Islamic Studies',
    category: 'Creative Design',
    year: '2024',
    image: img7,
    type: 'image'
  },
  {
    id: 5,
    name: 'Aimlex Learning',
    category: 'Creative Design',
    year: '2025',
    image: img8,
    type: 'image'
  },
  {
    id: 6,
    name: 'Ahla Dates & Dry Fruits Hub',
    category: 'Social Media Management',
    year: '2025',
    image: img9,
    type: 'image'
  },
  {
    id: 7,
    name: 'Falspace',
    category: 'Branding',
    year: '2024',
    image: blogCover,
    type: 'image'
  }
];

function PortfolioPage() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="portfolio-page-container">
      <Preloader />
      <Header />

      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="portfolio-hero-inner">
          <div className="portfolio-hero-tag-col">
            <span className="portfolio-hero-tag">
              <span className="port-tag-dot"></span>
              OUR WORKS
            </span>
          </div>
          <div className="portfolio-hero-title-col">
            <h1 className="portfolio-hero-title">PORTFOLIO</h1>
            <span className="portfolio-accent-dot"></span>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="portfolio-grid-section">
        <div className="portfolio-grid-inner">
          <div className="portfolio-grid">
            {portfolioItems.map((item) => (
              <div
                className={`portfolio-card ${hoveredId === item.id ? 'hovered' : ''} ${hoveredId !== null && hoveredId !== item.id ? 'dimmed' : ''}`}
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Area */}
                <div className="portfolio-card-media">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="portfolio-card-img"
                  />
                  <div className="portfolio-card-overlay">
                    <span className="portfolio-view-label">View Project →</span>
                  </div>
                </div>

                {/* Info Row */}
                <div className="portfolio-card-info">
                  <h3 className="portfolio-card-name">{item.name}</h3>
                  <span className="portfolio-card-meta">
                    {item.category}&nbsp;&nbsp;—&nbsp;&nbsp;{item.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PortfolioPage;
