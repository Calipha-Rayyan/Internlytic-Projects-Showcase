import React from 'react';
import { ArrowUp, Info, Layers, Compass, Mail, Globe } from 'lucide-react';
import { AVAILABLE_TRACKS } from '../data/sampleProjects';

export default function Footer({ onSelectTrack }) {
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

  const tracksList = AVAILABLE_TRACKS.filter((t) => t !== 'All Tracks');

  return (
    <footer className="footer" id="footer-section" role="contentinfo">
      <div className="container">
        <div className="footer-top-grid">
          {/* Column 1: Official Brand & Honest Purpose */}
          <div className="footer-brand-col">
            <div className="footer-logo-surface">
              <img
                src="/logo/internlytic-real-logo.png"
                alt="Internlytic Technologies Official Logo"
                className="footer-brand-logo"
                width="160"
                height="48"
              />
            </div>
            <p className="footer-tagline">
              Internlytic Technologies Projects Showcase is a dedicated frontend demonstration highlighting technical execution, interface design, and architectural clarity across internship tracks.
            </p>

            {/* Discreet, honest sample-data disclosure as required */}
            <div className="footer-sample-disclosure" role="note">
              <Info size={14} className="disclosure-icon" aria-hidden="true" />
              <span>Sample project records are illustrative and do not represent actual company submissions.</span>
            </div>
          </div>

          {/* Column 2: Showcase Quick Navigation */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">
              <Compass size={15} color="#18B59A" aria-hidden="true" />
              <span>Showcase Navigation</span>
            </h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={scrollToTop} className="footer-link-btn">
                  Home Overview
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('filter-toolbar')} className="footer-link-btn">
                  Filter by Track
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('gallery-section')} className="footer-link-btn">
                  Projects Gallery
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('footer-section')} className="footer-link-btn">
                  About Demonstration
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialized Internship Tracks */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">
              <Layers size={15} color="#18B59A" aria-hidden="true" />
              <span>Specialized Tracks</span>
            </h4>
            <ul className="footer-links-list">
              {tracksList.map((track) => (
                <li key={track}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectTrack) onSelectTrack(track);
                      else scrollToSection('gallery-section');
                    }}
                    className="footer-link-btn"
                  >
                    {track}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Platform Information */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">
              <Globe size={15} color="#18B59A" aria-hidden="true" />
              <span>Demonstration Concept</span>
            </h4>
            <p className="footer-info-text">
              Built as an independent, accessible single-page application using React, Vite, and CSS 3D transforms.
            </p>
            <div className="footer-status-pill">
              <span className="status-dot-pulse" aria-hidden="true" />
              <span>Independent Showcase</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Internlytic Technologies Showcase. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top btn-tactile"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
