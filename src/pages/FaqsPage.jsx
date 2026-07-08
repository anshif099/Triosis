import React, { useState } from 'react';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import './FaqsPage.css';

const faqData = [
  {
    question: 'What services does Triosis provide?',
    answer: 'Triosis offers end-to-end marketing solutions including digital marketing, social media management, branding, SEO, content creation, performance marketing, and paid advertising—designed to help brands grow across every digital touchpoint.'
  },
  {
    question: 'How does Triosis ensure results for clients?',
    answer: 'We focus on data-backed strategies, continuous split-testing, clear performance reporting, and conversion funnel optimization tailored to your industry benchmarks and business goals.'
  },
  {
    question: 'Who can benefit from Triosis’s services?',
    answer: 'Startups, established companies, personal brands, e-commerce businesses, academies, and global brands—anyone looking to scale visibility, generate high-quality leads, or establish dominant digital authority.'
  },
  {
    question: 'Does Triosis work with international clients?',
    answer: 'Yes! We proudly serve clients across 25+ countries, designing localized marketing campaigns and web architectures that scale effectively in global markets.'
  },
  {
    question: 'How soon can I expect results after starting a campaign?',
    answer: 'While long-term strategies like SEO and organic branding take 3-6 months to build momentum, paid ad campaigns (Meta, Google, YouTube) and lead generation funnels typically yield measurable traffic and conversions within the first few weeks.'
  }
];

function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faqs-page-container">
      <Preloader />
      <Header />

      {/* FAQs Hero Section */}
      <section className="faqs-hero">
        <div className="faqs-hero-glow"></div>
        <div className="faqs-hero-container">
          <div className="faqs-hero-left">
            <span className="faqs-hero-tag">
              <span className="tag-dot"></span>
              FAQS
            </span>
          </div>
          <div className="faqs-hero-right">
            <h1 className="faqs-hero-title">
              FREQUENTLY <br />QUESTIONS<span className="cyan-dot-title">.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Accordion List Section */}
      <section className="faqs-accordion-section">
        <div className="faqs-accordion-container">
          <div className="faqs-list">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  className={`faq-item-card ${isOpen ? 'active' : ''}`} 
                  key={index}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="faq-question-row">
                    <h3 className="faq-question-text">{faq.question}</h3>
                    <div className="faq-toggle-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="faq-answer-box">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default FaqsPage;
