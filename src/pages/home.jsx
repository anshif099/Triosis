import React from 'react';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import Gallery from '../components/Gallery.jsx';

function Home() {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <Gallery />
    </div>
  );
}

export default Home;
