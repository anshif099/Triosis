import React, { useState, useEffect } from 'react';
import './Preloader.css';

function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    let loadTimer;
    let removeTimer;

    const startPreloader = (isFast = false) => {
      setIsLoaded(false);
      setShouldRender(true);
      document.body.style.overflow = 'hidden';

      // Clear any existing timers
      clearTimeout(loadTimer);
      clearTimeout(removeTimer);

      const loadDuration = isFast ? 1100 : 2200;
      const removeDuration = isFast ? 1600 : 3000;

      loadTimer = setTimeout(() => {
        setIsLoaded(true);
        document.body.style.overflow = 'auto'; // Re-enable scrolling
      }, loadDuration);

      removeTimer = setTimeout(() => {
        setShouldRender(false);
      }, removeDuration);
    };

    // Run on initial mount
    startPreloader();

    // Listen for custom trigger event
    const handleTrigger = (e) => {
      const isFast = e.detail && e.detail.fast;
      startPreloader(isFast);
    };
    window.addEventListener('trigger-preloader', handleTrigger);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(removeTimer);
      window.removeEventListener('trigger-preloader', handleTrigger);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`preloader-overlay ${isLoaded ? 'fade-out' : ''}`}>
      <div className="preloader-text-wrap">
        <span className="preloader-letter">T</span>
        <span className="preloader-letter">R</span>
        <span className="preloader-letter">I</span>
        <span className="preloader-letter">O</span>
        <span className="preloader-letter">S</span>
        <span className="preloader-letter">I</span>
        <span className="preloader-letter">S</span>
      </div>
    </div>
  );
}

export default Preloader;
