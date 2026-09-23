import React from 'react';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { EditableText, EditableImage, EditableSection } from '@anshif.rainhopes/reactcms-sdk';
import heroLogo from '../assets/hero.png';
import digitalSuccessImg from '../assets/digital_success.png';
import './AboutUs.css'; // Inherits site CSS rules
import './DynamicCMSPage.css';

function formatTitle(slug) {
  if (!slug || slug === 'home') return 'Page';
  return slug
    .replace(/^\/+|\/+$/g, '')
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const premiumCards = [
  ['🏆','Proven Advertising Results','Tailored strategies that align with your business goals to maximize ROI and digital efficiency.'],
  ['🎨','Creative Campaigns','Scroll-stopping ad designs, persuasive copywriting, and high-converting visual assets.'],
  ['📊','Data-Driven Strategy','Continuous optimization powered by real-time campaign analytics and deep audience targeting.'],
  ['🎯','Google & Meta Ads Experts','Certified Specialists managing Google Search, Meta Instagram/Facebook, and display campaigns.'],
  ['📈','Transparent Reporting','Clear performance metrics, live dashboard access, and actionable weekly reporting.'],
  ['👥','Dedicated Account Managers','Personalized support, strategic growth calls, and dedicated campaign specialists.'],
];
const metrics = [['500+','Successful Campaigns'],['98%','Client Satisfaction'],['50M+','Ad Impressions'],['250+','Happy Clients']];

const featureCards = [
  ['⚡ High Performance','Strategic Planning & Execution','Tailored strategies that align with your core business objectives to maximize ROI and digital efficiency.'],
  ['🎯 Targeted Outreach','Data-Driven Optimization','Leveraging advanced analytics and AI-powered insights to refine your market position continuously.'],
  ['🚀 Scalable Growth','End-to-End Implementation','From concept to launch, our team ensures seamless execution and continuous support at scale.'],
];
const carouselStats = [
  ['🚀','500+ Successful Ad Campaigns'],['⭐','98% Client Satisfaction Rate'],['💥','50M+ Ad Impressions'],['🏆','250+ Global Brands'],
];

export function DynamicCMSPage({ pageSlug }) {
  const displayTitle = formatTitle(pageSlug);
  const slugKey = pageSlug ? pageSlug.replace(/[^a-zA-Z0-9_-]/g, '-') : 'page';

  return (
    <div className="dynamic-cms-page">
      <Preloader />
      <Header />

      {/* Main Page Visual Hero Header */}
      <EditableSection 
        regionId={`${slugKey}.hero`} 
        label={`${displayTitle} Hero Section`} 
        className="about-hero"
        style={{ paddingTop: '120px', paddingBottom: '80px', textAlign: 'center', position: 'relative', background: 'var(--section-bg)' }}
      >
        <div className="about-hero-content" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
          <EditableText
            regionId={`${slugKey}.title`}
            label="Page Main Title"
            defaultValue={displayTitle}
            className="about-heading"
            as="h1"
            style={{ fontSize: '3.2rem', fontWeight: 800, marginBottom: '20px', color: 'var(--primary)', lineHeight: 1.15 }}
          />
          <EditableText
            regionId={`${slugKey}.subtext`}
            label="Page Hero Subtitle"
            defaultValue="Explore strategic digital solutions, tools, and courses tailored for modern business innovation and growth."
            className="about-description"
            as="p"
            style={{ fontSize: '1.25rem', color: 'var(--text)', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto 40px auto' }}
          />

          <div className="dynamic-cms-hero-image-frame" style={{ margin: '0 auto', maxWidth: '720px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--section-border)', boxShadow: '0 20px 50px rgba(15,23,42,0.12)' }}>
            <EditableImage
              regionId={`${slugKey}.hero_image`}
              label="Hero Visual Image"
              defaultValue={{ src: digitalSuccessImg, alt: displayTitle }}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </EditableSection>

      {/* Client Success Statistics Moving Carousel Section */}
      <EditableSection
        regionId={`${slugKey}.stats_carousel_section`}
        label="Client Success Statistics Moving Carousel"
        style={{ padding: '28px 0', background: '#ffffff', borderTop: '1px solid var(--section-border)', borderBottom: '1px solid var(--section-border)', overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', padding: '0 20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,87,87,0.12)', border: '1px solid rgba(255,87,87,0.3)', padding: '6px 14px', borderRadius: '30px' }}>
            <EditableText regionId={`${slugKey}.stats_badge`} label="Statistics Badge" defaultValue="📊 CLIENT SUCCESS STATISTICS" as="span" style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px' }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'center', justifyContent: 'center' }}>
            {carouselStats.map(([icon, text], index) => (
              <React.Fragment key={index}>
                {index > 0 && <span aria-hidden="true" style={{ color: '#444' }}>•</span>}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', color: 'var(--text-h)', fontWeight: 600 }}>
                  <EditableText regionId={`${slugKey}.stat${index + 1}_icon`} label={`Stat ${index + 1} Icon`} defaultValue={icon} />
                  <EditableText regionId={`${slugKey}.stat${index + 1}_text`} label={`Stat ${index + 1} Text`} defaultValue={text} />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </EditableSection>

      {/* Page Content & Feature Grid Section */}
      <EditableSection 
        regionId={`${slugKey}.body_section`} 
        label="Main Content & Details" 
        style={{ padding: '90px 24px', background: 'var(--section-bg)', borderTop: '1px solid var(--section-border)' }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <EditableText
              regionId={`${slugKey}.heading`}
              label="Section Heading"
              defaultValue={`About ${displayTitle}`}
              as="h2"
              style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '16px', color: 'var(--primary)' }}
            />
            <EditableText
              regionId={`${slugKey}.description`}
              label="Section Detailed Description"
              defaultValue="We deliver innovative technology, creative marketing, and measurable digital strategies to help ambitious businesses grow and achieve long-term success."
              as="p"
              style={{ fontSize: '1.15rem', color: 'var(--text)', lineHeight: 1.8, maxWidth: '850px', margin: '0 auto' }}
            />
          </div>

          {/* 3 Feature Highlights Grid */}
          <div className="dynamic-cms-card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {featureCards.map(([icon, title, description], index) => (
              <EditableSection key={index} as="div" regionId={`${slugKey}.feature${index + 1}_section`} label={`Feature ${index + 1} Card`} className="dynamic-cms-card" style={{ background: '#ffffff', border: '1px solid var(--section-border)', padding: '32px', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
                <EditableText regionId={`${slugKey}.feature${index + 1}_icon`} label={`Feature ${index + 1} Icon and Label`} defaultValue={icon} as="div" style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--primary)' }} />
                <div data-cms-card-title><EditableText regionId={`${slugKey}.feature${index + 1}_title`} label={`Feature ${index + 1} Title`} defaultValue={title} as="h4" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-h)' }} /></div>
                <div data-cms-card-description><EditableText regionId={`${slugKey}.feature${index + 1}_desc`} label={`Feature ${index + 1} Description`} defaultValue={description} as="p" style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.6 }} /></div>
              </EditableSection>
            ))}
          </div>
        </div>
      </EditableSection>

      {/* Visual Call to Action Section */}
      <EditableSection 
        regionId={`${slugKey}.cta_section`} 
        label="CTA Section" 
        style={{ padding: '80px 24px', textAlign: 'center', background: '#ffffff', borderTop: '1px solid var(--section-border)' }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <EditableImage
            regionId={`${slugKey}.cta_logo`}
            label="CTA Logo Symbol"
            defaultValue={{ src: heroLogo, alt: "Triosis Symbol" }}
            style={{ width: '60px', height: 'auto', margin: '0 auto 20px auto', display: 'block' }}
          />
          <EditableText
            regionId={`${slugKey}.cta_title`}
            label="CTA Title"
            defaultValue={`Ready to transform your business with ${displayTitle}?`}
            as="h3"
            style={{ fontSize: '2.2rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '16px', color: 'var(--primary)' }}
          />
          <EditableText
            regionId={`${slugKey}.cta_subtext`}
            label="CTA Subtext"
            defaultValue="Get in touch with our expert team today to schedule a consultation."
            as="p"
            style={{ fontSize: '1.1rem', color: 'var(--text)', marginBottom: '32px' }}
          />
          <EditableSection
            as="button"
            regionId={`${slugKey}.cta_button_style`}
            label="CTA Button"
            style={{ padding: '14px 36px', background: 'var(--primary)', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(255,87,87,0.22)' }}
          >
            <EditableText
              regionId={`${slugKey}.cta_button`}
              label="CTA Button Text"
              defaultValue="Book Free Consultation"
            />
          </EditableSection>
        </div>
      </EditableSection>

      {/* Why Choose Us & Statistics Section directly below CTA */}
      <EditableSection
        regionId={`${slugKey}.why_choose_us_section`}
        label="Why Choose Us Section"
        style={{ padding: '100px 24px', background: 'var(--section-bg)', borderTop: '1px solid var(--section-border)' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <EditableText regionId={`${slugKey}.why_choose_us_badge`} label="Why Choose Us Badge" defaultValue="🌟 WHY CHOOSE US" as="div" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }} />
            <EditableText
              regionId={`${slugKey}.why_choose_us_title`}
              label="Why Choose Us Title"
              defaultValue="Why Industry Leaders Trust Triosis Digital"
              as="h2"
              style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '16px' }}
            />
            <EditableText
              regionId={`${slugKey}.why_choose_us_subtext`}
              label="Why Choose Us Subtitle"
              defaultValue="Delivering high-ROI campaigns, creative ad strategies, and dedicated account support."
              as="p"
              style={{ fontSize: '1.15rem', color: 'var(--text)', maxWidth: '750px', margin: '0 auto' }}
            />
          </div>

          {/* 6 Premium Feature Cards Grid */}
          <div className="dynamic-cms-card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '70px' }}>
            {premiumCards.map(([icon, title, description], index) => (
              <EditableSection key={index} as="div" regionId={`${slugKey}.card${index + 1}_section`} label={`Card ${index + 1}`} className="dynamic-cms-card" style={{ background: '#ffffff', border: '1px solid var(--section-border)', padding: '36px', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
                <EditableText regionId={`${slugKey}.card${index + 1}_icon`} label={`Card ${index + 1} Icon`} defaultValue={icon} as="div" style={{ fontSize: '2rem', marginBottom: '20px' }} />
                <div data-cms-card-title><EditableText regionId={`${slugKey}.card${index + 1}_title`} label={`Card ${index + 1} Title`} defaultValue={title} as="h4" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-h)', marginBottom: '12px' }} /></div>
                <div data-cms-card-description><EditableText regionId={`${slugKey}.card${index + 1}_desc`} label={`Card ${index + 1} Description`} defaultValue={description} as="p" style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.6 }} /></div>
              </EditableSection>
            ))}
          </div>

          {/* Horizontal Statistics Section */}
          <div style={{ background: '#ffffff', border: '1px solid var(--section-border)', padding: '40px 30px', borderRadius: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
            {metrics.map(([value, label], index) => (
              <div key={index} className="dynamic-cms-metric">
                <EditableText regionId={`${slugKey}.metric${index + 1}_value`} label={`Metric ${index + 1} Value`} defaultValue={value} as="div" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '6px' }} />
                <EditableText regionId={`${slugKey}.metric${index + 1}_label`} label={`Metric ${index + 1} Label`} defaultValue={label} as="div" style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 600 }} />
              </div>
            ))}
          </div>
        </div>
      </EditableSection>

      <Footer />
    </div>
  );
}

export default DynamicCMSPage;
