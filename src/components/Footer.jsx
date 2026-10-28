import React from 'react';
import { Layers, Compass } from 'lucide-react';
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
        <div className="footer-top-grid footer-three-cols">
          {/* Column 1: Official Brand Identity (Directly on dark background with Image 5) */}
          <div className="footer-brand-col">
            <div className="footer-brand-logo-wrap">
              <img
                src="/logo/internlytic-dark-transparent.png"
                alt="Internlytic Technologies Official Logo"
                className="footer-brand-logo"
                width="190"
                height="70"
                onError={(e) => {
                  e.target.src = '/logo/internlytic-dark-logo.png';
                }}
              />
            </div>
            <p className="footer-tagline">
              Internlytic Technologies is a global provider of tech internships and digital solutions, dedicated to empowering students and emerging engineers with project experience, mentorship, and career growth.
            </p>
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
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Internlytic Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
