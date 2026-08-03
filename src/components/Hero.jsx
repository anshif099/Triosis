import React, { useState } from 'react';
import { EditableText, EditableImage, EditableSection, useEditable } from '@anshif.rainhopes/reactcms-sdk';
import heroLogo from '../assets/hero.png';
import innovateBg from '../assets/innovate_bg.png';
import transformBg from '../assets/transform_bg.png';
import growBg from '../assets/grow_bg.png';
import './Hero.css';

function Hero() {
  const [hoveredTagline, setHoveredTagline] = useState(null);
  const [clickedTagline, setClickedTagline] = useState(null);

  const activeTagline = hoveredTagline || clickedTagline;

  const handleTaglineClick = (taglineKey) => {
    setClickedTagline((prev) => (prev === taglineKey ? null : taglineKey));
  };

  const [innovateBgVal] = useEditable(
    'hero.tagline_1_bg',
    { src: innovateBg, alt: 'Innovate Background' },
    'image',
    'Innovate Background Image'
  );

  const [transformBgVal] = useEditable(
    'hero.tagline_2_bg',
    { src: transformBg, alt: 'Transform Background' },
    'image',
    'Transform Background Image'
  );

  const [growBgVal] = useEditable(
    'hero.tagline_3_bg',
    { src: growBg, alt: 'Grow Background' },
    'image',
    'Grow Background Image'
  );

  const innovateBgSrc = typeof innovateBgVal === 'string' ? innovateBgVal : (innovateBgVal?.src || innovateBg);
  const transformBgSrc = typeof transformBgVal === 'string' ? transformBgVal : (transformBgVal?.src || transformBg);
  const growBgSrc = typeof growBgVal === 'string' ? growBgVal : (growBgVal?.src || growBg);

  return (
    <EditableSection regionId="hero.section" label="Hero Section" className={`hero-section ${activeTagline ? 'has-bg-hover' : ''}`}>
      {/* Interactive hover/click background layers */}
      <div 
        className={`hero-hover-bg innovate-bg ${activeTagline === 'innovate' ? 'active' : ''}`}
        style={{ backgroundImage: `url(${innovateBgSrc})` }}
      />
      <div 
        className={`hero-hover-bg transform-bg ${activeTagline === 'transform' ? 'active' : ''}`}
        style={{ backgroundImage: `url(${transformBgSrc})` }}
      />
      <div 
        className={`hero-hover-bg grow-bg ${activeTagline === 'grow' ? 'active' : ''}`}
        style={{ backgroundImage: `url(${growBgSrc})` }}
      />

      <div className="hero-content">
        <div className="hero-left">
          <EditableText
            regionId="hero.title"
            label="Hero Heading"
            defaultValue={{"text":"Strategic Digital Solutions for Businesses That Want to Lead .","width":"933px"}}
            className="hero-heading"
            as="h1"
          />
          {/* Foggy spotlight effect behind the text */}
          <div className="foggy-glow"></div>
        </div>

        <div className="hero-right">
          <div className="we-help-container">
            <EditableImage
              regionId="hero.logo"
              label="Hero Symbol Logo"
              defaultValue={{"src":"/assets/hero-DqeVD-Ry.png","alt":"Triosis Symbol","offsetX":-672,"offsetY":13}}
              className="we-help-logo"
            />
            <EditableText
              regionId="hero.subtext"
              label="Hero Subtext"
              defaultValue={{"text":"We help ambitious businesses grow through innovative technology, creative marketing, and measurable digital strategies that deliver long-term business success.","align":"left","offsetX":-620,"offsetY":0,"width":"405px"}}
              className="we-help-text"
              as="p"
            />
          </div>
        </div>
      </div>

      {/* Interactive Taglines & Popups */}
      <div className="hero-taglines-wrapper">
        {activeTagline && (
          <div className={`animation-popup-card ${activeTagline}-active`}>
            {activeTagline === 'innovate' && (
              <div className="animation-content innovate-anim">
                <svg viewBox="0 0 100 100" className="anim-svg">
                  <circle cx="50" cy="50" r="40" className="ring ring-1" />
                  <circle cx="50" cy="50" r="30" className="ring ring-2" />
                  <circle cx="50" cy="50" r="20" className="ring ring-3" />
                  <circle cx="50" cy="10" r="3" className="orbit-dot dot-1" />
                  <circle cx="90" cy="50" r="3" className="orbit-dot dot-2" />
                  <circle cx="50" cy="90" r="3" className="orbit-dot dot-3" />
                  <circle cx="50" cy="50" r="8" className="core-dot" />
                </svg>
                <EditableText
                  regionId="hero.tagline_1_popup"
                  label="Innovate Popup Label"
                  defaultValue="INNOVATING FUTURE TECH"
                  className="popup-label"
                  as="div"
                />
              </div>
            )}

            {activeTagline === 'transform' && (
              <div className="animation-content transform-anim">
                <div className="morph-blobs-container">
                  <div className="morph-blob blob-1"></div>
                  <div className="morph-blob blob-2"></div>
                  <div className="morph-blob blob-3"></div>
                </div>
                <EditableText
                  regionId="hero.tagline_2_popup"
                  label="Transform Popup Label"
                  defaultValue="TRANSFORMING BUSINESSES"
                  className="popup-label"
                  as="div"
                />
              </div>
            )}

            {activeTagline === 'grow' && (
              <div className="animation-content grow-anim">
                <svg viewBox="0 0 120 120" className="anim-svg">
                  <defs>
                    <linearGradient id="grow-bar-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00ff88" />
                      <stop offset="100%" stopColor="#00b894" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  
                  <line x1="20" y1="20" x2="20" y2="100" className="grid-line" />
                  <line x1="20" y1="100" x2="100" y2="100" className="grid-line" />
                  
                  <rect x="30" y="80" width="8" height="20" className="bar bar-1" />
                  <rect x="48" y="65" width="8" height="35" className="bar bar-2" />
                  <rect x="66" y="50" width="8" height="50" className="bar bar-3" />
                  <rect x="84" y="30" width="8" height="70" className="bar bar-4" />
                  
                  <path d="M 34 80 L 52 65 L 70 50 L 88 30" className="trend-line" />
                  
                  <circle cx="34" cy="80" r="3.5" className="node node-1" />
                  <circle cx="52" cy="65" r="3.5" className="node node-2" />
                  <circle cx="70" cy="50" r="3.5" className="node node-3" />
                  <circle cx="88" cy="30" r="3.5" className="node node-4" />
                </svg>
                <EditableText
                  regionId="hero.tagline_3_popup"
                  label="Grow Popup Label"
                  defaultValue="SCALING GROWTH"
                  className="popup-label"
                  as="div"
                />
              </div>
            )}
          </div>
        )}

        <div className="hero-taglines">
          {/* Tagline 1: Innovate */}
          <div className="tagline-block">
            <span 
              className={`tagline-word innovate ${activeTagline === 'innovate' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredTagline('innovate')}
              onMouseLeave={() => setHoveredTagline(null)}
              onClick={() => handleTaglineClick('innovate')}
            >
              <EditableText
                regionId="hero.tagline_1_text"
                label="Tagline 1 Text (Innovate)"
                defaultValue="Innovate."
                as="span"
              />
            </span>
            <div className="tagline-bg-thumb-container" title="Change Innovate Background Image">
              <span className="thumb-label">BG 1:</span>
              <EditableImage
                regionId="hero.tagline_1_bg"
                label="Tagline 1 BG Image"
                defaultValue={{ src: innovateBg, alt: "Innovate Background" }}
                className="tagline-bg-thumb"
              />
            </div>
          </div>

          {/* Tagline 2: Transform */}
          <div className="tagline-block">
            <span 
              className={`tagline-word transform ${activeTagline === 'transform' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredTagline('transform')}
              onMouseLeave={() => setHoveredTagline(null)}
              onClick={() => handleTaglineClick('transform')}
            >
              <EditableText
                regionId="hero.tagline_2_text"
                label="Tagline 2 Text (Transform)"
                defaultValue="Transform."
                as="span"
              />
            </span>
            <div className="tagline-bg-thumb-container" title="Change Transform Background Image">
              <span className="thumb-label">BG 2:</span>
              <EditableImage
                regionId="hero.tagline_2_bg"
                label="Tagline 2 BG Image"
                defaultValue={{ src: transformBg, alt: "Transform Background" }}
                className="tagline-bg-thumb"
              />
            </div>
          </div>

          {/* Tagline 3: Grow */}
          <div className="tagline-block">
            <span 
              className={`tagline-word grow ${activeTagline === 'grow' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredTagline('grow')}
              onMouseLeave={() => setHoveredTagline(null)}
              onClick={() => handleTaglineClick('grow')}
            >
              <EditableText
                regionId="hero.tagline_3_text"
                label="Tagline 3 Text (Grow)"
                defaultValue="Grow."
                as="span"
              />
            </span>
            <div className="tagline-bg-thumb-container" title="Change Grow Background Image">
              <span className="thumb-label">BG 3:</span>
              <EditableImage
                regionId="hero.tagline_3_bg"
                label="Tagline 3 BG Image"
                defaultValue={{ src: growBg, alt: "Grow Background" }}
                className="tagline-bg-thumb"
              />
            </div>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}

export default Hero;
