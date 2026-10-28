import React from 'react';
import { ArrowUp, Mail, MapPin, Globe, Compass, ExternalLink } from 'lucide-react';

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
          {/* Column 1: Official Brand Identity & Mission */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <img
                src="/logo/internlytic-real-logo.png"
                alt="Internlytic Technologies Official Logo"
                className="footer-company-logo"
                onError={(e) => {
                  e.target.src = '/logo/internlytic-logo.svg';
                }}
              />
            </div>
            <p className="footer-tagline">
              Internlytic Technologies is a global provider of tech internships and innovative digital solutions, dedicated to empowering students and emerging engineers with real-world project experience, executive mentorship, and career growth.
            </p>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <Mail size={14} color="#18B59A" />
                <span>support@internlytic.com</span>
              </div>
              <div className="footer-contact-item">
                <MapPin size={14} color="#18B59A" />
                <span>Global Remote &amp; Innovation Hubs</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">
              <span>Explore Platform</span>
            </h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={scrollToTop} className="footer-link-btn">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('top-projects')} className="footer-link-btn">
                  Top 5 Intern Projects
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('all-projects-section')} className="footer-link-btn">
                  Projects Showcase
                </button>
              </li>
              <li>
                <a href="#internships" className="footer-link-btn" onClick={(e) => { e.preventDefault(); scrollToSection('all-projects-section'); }}>
                  Internship Programs
                </a>
              </li>
              <li>
                <a href="#verify" className="footer-link-btn" onClick={(e) => { e.preventDefault(); scrollToSection('top-projects'); }}>
                  Verify Certificate
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Internship Tracks */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">
              <span>Domain Tracks</span>
            </h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('all-projects-section')}
                  className="footer-link-btn"
                >
                  Web Development
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('all-projects-section')}
                  className="footer-link-btn"
                >
                  AI &amp; Machine Learning
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('all-projects-section')}
                  className="footer-link-btn"
                >
                  UI/UX Design
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('all-projects-section')}
                  className="footer-link-btn"
                >
                  Data Science
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('all-projects-section')}
                  className="footer-link-btn"
                >
                  Cloud &amp; DevOps
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation Action */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">
              <span>Portal Access</span>
            </h4>
            <p className="footer-portal-text">
              Registered interns can log in to view assignments, submit deliverables, and track certification status.
            </p>
            <a
              href="https://internlytic-technologies-final.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-portal-btn btn-tactile"
            >
              <span>Internship Portal Login</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Internlytic Technologies. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top btn-tactile"
            aria-label="Scroll back to top of the page"
          >
            <span>Back to top</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
