import React, { useRef, useEffect, useState } from 'react';
import { RefreshCw, ArrowDown, Sparkles, Compass } from 'lucide-react';
import Hero3DStage from './Hero3DStage';

export default function Hero({ metrics = { totalProjects: 10, totalTracks: 6, distinctTechnologies: 24 }, onRefreshProjects }) {
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Performance: Pause video when hero is scrolled off-screen or tab is hidden
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

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    if (onRefreshProjects) {
      onRefreshProjects();
    }
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const scrollToGallery = (e) => {
    e.preventDefault();
    const el = document.getElementById('gallery-section');
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="hero-section company-hero" aria-labelledby="hero-heading">
      {/* 1. Looping Video Background */}
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
        <div className="hero-video-scrim" />
      </div>

      <div className="hero-grid-pattern" aria-hidden="true" />

      {/* 2. Main Two-Column Hero Content */}
      <div className="container hero-container">
        {/* Left Column matching original company website layout from video frame-2s.png */}
        <div className="hero-left-col">
          <div className="company-eyebrow">
            INTERNLYTIC TECHNOLOGIES
          </div>

          <h1 id="hero-heading" className="hero-title">
            Projects <span className="hero-title-accent">Showcase</span>
          </h1>

          <p className="hero-description">
            Discover projects created by our talented interns across AI, Web Development, Cloud, and Design.
          </p>

          <div className="hero-actions">
            {/* Real website's Refresh Projects pill button */}
            <button
              type="button"
              onClick={handleRefreshClick}
              className="refresh-projects-btn btn-3d-lift"
              aria-label="Refresh project showcase list"
            >
              <RefreshCw size={16} className={isRefreshing ? 'spin-anim' : ''} />
              <span>Refresh projects</span>
            </button>

            <a
              href="#gallery-section"
              onClick={scrollToGallery}
              className="btn-primary hero-btn-3d"
            >
              <span>Explore Gallery</span>
              <ArrowDown size={17} />
            </a>
          </div>

          {/* Dynamic Showcase Metrics */}
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
              <span className="hero-stat-label">Technologies</span>
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
