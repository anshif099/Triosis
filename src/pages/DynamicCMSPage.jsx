import React from 'react';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { EditableText, EditableImage, EditableSection } from '@anshif.rainhopes/reactcms-sdk';
import heroLogo from '../assets/hero.png';
import digitalSuccessImg from '../assets/digital_success.png';
import './AboutUs.css'; // Inherits site CSS rules

function formatTitle(slug) {
  if (!slug || slug === 'home') return 'Page';
  return slug
    .replace(/^\/+|\/+$/g, '')
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function DynamicCMSPage({ pageSlug }) {
  const displayTitle = formatTitle(pageSlug);
  const slugKey = pageSlug ? pageSlug.replace(/[^a-zA-Z0-9_-]/g, '-') : 'page';

  return (
    <div className="dynamic-cms-page" style={{ background: '#0a0a0a', color: '#ffffff', minHeight: '100vh' }}>
      <Preloader />
      <Header />

      {/* Main Page Visual Hero Header */}
      <EditableSection 
        regionId={`${slugKey}.hero`} 
        label={`${displayTitle} Hero Section`} 
        className="about-hero"
        style={{ paddingTop: '160px', paddingBottom: '80px', textAlign: 'center', position: 'relative', background: '#0a0a0a' }}
      >
        <div className="about-hero-content" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
          <EditableText
            regionId={`${slugKey}.title`}
            label="Page Main Title"
            defaultValue={displayTitle}
            className="about-heading"
            as="h1"
            style={{ fontSize: '3.2rem', fontWeight: 800, marginBottom: '20px', color: '#ff4d4d', lineHeight: 1.15 }}
          />
          <EditableText
            regionId={`${slugKey}.subtext`}
            label="Page Hero Subtitle"
            defaultValue="Explore strategic digital solutions, tools, and courses tailored for modern business innovation and growth."
            className="about-description"
            as="p"
            style={{ fontSize: '1.25rem', color: '#aaaaaa', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto 40px auto' }}
          />

          <div style={{ margin: '0 auto', maxWidth: '720px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #222222', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
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
        style={{ padding: '28px 0', background: 'linear-gradient(90deg, #111111 0%, #1c1c1c 50%, #111111 100%)', borderTop: '1px solid #222222', borderBottom: '1px solid #222222', overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', padding: '0 20px' }}>
          <div style={{ display: 'inline-flex', itemsCenter: 'center', gap: '10px', background: 'rgba(255,77,77,0.12)', border: '1px solid rgba(255,77,77,0.3)', padding: '6px 14px', borderRadius: '30px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ff4d4d', letterSpacing: '1px' }}>
              📊 CLIENT SUCCESS STATISTICS
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', itemsCenter: 'center', gap: '8px', fontSize: '1rem', color: '#ffffff', fontWeight: 600 }}>
              <span>🚀</span>
              <EditableText
                regionId={`${slugKey}.stat1_text`}
                label="Stat 1 Text"
                defaultValue="500+ Successful Ad Campaigns"
              />
            </div>
            <span style={{ color: '#444' }}>•</span>
            <div style={{ display: 'flex', itemsCenter: 'center', gap: '8px', fontSize: '1rem', color: '#ffffff', fontWeight: 600 }}>
              <span>⭐</span>
              <EditableText
                regionId={`${slugKey}.stat2_text`}
                label="Stat 2 Text"
                defaultValue="98% Client Satisfaction Rate"
              />
            </div>
            <span style={{ color: '#444' }}>•</span>
            <div style={{ display: 'flex', itemsCenter: 'center', gap: '8px', fontSize: '1rem', color: '#ffffff', fontWeight: 600 }}>
              <span>💥</span>
              <EditableText
                regionId={`${slugKey}.stat3_text`}
                label="Stat 3 Text"
                defaultValue="50M+ Ad Impressions"
              />
            </div>
            <span style={{ color: '#444' }}>•</span>
            <div style={{ display: 'flex', itemsCenter: 'center', gap: '8px', fontSize: '1rem', color: '#ffffff', fontWeight: 600 }}>
              <span>🏆</span>
              <EditableText
                regionId={`${slugKey}.stat4_text`}
                label="Stat 4 Text"
                defaultValue="250+ Global Brands"
              />
            </div>
          </div>
        </div>
      </EditableSection>

      {/* Page Content & Feature Grid Section */}
      <EditableSection 
        regionId={`${slugKey}.body_section`} 
        label="Main Content & Details" 
        style={{ padding: '90px 24px', background: '#0d0d0d', borderTop: '1px solid #1a1a1a' }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <EditableText
              regionId={`${slugKey}.heading`}
              label="Section Heading"
              defaultValue={`About ${displayTitle}`}
              as="h2"
              style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '16px', color: '#ffffff' }}
            />
            <EditableText
              regionId={`${slugKey}.description`}
              label="Section Detailed Description"
              defaultValue="We deliver innovative technology, creative marketing, and measurable digital strategies to help ambitious businesses grow and achieve long-term success."
              as="p"
              style={{ fontSize: '1.15rem', color: '#888888', lineHeight: 1.8, maxWidth: '850px', margin: '0 auto' }}
            />
          </div>

          {/* 3 Feature Highlights Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ background: '#141414', border: '1px solid #222222', padding: '32px', borderRadius: '16px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#ff4d4d' }}>⚡ High Performance</div>
              <EditableText
                regionId={`${slugKey}.feature1_title`}
                label="Feature 1 Title"
                defaultValue="Strategic Planning & Execution"
                as="h4"
                style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', color: '#ffffff' }}
              />
              <EditableText
                regionId={`${slugKey}.feature1_desc`}
                label="Feature 1 Description"
                defaultValue="Tailored strategies that align with your core business objectives to maximize ROI and digital efficiency."
                as="p"
                style={{ fontSize: '0.95rem', color: '#aaaaaa', lineHeight: 1.6 }}
              />
            </div>

            <div style={{ background: '#141414', border: '1px solid #222222', padding: '32px', borderRadius: '16px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#ff4d4d' }}>🎯 Targeted Outreach</div>
              <EditableText
                regionId={`${slugKey}.feature2_title`}
                label="Feature 2 Title"
                defaultValue="Data-Driven Optimization"
                as="h4"
                style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', color: '#ffffff' }}
              />
              <EditableText
                regionId={`${slugKey}.feature2_desc`}
                label="Feature 2 Description"
                defaultValue="Leveraging advanced analytics and AI-powered insights to refine your market position continuously."
                as="p"
                style={{ fontSize: '0.95rem', color: '#aaaaaa', lineHeight: 1.6 }}
              />
            </div>

            <div style={{ background: '#141414', border: '1px solid #222222', padding: '32px', borderRadius: '16px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#ff4d4d' }}>🚀 Scalable Growth</div>
              <EditableText
                regionId={`${slugKey}.feature3_title`}
                label="Feature 3 Title"
                defaultValue="End-to-End Implementation"
                as="h4"
                style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', color: '#ffffff' }}
              />
              <EditableText
                regionId={`${slugKey}.feature3_desc`}
                label="Feature 3 Description"
                defaultValue="From concept to launch, our team ensures seamless execution and continuous support at scale."
                as="p"
                style={{ fontSize: '0.95rem', color: '#aaaaaa', lineHeight: 1.6 }}
              />
            </div>
          </div>
        </div>
      </EditableSection>

      {/* Visual Call to Action Section */}
      <EditableSection 
        regionId={`${slugKey}.cta_section`} 
        label="CTA Section" 
        style={{ padding: '80px 24px', textAlign: 'center', background: '#111111', borderTop: '1px solid #1f1f1f' }}
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
            style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '16px', color: '#ffffff' }}
          />
          <EditableText
            regionId={`${slugKey}.cta_subtext`}
            label="CTA Subtext"
            defaultValue="Get in touch with our expert team today to schedule a consultation."
            as="p"
            style={{ fontSize: '1.1rem', color: '#aaaaaa', marginBottom: '32px' }}
          />
          <button 
            style={{ padding: '14px 36px', background: '#ff4d4d', color: '#ffffff', border: 'none', borderRadius: '30px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(255,77,77,0.3)' }}
          >
            <EditableText
              regionId={`${slugKey}.cta_button`}
              label="CTA Button Text"
              defaultValue="Book Free Consultation"
            />
          </button>
        </div>
      </EditableSection>

      {/* Why Choose Us & Statistics Section directly below CTA */}
      <EditableSection
        regionId={`${slugKey}.why_choose_us_section`}
        label="Why Choose Us Section"
        style={{ padding: '100px 24px', background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ color: '#ff4d4d', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
              🌟 WHY CHOOSE US
            </div>
            <EditableText
              regionId={`${slugKey}.why_choose_us_title`}
              label="Why Choose Us Title"
              defaultValue="Why Industry Leaders Trust Triosis Digital"
              as="h2"
              style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}
            />
            <EditableText
              regionId={`${slugKey}.why_choose_us_subtext`}
              label="Why Choose Us Subtitle"
              defaultValue="Delivering high-ROI campaigns, creative ad strategies, and dedicated account support."
              as="p"
              style={{ fontSize: '1.15rem', color: '#888888', maxWidth: '750px', margin: '0 auto' }}
            />
          </div>

          {/* 6 Premium Feature Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '70px' }}>
            <div style={{ background: '#121212', border: '1px solid #222222', padding: '36px', borderRadius: '20px', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
              <div style={{ fontSize: '2rem', marginBottom: '20px' }}>🏆</div>
              <EditableText
                regionId={`${slugKey}.card1_title`}
                label="Card 1 Title"
                defaultValue="Proven Advertising Results"
                as="h4"
                style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}
              />
              <EditableText
                regionId={`${slugKey}.card1_desc`}
                label="Card 1 Description"
                defaultValue="Tailored strategies that align with your business goals to maximize ROI and digital efficiency."
                as="p"
                style={{ fontSize: '0.95rem', color: '#999999', lineHeight: 1.6 }}
              />
            </div>

            <div style={{ background: '#121212', border: '1px solid #222222', padding: '36px', borderRadius: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '20px' }}>🎨</div>
              <EditableText
                regionId={`${slugKey}.card2_title`}
                label="Card 2 Title"
                defaultValue="Creative Campaigns"
                as="h4"
                style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}
              />
              <EditableText
                regionId={`${slugKey}.card2_desc`}
                label="Card 2 Description"
                defaultValue="Scroll-stopping ad designs, persuasive copywriting, and high-converting visual assets."
                as="p"
                style={{ fontSize: '0.95rem', color: '#999999', lineHeight: 1.6 }}
              />
            </div>

            <div style={{ background: '#121212', border: '1px solid #222222', padding: '36px', borderRadius: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '20px' }}>📊</div>
              <EditableText
                regionId={`${slugKey}.card3_title`}
                label="Card 3 Title"
                defaultValue="Data-Driven Strategy"
                as="h4"
                style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}
              />
              <EditableText
                regionId={`${slugKey}.card3_desc`}
                label="Card 3 Description"
                defaultValue="Continuous optimization powered by real-time campaign analytics and deep audience targeting."
                as="p"
                style={{ fontSize: '0.95rem', color: '#999999', lineHeight: 1.6 }}
              />
            </div>

            <div style={{ background: '#121212', border: '1px solid #222222', padding: '36px', borderRadius: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '20px' }}>🎯</div>
              <EditableText
                regionId={`${slugKey}.card4_title`}
                label="Card 4 Title"
                defaultValue="Google & Meta Ads Experts"
                as="h4"
                style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}
              />
              <EditableText
                regionId={`${slugKey}.card4_desc`}
                label="Card 4 Description"
                defaultValue="Certified Specialists managing Google Search, Meta Instagram/Facebook, and display campaigns."
                as="p"
                style={{ fontSize: '0.95rem', color: '#999999', lineHeight: 1.6 }}
              />
            </div>

            <div style={{ background: '#121212', border: '1px solid #222222', padding: '36px', borderRadius: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '20px' }}>📈</div>
              <EditableText
                regionId={`${slugKey}.card5_title`}
                label="Card 5 Title"
                defaultValue="Transparent Reporting"
                as="h4"
                style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}
              />
              <EditableText
                regionId={`${slugKey}.card5_desc`}
                label="Card 5 Description"
                defaultValue="Clear performance metrics, live dashboard access, and actionable weekly reporting."
                as="p"
                style={{ fontSize: '0.95rem', color: '#999999', lineHeight: 1.6 }}
              />
            </div>

            <div style={{ background: '#121212', border: '1px solid #222222', padding: '36px', borderRadius: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '20px' }}>👥</div>
              <EditableText
                regionId={`${slugKey}.card6_title`}
                label="Card 6 Title"
                defaultValue="Dedicated Account Managers"
                as="h4"
                style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}
              />
              <EditableText
                regionId={`${slugKey}.card6_desc`}
                label="Card 6 Description"
                defaultValue="Personalized support, strategic growth calls, and dedicated campaign specialists."
                as="p"
                style={{ fontSize: '0.95rem', color: '#999999', lineHeight: 1.6 }}
              />
            </div>
          </div>

          {/* Horizontal Statistics Section */}
          <div style={{ background: 'linear-gradient(135deg, #181818 0%, #111111 100%)', border: '1px solid #262626', padding: '40px 30px', borderRadius: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ff4d4d', marginBottom: '6px' }}>500+</div>
              <div style={{ fontSize: '0.9rem', color: '#aaaaaa', fontWeight: 600 }}>Successful Campaigns</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ff4d4d', marginBottom: '6px' }}>98%</div>
              <div style={{ fontSize: '0.9rem', color: '#aaaaaa', fontWeight: 600 }}>Client Satisfaction</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ff4d4d', marginBottom: '6px' }}>50M+</div>
              <div style={{ fontSize: '0.9rem', color: '#aaaaaa', fontWeight: 600 }}>Ad Impressions</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ff4d4d', marginBottom: '6px' }}>250+</div>
              <div style={{ fontSize: '0.9rem', color: '#aaaaaa', fontWeight: 600 }}>Happy Clients</div>
            </div>
          </div>
        </div>
      </EditableSection>

      <Footer />
    </div>
  );
}

export default DynamicCMSPage;
