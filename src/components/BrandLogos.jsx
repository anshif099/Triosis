import React from 'react';
import './BrandLogos.css';

// Stylized Inline Brand Logo 1: Verifast
const VerifastLogo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif' }}>
    <div style={{ fontSize: '23px', fontWeight: '700', color: '#888888', letterSpacing: '-0.5px' }}>
      veri<span style={{ color: '#00b074' }}>fast</span>
    </div>
    <div style={{ fontSize: '7px', fontWeight: '600', color: '#555555', letterSpacing: '1px', marginTop: '-3px' }}>
      DOCUMENTS CLEARING
    </div>
  </div>
);

// Stylized Inline Brand Logo 2: Mega Booth
const MegaBoothLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#625985', border: '1px solid rgba(255,255,255,0.1)' }}>
    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '9px', fontWeight: '800', color: '#ffffff', textAlign: 'center', lineHeight: '1.15', textTransform: 'uppercase' }}>
      Mega<br />Booth
    </span>
  </div>
);

// Stylized Inline Brand Logo 3: Ahla
const AhlaLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c49a45' }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C11.5 5 9.5 7.5 7 8c2.5.5 4.5 3 5 6 .5-3 2.5-5.5 5-6-2.5-.5-4.5-3-5-6zm0 12v8h-2v-8h2z" />
    </svg>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: 'Poppins, sans-serif', textAlign: 'left' }}>
      <span style={{ fontSize: '19px', fontWeight: '700', lineHeight: '1', letterSpacing: '-0.5px' }}>ahla</span>
      <span style={{ fontSize: '5px', fontWeight: '600', opacity: 0.7, letterSpacing: '0.2px', marginTop: '1px' }}>DOCUMENTS CLEARING</span>
    </div>
  </div>
);

// Stylized Inline Brand Logo 4: Aimlex Learning
const AimlexLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e53935' }}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z" />
      <path d="M12 4v16" />
    </svg>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: 'Poppins, sans-serif', textAlign: 'left' }}>
      <span style={{ fontSize: '16px', fontWeight: '700', lineHeight: '1' }}>aimlex</span>
      <span style={{ fontSize: '9px', fontWeight: '600', marginTop: '-1px', opacity: 0.9 }}>learning</span>
      <span style={{ fontSize: '4.5px', fontWeight: '500', opacity: 0.7, letterSpacing: '0.2px' }}>academy for law entrance</span>
    </div>
  </div>
);

// Stylized Inline Brand Logo 5: Al Azr
const AlAzrLogo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', color: '#c49a45' }}>
    <div style={{ fontSize: '7px', fontWeight: '700', letterSpacing: '2px', opacity: 0.7, textTransform: 'uppercase' }}>AL</div>
    <div style={{ fontSize: '22px', fontWeight: '800', lineHeight: '0.95', letterSpacing: '1px' }}>azr</div>
    <div style={{ fontSize: '4.5px', fontWeight: '600', letterSpacing: '0.5px', marginTop: '3px', opacity: 0.7 }}>Academy of Islamic Studies</div>
  </div>
);

// Stylized Inline Brand Logo 6: Misbah Academy
const MisbahLogo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', color: '#c49a45' }}>
    <svg width="24" height="18" viewBox="0 0 24 20" fill="currentColor">
      <path d="M12 4.5C8 1.5 3 2 1 3v12c2-1 7-1.5 11 1.5 4-3 9-2.5 11-1.5V3c-2-1-7-1.5-11 1.5z" />
    </svg>
    <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginTop: '3px', textTransform: 'uppercase' }}>MISBAH</span>
    <span style={{ fontSize: '5px', fontWeight: '600', letterSpacing: '2px', opacity: 0.7, textTransform: 'uppercase', marginTop: '1px' }}>academy</span>
  </div>
);

// Stylized Inline Brand Logo 7: Annoor Academy
const AnnoorLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#039be5' }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 22h20L12 2zm0 4l6.5 13h-13L12 6z" />
    </svg>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: 'Poppins, sans-serif', textAlign: 'left' }}>
      <span style={{ fontSize: '14px', fontWeight: '700', lineHeight: '1', color: '#039be5' }}>ANNOOR</span>
      <span style={{ fontSize: '6px', fontWeight: '600', opacity: 0.7, color: '#888888', letterSpacing: '0.5px', marginTop: '1px' }}>Online Academy</span>
    </div>
  </div>
);

function BrandLogos() {
  // Trigger loading screen preloader, then redirect in current tab
  const handleBrandClick = (url) => {
    // 1. Dispatch custom preloader event to start letters animation overlay
    window.dispatchEvent(new Event('trigger-preloader'));

    // 2. Perform redirection after 1 second transition delay
    setTimeout(() => {
      window.location.href = url;
    }, 1000);
  };

  // Row lists containing branding component renderers and destination URLs
  const brandsRow1 = [
    { component: <VerifastLogo />, url: 'https://verifast.com' },
    { component: <MegaBoothLogo />, url: 'https://megabooth.com' },
    { component: <AhlaLogo />, url: 'https://ahla.com' },
    { component: <AimlexLogo />, url: 'https://aimlex.com' },
    { component: <AlAzrLogo />, url: 'https://alazr.com' },
    { component: <MisbahLogo />, url: 'https://misbahacademy.com' },
    { component: <AnnoorLogo />, url: 'https://annooronlineacademy.com' }
  ];

  const brandsRow2 = [
    { component: <AhlaLogo />, url: 'https://ahla.com' },
    { component: <AimlexLogo />, url: 'https://aimlex.com' },
    { component: <AlAzrLogo />, url: 'https://alazr.com' },
    { component: <MisbahLogo />, url: 'https://misbahacademy.com' },
    { component: <AnnoorLogo />, url: 'https://annooronlineacademy.com' },
    { component: <VerifastLogo />, url: 'https://verifast.com' },
    { component: <MegaBoothLogo />, url: 'https://megabooth.com' }
  ];

  // Double rows for seamless continuous marquees scrolling
  const doubleRow1 = [...brandsRow1, ...brandsRow1];
  const doubleRow2 = [...brandsRow2, ...brandsRow2];

  return (
    <section className="logos-section">
      <div className="logos-container">
        
        {/* Row 1: Right to Left */}
        <div className="logos-marquee-wrapper">
          <div className="logos-marquee direction-left">
            {doubleRow1.map((brand, index) => (
              <div 
                className="logo-card" 
                key={`r1-${index}`}
                onClick={() => handleBrandClick(brand.url)}
              >
                {brand.component}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="logos-marquee-wrapper">
          <div className="logos-marquee direction-right">
            {doubleRow2.map((brand, index) => (
              <div 
                className="logo-card" 
                key={`r2-${index}`}
                onClick={() => handleBrandClick(brand.url)}
              >
                {brand.component}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default BrandLogos;
