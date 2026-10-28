import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Moon, Sun, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <header className="navbar official-navbar" role="banner">
      <div className="container navbar-container">
        {/* Real Company Logo (from Image 4) */}
        <a href="/" className="brand-wrapper" aria-label="Internlytic Technologies Home">
          <img
            src="/logo/internlytic-real-logo.png"
            alt="Internlytic Technologies"
            className="brand-logo-img real-company-logo"
            width="180"
            height="46"
            onError={(e) => {
              // Fallback to crisp SVG vector if PNG fails
              e.target.src = '/logo/internlytic-real-logo.svg';
            }}
          />
        </a>

        {/* Desktop Navigation Links matching Official Company Website (frame-2s.png) */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <a href="#hero-heading" onClick={(e) => { e.preventDefault(); scrollToSection('hero-heading'); }} className="nav-link">
            Home
          </a>
          <a href="#all-projects-section" onClick={(e) => { e.preventDefault(); scrollToSection('all-projects-section'); }} className="nav-link">
            My Portfolio
          </a>
          <div className="nav-item-dropdown">
            <span className="nav-link dropdown-toggle">
              Internships <ChevronDown size={14} className="dropdown-chevron" />
            </span>
          </div>
          <a href="#top-projects-section" onClick={(e) => { e.preventDefault(); scrollToSection('top-projects-section'); }} className="nav-link">
            Verify Certificate
          </a>
          <a href="#gallery-section" onClick={(e) => { e.preventDefault(); scrollToSection('gallery-section'); }} className="nav-link active">
            Projects
          </a>
          <a href="#all-projects-section" onClick={(e) => { e.preventDefault(); scrollToSection('all-projects-section'); }} className="nav-link">
            Services
          </a>
          <a href="#all-projects-section" onClick={(e) => { e.preventDefault(); scrollToSection('all-projects-section'); }} className="nav-link">
            Courses
          </a>
          <a href="#footer-section" onClick={(e) => { e.preventDefault(); scrollToSection('footer-section'); }} className="nav-link">
            Contact Us
          </a>
          <a href="#footer-section" onClick={(e) => { e.preventDefault(); scrollToSection('footer-section'); }} className="nav-link">
            About Us
          </a>
        </nav>

        {/* Right CTA Actions: "Internship Portal Login" + Dark Mode toggle */}
        <div className="nav-right-actions">
          <button
            type="button"
            onClick={() => scrollToSection('gallery-section')}
            className="internship-portal-btn btn-3d-glow"
          >
            <span>Internship Portal Login</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="theme-toggle-btn"
            aria-label="Toggle theme mode"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} color="#18B59A" /> : <Moon size={18} color="#073A40" />}
          </button>

          {/* Mobile Toggle Hamburger */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={24} color="#073A40" /> : <Menu size={24} color="#073A40" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer" role="dialog" aria-label="Mobile Navigation">
          <nav className="mobile-nav-links">
            <button type="button" onClick={() => scrollToSection('hero-heading')} className="mobile-nav-item">
              Home
            </button>
            <button type="button" onClick={() => scrollToSection('top-projects-section')} className="mobile-nav-item">
              Top 5 Intern Projects
            </button>
            <button type="button" onClick={() => scrollToSection('gallery-section')} className="mobile-nav-item active">
              Projects Showcase
            </button>
            <button type="button" onClick={() => scrollToSection('all-projects-section')} className="mobile-nav-item">
              Services &amp; Tracks
            </button>
            <button type="button" onClick={() => scrollToSection('footer-section')} className="mobile-nav-item">
              Contact &amp; About Us
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('gallery-section')}
              className="mobile-nav-item cta"
            >
              <span>Internship Portal Login</span>
              <ArrowUpRight size={16} />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
