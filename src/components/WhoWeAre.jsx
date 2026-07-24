import React from 'react';
import { EditableText, EditableButton, EditableSection } from '@anshif.rainhopes/reactcms-sdk';
import heroLogo from '../assets/hero.png';
import './WhoWeAre.css';

function WhoWeAre() {
  const handleGetStartedClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new Event('trigger-preloader'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <EditableSection regionId="whoweare.section" label="Who We Are Section" className="whoweare-section">
      <div className="whoweare-container">
        
        {/* Row 1: Label & Headline */}
        <div className="whoweare-row-top">
          <div className="whoweare-label">
            <EditableText regionId="whoweare.tag" label="Who We Are Section Tag" defaultValue="Who We Are" />
          </div>
          <div className="whoweare-headline-block">
            <EditableText
              regionId="whoweare.headline"
              label="Who We Are Headline"
              defaultValue="Your business deserves more than beautiful designs—it deserves measurable digital growth."
              className="whoweare-headline"
              as="h2"
            />
            <EditableButton
              regionId="whoweare.cta"
              label="Who We Are CTA Button"
              defaultValue={{ text: "Get Started →", href: "#" }}
              className="get-started-btn"
              onClick={handleGetStartedClick}
            />
          </div>
        </div>

        {/* Row 2: Big Stat & Intro Paragraph & Tilted Logo */}
        <div className="whoweare-row-middle">
          <div className="whoweare-big-stat">
            <div className="stat-number-wrapper">
              <EditableText regionId="whoweare.stat_number" label="Experience Years Stat" defaultValue="18" className="big-number" />
              <span className="unit">Y</span>
            </div>
            <EditableText regionId="whoweare.stat_label" label="Experience Label" defaultValue="18 Years of Delivering Digital Excellence" className="stat-label" as="p" />
          </div>

          <div className="whoweare-intro-logo">
            <EditableText
              regionId="whoweare.intro_text"
              label="Who We Are Intro Text"
              defaultValue="At Triosis Digital, we combine strategy, creativity, technology, and marketing expertise to help businesses scale with confidence. From branding and websites to AI-powered marketing solutions, we build digital experiences that generate measurable business results."
              className="intro-text"
              as="p"
            />
            <div className="tilted-logo-wrapper">
              <img src={heroLogo} alt="Triosis Symbol Logo" className="tilted-logo" />
            </div>
          </div>
        </div>

        {/* Row 3: Bottom Stat Grid */}
        <div className="whoweare-row-bottom">
          <div className="stats-grid">
            <div className="stat-item">
              <EditableText regionId="whoweare.projects_count" label="Projects Delivered Count" defaultValue="1500+" className="stat-count" />
              <EditableText regionId="whoweare.projects_label" label="Projects Delivered Label" defaultValue="Projects Delivered" className="stat-text" />
            </div>
            <div className="stat-item">
              <EditableText regionId="whoweare.clients_count" label="Happy Clients Count" defaultValue="1000+" className="stat-count" />
              <EditableText regionId="whoweare.clients_label" label="Happy Clients Label" defaultValue="Happy Clients" className="stat-text" />
            </div>
            <div className="stat-item">
              <EditableText regionId="whoweare.countries_count" label="Countries Served Count" defaultValue="25+" className="stat-count" />
              <EditableText regionId="whoweare.countries_label" label="Countries Served Label" defaultValue="Countries Served" className="stat-text" />
            </div>
          </div>
        </div>

      </div>
    </EditableSection>
  );
}

export default WhoWeAre;
