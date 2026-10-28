import React, { useState, useRef } from 'react';
import { TOP_5_INTERN_PROJECTS } from '../data/sampleProjects';

/**
 * 3D Interactive Top 5 Intern Projects Section
 * Faithfully mirrors the official Internlytic Technologies showcase concept
 * identified in the corporate video walkthrough.
 */
export default function TopProjectsSection({ onOpenDetails }) {
  const [activeRank, setActiveRank] = useState(null);

  return (
    <section className="top-projects-section" id="top-projects">
      <div className="container">
        <div className="top-projects-header">
          <div className="top-badge-pill">
            <span className="trophy-icon">🏆</span>
            <span>EXECUTIVE SELECTION</span>
          </div>
          <h2 className="top-projects-title">Top 5 Intern Projects</h2>
          <p className="top-projects-subtitle">
            Selected by the CEO for outstanding quality, creativity, and execution.
          </p>
        </div>

        <div className="top-projects-grid">
          {TOP_5_INTERN_PROJECTS.map((project) => (
            <TopProject3DCard
              key={project.id}
              project={project}
              onOpenDetails={onOpenDetails}
              isActive={activeRank === project.rank}
              onHover={() => setActiveRank(project.rank)}
              onLeave={() => setActiveRank(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 3D Interactive Certificate Card Component with Dynamic Perspective Tilt & Glare
 */
function TopProject3DCard({ project, onOpenDetails, isActive, onHover, onLeave }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px) scale3d(1.02, 1.02, 1.02)`
    );

    setGlareStyle({
      opacity: 0.7,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4) 0%, rgba(24,181,154,0.15) 45%, transparent 70%)`
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0 });
    onLeave();
  };

  return (
    <article
      ref={cardRef}
      className={`top-project-card ${isActive ? 'is-active' : ''}`}
      style={{ transform: transformStyle }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D dynamic reflection / specular glare overlay */}
      <div className="card-3d-glare" style={glareStyle} aria-hidden="true" />

      {/* Top green header banner with rank trophy */}
      <div className="top-card-banner">
        <div className="top-rank-badge">
          <span className="trophy-emoji">🏆</span>
          <span className="rank-text">TOP {project.rank}</span>
        </div>
        <div className="top-intern-id">
          <span>ID: {project.internId}</span>
        </div>
      </div>

      {/* Card Certificate Body */}
      <div className="top-card-body">
        <p className="certificate-lead">This certificate is proudly presented to</p>
        <h3 className="intern-name-script">{project.internName}</h3>

        <div className="project-title-divider" />

        <div className="project-focus-wrap">
          <span className="track-badge-tiny">{project.track}</span>
          <h4 className="top-project-title">{project.projectTitle}</h4>
        </div>

        <p className="ceo-message-quote">
          "Great work! Keep growing with Internlytic."
        </p>

        {/* Technology Pills */}
        <div className="top-card-tags">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="tech-pill-micro">{tech}</span>
          ))}
          {project.technologies.length > 3 && (
            <span className="tech-pill-micro tech-more">+{project.technologies.length - 3}</span>
          )}
        </div>

        {/* Action Controls */}
        <div className="top-card-actions">
          {project.liveUrl && project.liveUrl !== '#' ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="top-btn-preview"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Live Preview</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          ) : (
            <button
              type="button"
              className="top-btn-preview"
              onClick={() => onOpenDetails(project)}
            >
              <span>Live Preview</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
          )}

          <button
            type="button"
            className="top-btn-details"
            onClick={() => onOpenDetails(project)}
          >
            <span>View Details</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
