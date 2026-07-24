import React from 'react';
import { EditableText, EditableSection } from '@anshif.rainhopes/reactcms-sdk';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Team from '../components/Team.jsx';
import Footer from '../components/Footer.jsx';
import './OurTeamPage.css';

function OurTeamPage() {
  // Generate repeated text for the infinite marquee
  // White solid and glass outline one by one
  const marqueeItems = Array.from({ length: 12 }, (_, i) => ({
    text: 'OUR TEAM',
    isOutline: i % 2 !== 0
  }));

  return (
    <div className="our-team-page-container">
      <Preloader />
      <Header />

      {/* Our Team Hero Section */}
      <EditableSection regionId="our_team.hero" label="Our Team Hero" className="our-team-hero">
        <div className="team-hero-glow"></div>
        
        <div className="team-hero-top-row">
          <div className="team-hero-left">
            <EditableText regionId="our_team.tag" label="Our Team Tag" defaultValue="OUR TEAM" className="team-hero-tag" />
          </div>
          <div className="team-hero-right">
            <EditableText
              regionId="our_team.title"
              label="Our Team Hero Title"
              defaultValue="OUR TALENTED SQUAD ."
              className="team-hero-title"
              as="h1"
            />
          </div>
        </div>

        {/* Infinite Moving Text Carousel (Solid and Outline) */}
        <div className="team-hero-carousel-container">
          <div className="team-hero-carousel-track">
            {/* Repeat twice to ensure seamless transition loop */}
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span 
                key={index} 
                className={`carousel-text-item ${item.isOutline ? 'text-outline' : 'text-solid'}`}
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </EditableSection>

      {/* Meet Our Digital Experts Grid Component */}
      <Team />

      <Footer />
    </div>
  );
}

export default OurTeamPage;
