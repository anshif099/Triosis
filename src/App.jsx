import React, { useState, useEffect } from 'react';
import Home from './pages/home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Career from './pages/Career.jsx';
import OurTeamPage from './pages/OurTeamPage.jsx';
import FaqsPage from './pages/FaqsPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import DynamicCMSPage from './pages/DynamicCMSPage.jsx';
import Cursor from './components/Cursor.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { CMSLayout, CMSNavigation } from '@anshif.rainhopes/reactcms-runtime';
import './App.css';

const mainNavigationItems = [
  { id: 'nav-home', label: 'Home', path: '/', order: 1 },
  { id: 'nav-about', label: 'About Us', path: '/aboutus', order: 2 },
  { id: 'nav-services', label: 'Services', path: '/services', order: 3 },
  { id: 'nav-portfolio', label: 'Portfolio', path: '/portfolio', order: 4 },
  { id: 'nav-blog', label: 'Blog', path: '/blog', order: 5 },
  { id: 'nav-contact', label: 'Contact Us', path: '/contact', order: 6 },
];

const pathToPage = {
  '/': 'home',
  '/aboutus': 'about',
  '/career': 'career',
  '/our-team': 'our-team',
  '/faqs': 'faqs',
  '/services': 'services',
  '/portfolio': 'portfolio',
  '/blog': 'blog',
  '/contact': 'contact'
};

const pageToPath = {
  'home': '/',
  'about': '/aboutus',
  'career': '/career',
  'our-team': '/our-team',
  'faqs': '/faqs',
  'services': '/services',
  'portfolio': '/portfolio',
  'blog': '/blog',
  'contact': '/contact'
};

const websiteId = import.meta.env.VITE_REACTCMS_WEBSITE_ID || '-Oz5k0Sb8BKbOxfOSxq8';
const databaseUrl = import.meta.env.VITE_REACTCMS_DATABASE_URL || 'https://react-cms-pro-default-rtdb.firebaseio.com';

function MissingPage() {
  return (
    <>
    <Header />
    <main className="missing-page" style={{ minHeight: '65vh', display: 'grid', placeItems: 'center', padding: '64px 24px', textAlign: 'center' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 'clamp(48px, 8vw, 96px)', color: 'var(--primary)' }}>404</h1>
        <p style={{ fontSize: '20px', color: 'var(--text-h)' }}>Page not found</p>
        <a href="/" style={{ color: 'var(--primary)' }}>Return to home</a>
      </div>
    </main>
    <Footer />
    </>
  );
}

function App() {
  // A newly created CMS page has no published page record yet. The connected
  // editor still needs to render its template so its regions can be edited.
  const isCmsCanvas = typeof window !== 'undefined'
    && window.self !== window.top
    && (() => {
      const params = new URLSearchParams(window.location.search);
      return params.has('rcms_edit') || params.has('rcms_preview');
    })();

  const getInitialPage = () => {
    // 1. Check URL query parameters (?page=ai-integrated-digital-marketing)
    if (typeof window !== 'undefined' && window.location.search) {
      try {
        const params = new URLSearchParams(window.location.search);
        const queryPage = params.get('page') || params.get('rcms_page');
        if (queryPage && queryPage !== 'home') {
          return pathToPage[`/${queryPage}`] || queryPage;
        }
      } catch {
        // Fallthrough
      }
    }

    // 2. Check URL pathname
    const path = window.location.pathname.toLowerCase();
    const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
    if (cleanPath === '' || cleanPath === '/') return 'home';

    return pathToPage[cleanPath] || cleanPath.replace(/^\/+/, '') || 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [publishedDynamicPage, setPublishedDynamicPage] = useState(null);

  useEffect(() => {
    if (Object.values(pathToPage).includes(currentPage)) return undefined;
    let cancelled = false;
    setPublishedDynamicPage(null);
    const pagePath = String(currentPage).split('/').map(encodeURIComponent).join('/');
    const url = `${databaseUrl.replace(/\/$/, '')}/content/${encodeURIComponent(websiteId)}/sync/published/pages/${pagePath}.json`;
    fetch(url, { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((page) => {
        if (!cancelled) setPublishedDynamicPage(page && page.deleted !== true ? currentPage : 'missing');
      })
      .catch(() => {
        if (!cancelled) setPublishedDynamicPage('missing');
      });
    return () => { cancelled = true; };
  }, [currentPage]);

  useEffect(() => {
    const handleNavigate = (e) => {
      const targetPage = e.detail.page;
      const targetPath = pageToPath[targetPage] || `/${targetPage}`;
      
      if (window.location.pathname.toLowerCase() !== targetPath.toLowerCase()) {
        window.history.pushState(null, '', targetPath);
      }

      // Small timeout to allow the preloader transition to cover the screen
      setTimeout(() => {
        setCurrentPage(targetPage);
        window.scrollTo(0, 0);
      }, 800);
    };

    const handlePopState = () => {
      // 1. Check URL query parameters (?page=...)
      if (typeof window !== 'undefined' && window.location.search) {
        try {
          const params = new URLSearchParams(window.location.search);
          const queryPage = params.get('page') || params.get('rcms_page');
          if (queryPage && queryPage !== 'home') {
            const resolved = pathToPage[`/${queryPage}`] || queryPage;
            setCurrentPage((prev) => (prev !== resolved ? resolved : prev));
            return;
          }
        } catch {
          // Fallthrough
        }
      }

      // 2. Check pathname
      const path = window.location.pathname.toLowerCase();
      const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
      const targetPage = pathToPage[cleanPath] || (cleanPath === '' || cleanPath === '/' ? 'home' : cleanPath.replace(/^\/+/, ''));

      setCurrentPage((prev) => (prev !== targetPage ? targetPage : prev));
    };

    window.addEventListener('navigate', handleNavigate);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('navigate', handleNavigate);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const isStandardPage = ['home', 'about', 'career', 'our-team', 'faqs', 'services', 'portfolio', 'blog', 'contact'].includes(currentPage);

  return (
    <div className="app">
      <CMSLayout id="default" label="Default Layout" isDefault={true} slots={['main']} />
      <CMSNavigation id="main-navigation" label="Main Navigation" items={mainNavigationItems} />
      <Cursor />
      {currentPage === 'home' && <Home />}
      {currentPage === 'about' && <AboutUs />}
      {currentPage === 'career' && <Career />}
      {currentPage === 'our-team' && <OurTeamPage />}
      {currentPage === 'faqs' && <FaqsPage />}
      {currentPage === 'services' && <ServicesPage />}
      {currentPage === 'portfolio' && <PortfolioPage />}
      {currentPage === 'blog' && <BlogPage />}
      {currentPage === 'contact' && <ContactPage />}

      {/* Dynamic CMS Generated / Created Pages */}
      {!isStandardPage && (publishedDynamicPage === currentPage || isCmsCanvas) && <DynamicCMSPage pageSlug={currentPage} />}
      {!isStandardPage && !isCmsCanvas && publishedDynamicPage === 'missing' && <MissingPage />}
    </div>
  );
}

export default App;
