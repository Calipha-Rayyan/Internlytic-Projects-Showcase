import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Menu, X, Filter, FolderGit2 } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      // Offset for sticky header
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
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
            height="38"
            onError={(e) => {
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
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              INTERNLYTIC
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#18B59A', letterSpacing: '0.12em' }}>
              TECHNOLOGIES
            </span>
          </div>
          <span className="showcase-badge">
            <Sparkles size={11} aria-hidden="true" />
            Showcase
          </span>
        </a>

        {/* Desktop Navigation links */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <a
            href="#gallery-section"
            onClick={(e) => { e.preventDefault(); scrollToSection('gallery-section'); }}
            className="nav-link"
          >
            Explore Projects
          </a>
          <a
            href="#filter-toolbar"
            onClick={(e) => { e.preventDefault(); scrollToSection('filter-toolbar'); }}
            className="nav-link"
          >
            Filter Tracks
          </a>
          <button
            type="button"
            onClick={() => scrollToSection('gallery-section')}
            className="nav-cta-btn"
          >
            <Compass size={16} aria-hidden="true" />
            <span>Discover Work</span>
          </button>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <div className="mobile-toggle-wrapper">
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer" role="dialog" aria-label="Mobile Navigation">
          <nav className="mobile-nav-links">
            <button
              type="button"
              onClick={() => scrollToSection('gallery-section')}
              className="mobile-nav-item"
            >
              <Compass size={18} color="#18B59A" />
              <span>Explore Projects</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('filter-toolbar')}
              className="mobile-nav-item"
            >
              <Filter size={18} color="#18B59A" />
              <span>Filter by Track</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('gallery-section')}
              className="mobile-nav-item cta"
            >
              <Sparkles size={18} />
              <span>Discover All Work</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
