import React, { useEffect, useState } from 'react';
import './Cursor.css';

function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Resolve computed cursor to detect CSS-defined pointer cursors
      let hasPointer = false;
      if (target instanceof Element) {
        try {
          hasPointer = window.getComputedStyle(target).cursor === 'pointer';
        } catch (err) {}
      }

      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.classList.contains('nav-link') || 
        target.classList.contains('dropdown-item') ||
        target.closest('.logo-card') ||
        target.closest('.team-card') ||
        target.closest('.social-btn') ||
        target.closest('.footer-social-btn') ||
        target.closest('.back-to-top-btn') ||
        target.closest('.get-started-btn') ||
        target.closest('.explore-posts-btn') ||
        target.closest('.journal-card') ||
        hasPointer;

      if (isInteractive) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`custom-cursor-dot ${hovered ? 'hovered' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}

export default Cursor;
