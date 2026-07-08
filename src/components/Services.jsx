import React from 'react';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import './Services.css';

const servicesData = [
  {
    num: '01',
    title: 'Digital Marketing',
    desc: 'Performance-driven digital marketing strategies that increase visibility, generate qualified leads, and maximize your return on investment across every online channel.',
    image: img5,
    list: [
      'Meta & Google Ads',
      'Lead Generation Campaigns',
      'SEO & Local SEO',
      'Google Business Optimization',
      'Marketing Automation',
      'Analytics & Reporting'
    ]
  },
  {
    num: '02',
    title: 'Social Media Management & Creative Content',
    desc: 'Creative storytelling and consistent brand communication designed to increase engagement, strengthen credibility, and accelerate business growth.',
    image: img6,
    list: [
      'Monthly Content Calendar',
      'Reels & Short Videos',
      'Graphic Design',
      'Social Media Management',
      'Community Engagement',
      'Monthly Reports'
    ]
  },
  {
    num: '03',
    title: 'Website Design & Development',
    desc: 'Fast, secure, responsive websites engineered to convert visitors into customers while delivering exceptional user experiences.',
    image: img7,
    list: [
      'Responsive Website Design',
      'WordPress Development',
      'E-commerce Solutions',
      'UI/UX Design',
      'Landing Pages',
      'Website Maintenance'
    ]
  },
  {
    num: '04',
    title: 'Branding & Creative Design',
    desc: 'Complete branding solutions that create memorable identities and help businesses stand apart in competitive markets.',
    image: img8,
    list: [
      'Logo Design',
      'Brand Identity',
      'Brand Guidelines',
      'Packaging Design',
      'Corporate Branding',
      'Marketing Collaterals'
    ]
  }
];

function Services() {
  return (
    <section className="services-section">
      <div className="services-header">
        <h2 className="services-title">
          Let's Make <span className="text-gray">Something</span><br />
          <span className="text-gray">Extraordinary</span> Together
        </h2>
        <div className="services-separator"></div>
      </div>

      <div className="services-container">
        {servicesData.map((service) => (
          <div className="services-grid" key={service.num}>
            <div className="services-left">
              <span className="services-num">{service.num}</span>
              <h3>{service.title}</h3>
              <p className="services-desc">{service.desc}</p>
            </div>

            <div className="services-center">
              <img 
                src={service.image} 
                alt={service.title} 
                className="services-image" 
              />
            </div>

            <div className="services-right">
              <ul className="services-list">
                {service.list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
