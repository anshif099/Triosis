import React, { useState } from 'react';
import { EditableText, EditableSection } from '@anshif.rainhopes/reactcms-sdk';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import './Career.css';

function Career() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: ''
  });

  const handleApplyClick = (jobTitle) => {
    // 1. Pre-fill position field
    setFormData((prev) => ({ ...prev, position: jobTitle }));
    
    // 2. Scroll smoothly to form section
    const formElement = document.getElementById('apply-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your application has been submitted successfully.');
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      coverLetter: ''
    });
  };

  return (
    <div className="career-page-container">
      <Preloader />
      <Header />

      {/* Career Hero / Title Section */}
      <EditableSection regionId="career.hero" label="Career Hero" className="career-hero-section">
        <div className="career-hero-glow"></div>
        <div className="career-hero-content">
          <EditableText
            regionId="career.hero_title"
            label="Careers Hero Title"
            defaultValue="CAREERS ."
            className="career-hero-title"
            as="h1"
          />
        </div>
      </EditableSection>

      {/* Job Openings Section */}
      <section className="career-openings-section">
        <div className="career-openings-container">
          <EditableText
            regionId="career.openings_title"
            label="Current Job Openings Title"
            defaultValue="Current Job Openings"
            className="openings-section-title"
            as="h2"
          />

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

              <button 
                className="job-apply-btn"
                onClick={() => handleApplyClick('Social Media Manager (Female Preferred)')}
              >
                Apply Now
              </button>
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

              <button 
                className="job-apply-btn"
                onClick={() => handleApplyClick('Creative Designer')}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Job Application Form Section */}
      <section className="apply-form-section" id="apply-form-section">
        <div className="apply-form-container">
          <h2 className="apply-form-title">Apply for a Job</h2>

          <form className="job-application-form" onSubmit={handleSubmit}>
            
            {/* Row 1: Name and Email */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Row 2: Phone and Position */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="position" className="form-label">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  className="form-input"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Row 3: Cover Letter */}
            <div className="form-group full-width">
              <label htmlFor="coverLetter" className="form-label">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                className="form-textarea"
                rows="6"
                value={formData.coverLetter}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Row 4: Resume File Upload */}
            <div className="form-group full-width file-upload-group">
              <label className="form-label">Resume (PDF/DOC)</label>
              <input
                type="file"
                className="form-file-input"
                accept=".pdf,.doc,.docx"
                required
              />
            </div>

            {/* Row 5: Submit Button */}
            <div className="form-submit-row">
              <button type="submit" className="form-submit-btn">Submit Application</button>
            </div>

          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Career;
