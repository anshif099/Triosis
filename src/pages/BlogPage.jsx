import React, { useState } from 'react';
import { EditableText, EditableImage, EditableSection } from '@anshif.rainhopes/reactcms-sdk';
import Preloader from '../components/Preloader.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import blogCover from '../assets/blog_cover.jpg';
import img3 from '../assets/img3.jpg';
import img7 from '../assets/img7.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img9 from '../assets/img9.jpg';
import './BlogPage.css';

const blogPosts = [
  {
    id: 1,
    title: 'The Art of Designing: Where Creativity Meets Purpose',
    category: 'Creative Designing',
    author: 'Adsdot',
    date: { day: '28', month: 'MAY' },
    image: blogCover,
    excerpt: 'Design is more than aesthetics — it is the bridge between a brand and its audience. Discover how purposeful creativity drives real business results.'
  },
  {
    id: 2,
    title: 'How Digital Marketing Transforms Small Businesses',
    category: 'Digital Marketing',
    author: 'Triosis',
    date: { day: '15', month: 'JUN' },
    image: img3,
    excerpt: 'From zero online presence to a thriving brand — learn how targeted digital strategies help small businesses compete with industry giants.'
  },
  {
    id: 3,
    title: 'Web Development Trends to Watch in 2025',
    category: 'Web Development',
    author: 'Triosis',
    date: { day: '02', month: 'JUL' },
    image: img7,
    excerpt: 'From AI-powered UX to edge computing and headless CMS — explore the web technologies shaping the future of online experiences.'
  },
  {
    id: 4,
    title: 'Building a Brand Identity That Lasts',
    category: 'Branding',
    author: 'Triosis',
    date: { day: '20', month: 'JUN' },
    image: img5,
    excerpt: 'A strong brand identity is your most powerful asset. Learn the fundamentals of visual identity, tone of voice, and brand consistency.'
  },
  {
    id: 5,
    title: 'Social Media Strategies That Actually Convert',
    category: 'Social Media',
    author: 'Adsdot',
    date: { day: '10', month: 'JUL' },
    image: img6,
    excerpt: 'Forget vanity metrics. Here are the real strategies we use to turn social media followers into paying customers for our clients.'
  },
  {
    id: 6,
    title: 'SEO in 2025: What Still Works and What Does Not',
    category: 'SEO',
    author: 'Triosis',
    date: { day: '05', month: 'JUL' },
    image: img9,
    excerpt: 'Search engine algorithms change constantly. Here is a no-nonsense guide to what SEO techniques are still driving organic traffic in 2025.'
  }
];

function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blogPosts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const latestPosts = blogPosts.slice(0, 4);

  return (
    <div className="blog-page-container">
      <Preloader />
      <Header />

      {/* Hero */}
      <EditableSection regionId="blog.hero" label="Blog Hero" className="blog-hero">
        <div className="blog-hero-inner">
          <EditableText regionId="blog.hero_title" label="Blog Hero Title" defaultValue="OUR NEWS ." className="blog-hero-title" as="h1" />
          <span className="blog-hero-accent-dot"></span>
        </div>
      </EditableSection>

      {/* Main Content */}
      <EditableSection regionId="blog.main_section" label="Blog Main Section" className="blog-main-section">
        <div className="blog-main-inner">

          {/* Posts Grid */}
          <div className="blog-posts-area">
            {filtered.length > 0 ? filtered.map((post) => (
              <article className="blog-card" key={post.id}>
                <div className="blog-card-media">
                  <EditableImage
                    regionId={`blog.post_${post.id}.image`}
                    label={`Blog Post ${post.id} Image`}
                    defaultValue={{ src: post.image, alt: post.title }}
                    className="blog-card-img"
                  />
                  <div className="blog-card-date-badge">
                    <EditableText
                      regionId={`blog.post_${post.id}.date_day`}
                      label={`Blog Post ${post.id} Date Day`}
                      defaultValue={post.date.day}
                      className="blog-date-day"
                      as="span"
                    />
                    <EditableText
                      regionId={`blog.post_${post.id}.date_month`}
                      label={`Blog Post ${post.id} Date Month`}
                      defaultValue={post.date.month}
                      className="blog-date-month"
                      as="span"
                    />
                  </div>
                  <div className="blog-card-overlay">
                    <span className="blog-read-label">Read More →</span>
                  </div>
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <EditableText
                      regionId={`blog.post_${post.id}.category`}
                      label={`Blog Post ${post.id} Category`}
                      defaultValue={post.category}
                      className="blog-card-category"
                      as="span"
                    />
                    <EditableText
                      regionId={`blog.post_${post.id}.author`}
                      label={`Blog Post ${post.id} Author`}
                      defaultValue={`By : ${post.author}`}
                      className="blog-card-author"
                      as="span"
                    />
                  </div>
                  <EditableText
                    regionId={`blog.post_${post.id}.title`}
                    label={`Blog Post ${post.id} Title`}
                    defaultValue={post.title}
                    className="blog-card-title"
                    as="h2"
                  />
                  <EditableText
                    regionId={`blog.post_${post.id}.excerpt`}
                    label={`Blog Post ${post.id} Excerpt`}
                    defaultValue={post.excerpt}
                    className="blog-card-excerpt"
                    as="p"
                  />
                </div>
              </article>
            )) : (
              <p className="blog-no-results">No posts found for "{searchQuery}".</p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            {/* Search */}
            <div className="sidebar-widget">
              <EditableText regionId="blog.sidebar_search_title" label="Sidebar Search Title" defaultValue="SEARCH HERE" className="sidebar-widget-title" as="h3" />
              <div className="sidebar-search-box">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="sidebar-search-input"
                />
                <button className="sidebar-search-btn" aria-label="Search">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Latest Posts */}
            <div className="sidebar-widget">
              <EditableText regionId="blog.sidebar_latest_title" label="Sidebar Latest Title" defaultValue="LATEST POSTS" className="sidebar-widget-title" as="h3" />
              <div className="sidebar-latest-list">
                {latestPosts.map((post) => (
                  <div className="sidebar-latest-item" key={post.id}>
                    <div className="sidebar-latest-thumb">
                      <EditableImage
                        regionId={`blog.sidebar_post_${post.id}.image`}
                        label={`Sidebar Post ${post.id} Image`}
                        defaultValue={{ src: post.image, alt: post.title }}
                      />
                    </div>
                    <div className="sidebar-latest-info">
                      <EditableText
                        regionId={`blog.sidebar_post_${post.id}.category`}
                        label={`Sidebar Post ${post.id} Category`}
                        defaultValue={post.category}
                        className="sidebar-latest-cat"
                        as="span"
                      />
                      <EditableText
                        regionId={`blog.sidebar_post_${post.id}.title`}
                        label={`Sidebar Post ${post.id} Title`}
                        defaultValue={post.title}
                        className="sidebar-latest-title"
                        as="p"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="sidebar-widget">
              <EditableText regionId="blog.sidebar_categories_title" label="Sidebar Categories Title" defaultValue="CATEGORIES" className="sidebar-widget-title" as="h3" />
              <ul className="sidebar-categories">
                {['Creative Designing', 'Digital Marketing', 'Web Development', 'Branding', 'Social Media', 'SEO'].map((cat, idx) => (
                  <li key={cat} onClick={() => setSearchQuery(cat)} className="sidebar-category-item">
                    <span className="sidebar-cat-dot"></span>
                    <EditableText
                      regionId={`blog.category_item_${idx + 1}`}
                      label={`Category Item ${idx + 1}`}
                      defaultValue={cat}
                      as="span"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </EditableSection>

      <Footer />
    </div>
  );
}

export default BlogPage;
