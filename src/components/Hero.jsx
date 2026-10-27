import React from 'react';
import { ArrowDown, Layers, Code, Users } from 'lucide-react';

export default function Hero({ totalProjects = 10, totalTracks = 6 }) {
  const scrollToGallery = (e) => {
    e.preventDefault();
    const galleryEl = document.getElementById('gallery-section');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="hero-grid-pattern" aria-hidden="true" />

      <div className="container">
        <div className="hero-content">
          <div className="hero-tag">
            <Layers size={14} aria-hidden="true" />
            <span>Internship Project Gallery</span>
          </div>

          <h1 id="hero-heading" className="hero-title">
            Discover. Explore. <span className="hero-title-accent">Build.</span>
          </h1>

          <p className="hero-description">
            Explore projects created by interns, discover new ideas, and see the technologies behind each project across AI, Web Development, Cloud, and Design.
          </p>

          <div className="hero-actions">
            <a
              href="#gallery-section"
              onClick={scrollToGallery}
              className="btn-primary"
            >
              <span>Explore All Projects</span>
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a
              href="#filter-toolbar"
              className="btn-secondary"
            >
              <span>Filter by Track</span>
            </a>
          </div>

          {/* Demonstration Key Stats */}
          <div className="hero-stats" role="region" aria-label="Showcase Overview Metrics">
            <div className="hero-stat-item">
              <span className="hero-stat-value">{totalProjects}</span>
              <span className="hero-stat-label">Showcase Projects</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">{totalTracks}</span>
              <span className="hero-stat-label">Specialized Tracks</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">100%</span>
              <span className="hero-stat-label">Curated Sample Records</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
