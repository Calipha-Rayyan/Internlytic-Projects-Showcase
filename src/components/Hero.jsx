import React, { useRef, useEffect, useState } from 'react';
import { ArrowDown, Filter, Sparkles } from 'lucide-react';
import Hero3DStage from './Hero3DStage';

export default function Hero({ metrics = { totalProjects: 10, totalTracks: 6, distinctTechnologies: 24 } }) {
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Performance: Pause video when hero section is scrolled off-screen or tab is hidden
  useEffect(() => {
    if (prefersReducedMotion) return;

    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoEl.paused) {
              videoEl.play().catch(() => {});
            }
          } else {
            if (!videoEl.paused) {
              videoEl.pause();
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        if (!videoEl.paused) videoEl.pause();
      } else {
        if (videoEl.paused) videoEl.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [prefersReducedMotion]);

  const scrollToGallery = (e) => {
    e.preventDefault();
    const galleryEl = document.getElementById('gallery-section');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFilters = (e) => {
    e.preventDefault();
    const filterEl = document.getElementById('filter-toolbar');
    if (filterEl) {
      filterEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="hero-section" aria-labelledby="hero-heading">
      {/* 1. Genuine Looping Video Animation Background */}
      <div className="hero-video-container" aria-hidden="true">
        {!prefersReducedMotion ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/showcase-hero-poster.jpg"
            className={`hero-video-bg ${isVideoLoaded ? 'loaded' : ''}`}
            onCanPlay={() => setIsVideoLoaded(true)}
          >
            <source src="/videos/showcase-hero.webm" type="video/webm" />
          </video>
        ) : (
          <img
            src="/videos/showcase-hero-poster.jpg"
            alt=""
            className="hero-video-bg loaded"
          />
        )}
        {/* Controlled Overlay Scrim for Text Contrast */}
        <div className="hero-video-scrim" />
      </div>

      {/* 2. Geometric Grid Pattern */}
      <div className="hero-grid-pattern" aria-hidden="true" />

      {/* 3. Main Two-Column Hero Content */}
      <div className="container hero-container">
        {/* Left Column: Typography, Actions, and Dynamic Metrics */}
        <div className="hero-left-col">
          <div className="hero-tag">
            <Sparkles size={14} aria-hidden="true" />
            <span>Internship Project Gallery • 2026 Showcase</span>
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
              className="btn-primary hero-btn-3d"
            >
              <span>Explore All Projects</span>
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a
              href="#filter-toolbar"
              onClick={scrollToFilters}
              className="btn-secondary hero-btn-3d"
            >
              <Filter size={16} aria-hidden="true" />
              <span>Filter by Track</span>
            </a>
          </div>

          {/* Dynamic Metrics (Honest, Computed directly from Data) */}
          <div className="hero-stats" role="region" aria-label="Showcase Overview Metrics">
            <div className="hero-stat-item">
              <span className="hero-stat-value">{metrics.totalProjects || 10}</span>
              <span className="hero-stat-label">Showcase Projects</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">{metrics.totalTracks || 6}</span>
              <span className="hero-stat-label">Specialized Tracks</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">{metrics.distinctTechnologies || 20}+</span>
              <span className="hero-stat-label">Tech Components</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Hero Scene */}
        <div className="hero-right-col">
          <Hero3DStage />
        </div>
      </div>
    </section>
  );
}
