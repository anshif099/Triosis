import React from 'react';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import './Career.css';

function Career() {
  return (
    <div className="career-page-container">
      <Preloader />
      <Header />

      {/* Career Hero / Title Section */}
      <section className="career-hero-section">
        <div className="career-hero-glow"></div>
        <div className="career-hero-content">
          <h1 className="career-hero-title">
            CAREERS<span className="career-title-dot">.</span>
          </h1>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="career-openings-section">
        <div className="career-openings-container">
          <h2 className="openings-section-title">Current Job Openings</h2>

          <div className="job-cards-grid">
            {/* Card 1 */}
            <div className="job-card">
              <h3 className="job-title">Social Media Manager (Female Preferred)</h3>
              
              <div className="job-meta-info">
                <p className="job-meta-row">
                  <span className="meta-bold">Location:</span> Kizhisseri, Malappuram
                </p>
                <p className="job-meta-row">
                  <span className="meta-bold">Type:</span> Full-time
                </p>
              </div>

              <p className="job-bullets">
                - Content planning & posting - Trend awareness - Good communication & engagement skills
              </p>

              <button className="job-apply-btn">Apply Now</button>
            </div>

            {/* Card 2 */}
            <div className="job-card">
              <h3 className="job-title">Creative Designer</h3>
              
              <div className="job-meta-info">
                <p className="job-meta-row">
                  <span className="meta-bold">Location:</span> Kizhisseri, Malappuram
                </p>
                <p className="job-meta-row">
                  <span className="meta-bold">Type:</span> Full-time
                </p>
              </div>

              <p className="job-bullets">
                - Strong design sense - Proficient in Adobe tools / Canva - Creative, fast, and deadline-oriented
              </p>

              <button className="job-apply-btn">Apply Now</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Career;
