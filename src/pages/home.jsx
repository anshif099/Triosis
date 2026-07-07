import React from 'react';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import Gallery from '../components/Gallery.jsx';
import Services from '../components/Services.jsx';
import RecentProjects from '../components/RecentProjects.jsx';
import Testimonials from '../components/Testimonials.jsx';
import WhoWeAre from '../components/WhoWeAre.jsx';
import BrandLogos from '../components/BrandLogos.jsx';
import Team from '../components/Team.jsx';
import Journal from '../components/Journal.jsx';
import Footer from '../components/Footer.jsx';

function Home() {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <Gallery />
      <Services />
      <RecentProjects />
      <Testimonials />
      <WhoWeAre />
      <BrandLogos />
      <Team />
      <Journal />
      <Footer />
    </div>
  );
}

export default Home;
