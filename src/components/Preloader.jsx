import React, { useState, useEffect } from 'react';
import './Preloader.css';

function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Block scrolling on body while preloader is active
    document.body.style.overflow = 'hidden';

    // Simulate page load completion (2.2 seconds display + 0.8 seconds fade animation)
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }, 2200);

    // Completely unmount the preloader component from DOM after fade-out transition
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 3000);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = 'auto'; // Fallback re-enable
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`preloader-overlay ${isLoaded ? 'fade-out' : ''}`}>
      <div className="preloader-text-wrap">
        <span className="preloader-letter">A</span>
        <span className="preloader-letter">D</span>
        <span className="preloader-letter">S</span>
        <span className="preloader-letter">D</span>
        <span className="preloader-letter">O</span>
        <span className="preloader-letter">T</span>
      </div>
    </div>
  );
}

export default Preloader;
