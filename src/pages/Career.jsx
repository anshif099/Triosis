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

      {/* Empty page spacer for Career - content will be provided later */}
      <div className="career-content-placeholder"></div>

      <Footer />
    </div>
  );
}

export default Career;
