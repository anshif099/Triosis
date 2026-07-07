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
    desc: 'Data-driven online marketing strategies designed to boost visibility, generate leads, and grow your business across all digital platforms.',
    image: img5,
    list: [
      'Targeted ads (Meta, Google, YouTube)',
      'Lead generation campaigns',
      'SEO & keyword optimization',
      'Performance tracking & analytics',
      'Campaign strategy & planning',
      'Retargeting & funnel optimization'
    ]
  },
  {
    num: '02',
    title: 'Social Media Management & Content Creation',
    desc: 'Creative, consistent, and goal-focused content with full social media handling to build engagement, trust, and a strong brand presence.',
    image: img6,
    list: [
      'Monthly content planning',
      'Creative posters, reels & motion graphics',
      'Social media page management',
      'Audience engagement & community handling',
      'Brand tone & visual consistency',
      'Monthly performance reports'
    ]
  },
  {
    num: '03',
    title: 'Web Design & Development',
    desc: 'Modern, responsive, and high-performing websites built to convert visitors into customers and elevate your online experience.',
    image: img7,
    list: [
      'Modern, responsive website design',
      'SEO-friendly development',
      'UI/UX-focused layouts',
      'Fast-loading performance',
      'E-commerce & landing page setup',
      'Website maintenance & updates'
    ]
  },
  {
    num: '04',
    title: 'Branding & Visual Identity',
    desc: "Professional brand identity development including logos, color palettes, and guidelines that communicate your brand's personality and story.",
    image: img8,
    list: [
      'Logo design (multiple concepts)',
      'Brand color palette & typography',
      'Complete brand guideline',
      'Packaging & marketing collateral',
      'Brand strategy & positioning',
      'Consistent visual identity system'
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
