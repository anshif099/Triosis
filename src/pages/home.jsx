import React from 'react';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import Gallery from '../components/Gallery.jsx';
import Services from '../components/Services.jsx';

function Home() {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <Gallery />
      <Services />
    </div>
  );
}

export default Home;
