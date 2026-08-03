import React, { useContext } from 'react';
import { EditableText, EditableImage, EditableSection, EditableRepeater, CMSContext } from '@anshif.rainhopes/reactcms-sdk';
import './BrandLogos.css';

const defaultBrands = [
  { id: 1, title: 'verifast', subtitle: 'DOCUMENTS CLEARING', color: '#00b074', url: 'https://verifast.com' },
  { id: 2, title: 'Mega Booth', subtitle: 'EVENTS', color: '#625985', url: 'https://megabooth.com' },
  { id: 3, title: 'ahla', subtitle: 'DOCUMENTS CLEARING', color: '#c49a45', url: 'https://ahla.com' },
  { id: 4, title: 'aimlex learning', subtitle: 'ACADEMY FOR LAW ENTRANCE', color: '#e53935', url: 'https://aimlex.com' },
  { id: 5, title: 'AL azr', subtitle: 'ACADEMY OF ISLAMIC STUDIES', color: '#c49a45', url: 'https://alazr.com' },
  { id: 6, title: 'MISBAH', subtitle: 'ACADEMY', color: '#c49a45', url: 'https://misbahacademy.com' },
  { id: 7, title: 'ANNOOR', subtitle: 'ONLINE ACADEMY', color: '#039be5', url: 'https://annooronlineacademy.com' }
];

function BrandCard({ brand, index }) {
  const brandId = brand.id || (index + 1);
  const title = brand.title || defaultBrands[index % 7].title;
  const subtitle = brand.subtitle || defaultBrands[index % 7].subtitle;
  const color = brand.color || defaultBrands[index % 7].color;

  const cms = useContext(CMSContext);
  const editMode = cms?.editMode || false;

  const handleBrandClick = (e, url) => {
    if (!editMode) {
      if (e && e.preventDefault) e.preventDefault();
      window.dispatchEvent(new Event('trigger-preloader'));
      setTimeout(() => {
        if (url && url !== '#') {
          window.location.href = url;
        }
      }, 1000);
    }
  };

  return (
    <div 
      className="logo-card" 
      onClick={(e) => handleBrandClick(e, brand.url)}
    >
      <div className="brand-logo-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px' }}>
        <EditableImage
          regionId={`brand_logos.item_${brandId}.image`}
          label={`Brand ${brandId} Logo Image`}
          defaultValue={{ src: brand.image || '', alt: title }}
          className="brand-logo-img"
        />
        <EditableText
          regionId={`brand_logos.item_${brandId}.title`}
          label={`Brand ${brandId} Title`}
          defaultValue={title}
          className="brand-title-text"
          style={{ color, fontWeight: '700', fontSize: '18px', letterSpacing: '-0.3px', fontFamily: 'Poppins, sans-serif' }}
          as="span"
        />
        <EditableText
          regionId={`brand_logos.item_${brandId}.subtitle`}
          label={`Brand ${brandId} Subtitle`}
          defaultValue={subtitle}
          className="brand-subtitle-text"
          style={{ fontSize: '7px', fontWeight: '600', opacity: 0.75, letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif' }}
          as="span"
        />
      </div>
    </div>
  );
}

function BrandLogos() {
  return (
    <EditableSection regionId="brand_logos.section" label="Brand Logos Section" className="logos-section">
      <div className="logos-container">
        <EditableRepeater
          regionId="brand_logos.items"
          label="Brand Logos Marquee Items"
          defaultValue={defaultBrands}
        >
          {(items) => {
            const list = Array.isArray(items) && items.length > 0 ? items : defaultBrands;
            const doubleRow1 = [...list, ...list];
            const doubleRow2 = [...list.slice().reverse(), ...list.slice().reverse()];

            return (
              <>
                {/* Row 1: Right to Left */}
                <div className="logos-marquee-wrapper">
                  <div className="logos-marquee direction-left">
                    {doubleRow1.map((brand, index) => (
                      <BrandCard
                        key={`r1-${brand.id || index}-${index}`}
                        brand={brand}
                        index={index % list.length}
                      />
                    ))}
                  </div>
                </div>

                {/* Row 2: Left to Right */}
                <div className="logos-marquee-wrapper">
                  <div className="logos-marquee direction-right">
                    {doubleRow2.map((brand, index) => (
                      <BrandCard
                        key={`r2-${brand.id || index}-${index}`}
                        brand={brand}
                        index={index % list.length}
                      />
                    ))}
                  </div>
                </div>
              </>
            );
          }}
        </EditableRepeater>
      </div>
    </EditableSection>
  );
}

export default BrandLogos;
