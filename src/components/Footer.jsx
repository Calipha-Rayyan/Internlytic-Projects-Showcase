import React from 'react';
import { Sparkles, ShieldCheck, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand & Purpose */}
          <div className="footer-brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src="/logo/internlytic-mark.svg"
                alt="Internlytic Mark"
                width="36"
                height="36"
              />
              <span className="footer-brand-title">
                INTERNLYTIC <span style={{ color: 'var(--color-teal)' }}>TECHNOLOGIES</span>
              </span>
            </div>
            <p className="footer-tagline">
              Projects Showcase is a professional frontend demonstration celebrating the work, engineering rigor, and innovation produced across internship development tracks.
            </p>
          </div>

          {/* Demonstration Tracks */}
          <div>
            <h4 className="footer-heading">Showcase Tracks</h4>
            <ul className="footer-links-list">
              <li><span className="footer-link">AI &amp; Machine Learning</span></li>
              <li><span className="footer-link">Web Development</span></li>
              <li><span className="footer-link">Data Science &amp; Analytics</span></li>
              <li><span className="footer-link">Mobile Applications</span></li>
              <li><span className="footer-link">UI/UX Architecture</span></li>
              <li><span className="footer-link">Cloud &amp; DevOps</span></li>
            </ul>
          </div>

          {/* Quick Actions / Navigation */}
          <div>
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#hero-heading" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="footer-link">
                  Top of Showcase
                </a>
              </li>
              <li>
                <a href="#gallery-section" className="footer-link">
                  Projects Gallery
                </a>
              </li>
              <li>
                <a href="#filter-toolbar" className="footer-link">
                  Track Filters
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="footer-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem' }}
                >
                  <ArrowUp size={14} aria-hidden="true" />
                  <span>Back to top</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Internlytic Technologies. Independent Demonstration Project.
          </p>
          <div className="footer-disclaimer-pill">
            <ShieldCheck size={14} color="#18B59A" aria-hidden="true" />
            <span>Fictional demonstration data only &bull; Safe frontend build</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
