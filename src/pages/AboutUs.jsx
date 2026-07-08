import React from 'react';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-page-container">
      <Preloader />
      <Header />

      {/* Empty page spacer - content will be provided later */}
      <div className="about-content-placeholder"></div>

      <Footer />
    </div>
  );
}

export default AboutUs;
