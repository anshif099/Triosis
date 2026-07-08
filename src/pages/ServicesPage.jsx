import React from 'react';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import StackedTestimonials from '../components/StackedTestimonials.jsx';
import BrandLogos from '../components/BrandLogos.jsx';
import Footer from '../components/Footer.jsx';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import './ServicesPage.css';

const servicesData = [
  {
    num: '01',
    title: 'DIGITAL MARKETING',
    desc: 'Data-driven online marketing strategies designed to boost visibility, generate leads, and grow your business across all digital platforms.',
    image: img5,
    list: [
      'Targeted Ads (Meta, Google, YouTube)',
      'Lead Generation Campaigns',
      'SEO & Keyword Optimization',
      'Performance Tracking & Analytics',
      'Campaign Strategy & Planning',
      'Retargeting & Funnel Optimization'
    ]
  },
  {
    num: '02',
    title: 'SOCIAL MEDIA MANAGEMENT & CONTENT CREATION',
    desc: 'Creative content and full social media handling to build engagement, trust, and a consistent brand voice that converts followers into customers.',
    image: img6,
    list: [
      'Monthly Content Calendar',
      'Reels & Short-Form Videos',
      'Graphic Design & Templates',
      'Community Management',
      'Brand Storytelling',
      'Monthly Growth Reports'
    ]
  },
  {
    num: '03',
    title: 'WEBSITE DESIGN & DEVELOPMENT',
    desc: 'Modern, responsive, and high-performing websites built to convert visitors into customers and elevate your entire online experience.',
    image: img7,
    list: [
      'Responsive UI/UX Design',
      'WordPress & Custom Development',
      'E-commerce Solutions',
      'Landing Page Optimization',
      'Speed & SEO Optimization',
      'Maintenance & Support'
    ]
  },
  {
    num: '04',
    title: 'BRANDING & VISUAL IDENTITY',
    desc: 'Complete brand identity solutions that create memorable, powerful impressions and set your business apart in competitive markets.',
    image: img8,
    list: [
      'Logo & Visual Identity Design',
      'Brand Guidelines & Strategy',
      'Packaging Design',
      'Corporate Branding Kits',
      'Marketing Collaterals',
      'Brand Audit & Refresh'
    ]
  }
];

function ServicesPage() {
  return (
    <div className="services-page-container">
      <Preloader />
      <Header />

      {/* Services Hero Section */}
      <section className="services-page-hero">
        <div className="services-hero-glow"></div>
        <div className="services-hero-content">
          <div className="services-hero-tag-col">
            <span className="services-hero-tag">
              <span className="tag-dot"></span>
              OUR SERVICES
            </span>
          </div>
          <div className="services-hero-title-col">
            <h1 className="services-hero-title">
              SERVICES &amp; <br />CAPABILITIES<span className="cyan-dot-title">.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="services-page-list">
        <div className="services-page-inner">
          {servicesData.map((service, index) => (
            <div className="sp-service-row" key={service.num}>
              {/* Divider line */}
              <div className="sp-service-divider"></div>

              <div className="sp-service-grid">
                {/* Left col: image */}
                <div className="sp-image-col">
                  <div className="sp-image-wrapper">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="sp-service-image"
                    />
                  </div>
                </div>

                {/* Middle col: number + bullet list */}
                <div className="sp-middle-col">
                  <span className="sp-service-num">{service.num}</span>
                  <ul className="sp-service-list">
                    {service.list.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Right col: title + description + arrow */}
                <div className="sp-right-col">
                  <div className="sp-title-row">
                    <h2 className="sp-service-title">{service.title}</h2>
                    <div className="sp-arrow-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>
                  <p className="sp-service-desc">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
          {/* Bottom divider */}
          <div className="sp-service-divider"></div>
        </div>
      </section>

      {/* Testimonials - same as About Us */}
      <StackedTestimonials />

      {/* Brand Logos */}
      <BrandLogos />

      <Footer />
    </div>
  );
}

export default ServicesPage;
