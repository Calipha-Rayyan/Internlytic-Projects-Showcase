import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Layers, Info, ArrowDown } from 'lucide-react';

export default function Navbar({ onExploreClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && mobileMenuOpen) {
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
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar brand-navbar" role="banner">
      <div className="container navbar-container">
        {/* Official Brand Logo with Seamless Background Integration */}
        <a href="/" className="brand-wrapper" aria-label="Internlytic Technologies Projects Showcase">
          <img
            src="/logo/internlytic-dark-transparent.png"
            alt="Internlytic Technologies"
            className="brand-logo-img"
            width="170"
            height="62"
            onError={(e) => {
              e.target.src = '/logo/internlytic-dark-logo.png';
            }}
          />
        </a>

        {/* Desktop Navigation Links with Working Destinations */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <a
            href="#main-content"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="nav-link"
          >
            Home
          </a>

          <a
            href="#gallery-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('gallery-section');
            }}
            className="nav-link"
          >
            Showcase Gallery
          </a>

          <a
            href="#filter-toolbar"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('filter-toolbar');
            }}
            className="nav-link"
          >
            Filter Tracks
          </a>

          <a
            href="#footer-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('footer-section');
            }}
            className="nav-link"
          >
            About Showcase
          </a>
        </nav>

        {/* Right Action: Tactile 3D Explore Button */}
        <div className="nav-right-actions">
          <button
            type="button"
            onClick={onExploreClick}
            className="nav-explore-btn btn-tactile"
            aria-label="Explore Projects Gallery"
          >
            <Compass size={16} aria-hidden="true" />
            <span>Explore Projects</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <div className="mobile-toggle-wrapper">
            <button
              type="button"
              className="mobile-menu-btn btn-tactile"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
          <div className="mobile-drawer-header">
            <img
              src="/logo/internlytic-dark-transparent.png"
              alt="Internlytic Technologies"
              className="drawer-logo-img"
              width="150"
              height="55"
              onError={(e) => {
                e.target.src = '/logo/internlytic-dark-logo.png';
              }}
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="drawer-close-btn"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mobile-drawer-nav">
            <a
              href="#main-content"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mobile-nav-link"
            >
              Home
            </a>
            <a
              href="#gallery-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('gallery-section');
              }}
              className="mobile-nav-link"
            >
              Showcase Gallery
            </a>
            <a
              href="#filter-toolbar"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('filter-toolbar');
              }}
              className="mobile-nav-link"
            >
              Filter Tracks
            </a>
            <a
              href="#footer-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('footer-section');
              }}
              className="mobile-nav-link"
            >
              About Showcase
            </a>
          </nav>

          <div className="mobile-drawer-footer">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onExploreClick) onExploreClick();
              }}
              className="mobile-explore-btn btn-tactile"
            >
              <Compass size={16} aria-hidden="true" />
              <span>Explore Projects Gallery</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
