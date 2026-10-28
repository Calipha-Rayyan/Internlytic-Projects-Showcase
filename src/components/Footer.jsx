import React from 'react';
import { ArrowUp, Info, Compass, Filter, Layers } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top-grid">
          {/* Column 1: Brand & Purpose & Sample-Data Disclosure */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <img
                src="/logo/internlytic-mark.svg"
                alt="Internlytic Mark"
                width="34"
                height="34"
                className="footer-brand-mark"
              />
              <span className="footer-brand-title">
                INTERNLYTIC <span className="brand-accent">TECHNOLOGIES</span>
              </span>
            </div>
            <p className="footer-tagline">
              Internship Projects Showcase is a modern frontend experience celebrating technical execution, human-centered UI/UX design, and architectural innovation across engineering disciplines.
            </p>
            {/* Honest, unobtrusive sample-data disclosure */}
            <div className="footer-sample-notice" role="note">
              <Info size={14} className="notice-icon" aria-hidden="true" />
              <span>Sample project records are illustrative and do not represent actual company submissions.</span>
            </div>
          </div>

          {/* Column 2: Showcase Tracks */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">
              <Layers size={14} color="#18B59A" aria-hidden="true" />
              <span>Showcase Tracks</span>
            </h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('gallery-section')}
                  className="footer-link-btn"
                >
                  Web Development
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('gallery-section')}
                  className="footer-link-btn"
                >
                  AI &amp; Machine Learning
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('gallery-section')}
                  className="footer-link-btn"
                >
                  Data Science
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('gallery-section')}
                  className="footer-link-btn"
                >
                  Mobile Applications
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('gallery-section')}
                  className="footer-link-btn"
                >
                  UI/UX Design
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('gallery-section')}
                  className="footer-link-btn"
                >
                  Cloud &amp; DevOps
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation & Deliberate Interactive Back to Top Control */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">
              <Compass size={14} color="#18B59A" aria-hidden="true" />
              <span>Navigation</span>
            </h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href="#hero-heading"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTop();
                  }}
                  className="footer-link"
                >
                  Explore Top
                </a>
              </li>
              <li>
                <a
                  href="#gallery-section"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('gallery-section');
                  }}
                  className="footer-link"
                >
                  Project Gallery
                </a>
              </li>
              <li>
                <a
                  href="#filter-toolbar"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('filter-toolbar');
                  }}
                  className="footer-link"
                >
                  Track &amp; Tech Filters
                </a>
              </li>
            </ul>

            {/* Back to Top Interactive 3D Tactile Control */}
            <div className="footer-back-to-top-wrapper">
              <button
                type="button"
                onClick={scrollToTop}
                className="btn-back-to-top btn-tactile"
                aria-label="Back to top of page"
                title="Scroll smoothly back to top"
              >
                <div className="arrow-circle" aria-hidden="true">
                  <ArrowUp size={16} />
                </div>
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Row - No Year branding */}
        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; Internlytic Technologies. Independent Demonstration Project.
          </p>
          <div className="footer-bottom-badge">
            <span>Modern 3D Animated Showcase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
