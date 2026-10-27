import React from 'react';
import { Compass, Sparkles, FolderGit2 } from 'lucide-react';

export default function Navbar() {
  const scrollToGallery = (e) => {
    e.preventDefault();
    const galleryEl = document.getElementById('gallery-section');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar" role="banner">
      <div className="container navbar-container">
        {/* Brand identity */}
        <a href="/" className="brand-wrapper" aria-label="Internlytic Technologies Home">
          <img
            src="/logo/internlytic-logo.svg"
            alt="Internlytic Technologies"
            className="brand-logo-img"
            width="240"
            height="40"
            onError={(e) => {
              // Graceful fallback to text wordmark if image asset is unavailable
              e.target.style.display = 'none';
              const textNode = document.getElementById('brand-fallback-text');
              if (textNode) textNode.style.display = 'flex';
            }}
          />
          <div
            id="brand-fallback-text"
            style={{ display: 'none', flexDirection: 'column' }}
            aria-hidden="true"
          >
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              INTERNLYTIC
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#18B59A', letterSpacing: '0.12em' }}>
              TECHNOLOGIES
            </span>
          </div>
          <span className="showcase-badge">
            <Sparkles size={12} aria-hidden="true" />
            Showcase
          </span>
        </a>

        {/* Navigation links */}
        <nav className="navbar-nav" aria-label="Main Navigation">
          <a
            href="#gallery-section"
            onClick={scrollToGallery}
            className="nav-link"
          >
            Explore Projects
          </a>
          <a
            href="#gallery-section"
            onClick={scrollToGallery}
            className="nav-cta-btn"
          >
            <Compass size={16} aria-hidden="true" />
            <span>Discover Work</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
