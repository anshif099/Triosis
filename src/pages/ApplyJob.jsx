import React, { useState, useEffect } from 'react';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import './ApplyJob.css';

function ApplyJob({ position }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: position || '',
    coverLetter: ''
  });

  useEffect(() => {
    if (position) {
      setFormData((prev) => ({ ...prev, position }));
    }
  }, [position]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your application has been submitted successfully.');
    // Redirect back to careers page after submission
    window.dispatchEvent(new CustomEvent('trigger-preloader', { detail: { fast: true } }));
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'career' } }));
  };

  return (
    <div className="apply-job-page-container">
      <Preloader />
      <Header />

      <section className="apply-form-section">
        <div className="apply-form-container">
          <h1 className="apply-form-title">Apply for a Job</h1>

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

export default ApplyJob;
