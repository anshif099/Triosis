import React, { useEffect, useRef, useState, useContext } from 'react';
import { EditableText, EditableImage, EditableSection, EditableRepeater, CMSContext } from '@anshif.rainhopes/reactcms-sdk';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpeg';
import './Gallery.css';

const defaultGalleryItems = [
  { id: 1, title: 'Falspace', subtitle: 'BRANDING', img: img1 },
  { id: 2, title: 'Aimlex Learning LLP', subtitle: 'BROUCHER', img: img2 },
  { id: 3, title: 'Mindsphere', subtitle: 'BRANDING', img: img3 },
  { id: 4, title: 'Code Sprint', subtitle: 'BRANDING', img: img4 }
];

function GalleryItem({ item, index, isExpanded, onMouseEnter, onMouseLeave, onClick }) {
  const itemId = item.id || (index + 1);
  const defaultImg = item.img || defaultGalleryItems[index % 4].img;
  const defaultTitle = item.title || defaultGalleryItems[index % 4].title;
  const defaultSubtitle = item.subtitle || defaultGalleryItems[index % 4].subtitle;

  return (
    <div
      className={`scroll-capsule-item ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="img-container">
        <EditableImage
          regionId={`gallery.item_${itemId}_image`}
          label={`Capsule ${itemId} Image`}
          defaultValue={{ src: defaultImg, alt: defaultTitle }}
        />
        <div className="glass-overlay"></div>
      </div>

      {/* Vertical label (displayed when collapsed) */}
      <div className="vertical-label">
        <div className="vertical-title">
          {String(defaultTitle).split('').map((char, i) => (
            <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </div>
        <div className="vertical-subtitle">
          {String(defaultSubtitle).split('').map((char, i) => (
            <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </div>
      </div>

      {/* Horizontal label (displayed when expanded) */}
      <div className="horizontal-label">
        <EditableText
          regionId={`gallery.item_${itemId}_title`}
          label={`Capsule ${itemId} Title`}
          defaultValue={defaultTitle}
          className="label-title"
          as="h3"
        />
        <EditableText
          regionId={`gallery.item_${itemId}_subtitle`}
          label={`Capsule ${itemId} Subtitle`}
          defaultValue={defaultSubtitle}
          className="label-subtitle"
          as="p"
        />
      </div>
    </div>
  );
}

function Gallery() {
  const sectionRef = useRef(null);
  const cms = useContext(CMSContext);
  const editMode = cms?.editMode || false;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeItem, setActiveItem] = useState(1);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      const totalHeight = rect.height - windowHeight;
      if (totalHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const checkIsExpanded = (index, itemId) => {
    if (hoveredItem === itemId) return true;
    if (activeItem === itemId && !hoveredItem) return true;

    if (index === 0) return scrollProgress >= 0.05;
    if (index === 1) return scrollProgress >= 0.28;
    if (index === 2) return scrollProgress >= 0.52;
    if (index === 3) return scrollProgress >= 0.76;
    return false;
  };

  const handleItemClick = (itemId) => {
    setActiveItem((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <EditableSection
      regionId="gallery.section"
      label="Scroll Gallery Section"
      as="section"
      className="scroll-gallery-section"
      ref={sectionRef}
    >
      <div className="sticky-container">
        <div className="gallery-layout">
          <div className="gallery-left">
            {/* Left side spacing layout */}
          </div>
          <div className="gallery-right">
            <EditableRepeater
              regionId="gallery.items"
              label="Gallery Capsule Items"
              defaultValue={defaultGalleryItems}
            >
              {(items) => {
                const itemList = Array.isArray(items) && items.length > 0 ? items : defaultGalleryItems;
                return (
                  <div className="scroll-capsule-gallery">
                    {itemList.map((item, index) => {
                      const itemId = item.id || (index + 1);
                      const expanded = checkIsExpanded(index, itemId);
                      return (
                        <GalleryItem
                          key={itemId}
                          item={item}
                          index={index}
                          isExpanded={expanded}
                          onMouseEnter={() => setHoveredItem(itemId)}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => handleItemClick(itemId)}
                        />
                      );
                    })}
                  </div>
                );
              }}
            </EditableRepeater>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}

export default Gallery;
