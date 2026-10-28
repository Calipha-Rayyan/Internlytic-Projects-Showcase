import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ExternalLink, Github, Eye, User, Layers } from 'lucide-react';

export default function ProjectCard({ project, index = 0, onOpenDetails }) {
  const [imgSrc, setImgSrc] = useState(project.thumbnailUrl || '/images/placeholders/fallback.svg');
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef(null);

  // Check prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      // Restrained perspective tilt: 3.5 to 4 degrees max for comfortable, readable 3D depth
      setTilt({
        x: Math.max(-4, Math.min(4, -normY * 4)),
        y: Math.max(-4, Math.min(4, normX * 4)),
        glareX: (x / rect.width) * 100,
        glareY: (y / rect.height) * 100
      });
    });
  }, [prefersReducedMotion]);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    // Smooth return to rest
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleImageError = () => {
    setImgSrc('/images/placeholders/fallback.svg');
  };

  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasGithubUrl = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);

  // Stagger entrance delay calculation (max 480ms)
  const staggerDelay = prefersReducedMotion ? '0ms' : `${Math.min(index * 50, 400)}ms`;

  const cardTransform = prefersReducedMotion
    ? 'none'
    : isHovered
      ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) translateZ(8px)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px)';

  return (
    <article
      ref={cardRef}
      className={`project-card ${isHovered ? 'hovered' : ''}`}
      aria-labelledby={`proj-title-${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: cardTransform,
        animationDelay: staggerDelay,
        transition: isHovered
          ? 'transform 120ms ease-out, box-shadow 150ms ease-out'
          : 'transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 450ms ease-out'
      }}
    >
      {/* Controlled Specular Glare Highlight */}
      {isHovered && !prefersReducedMotion && (
        <div
          className="card-3d-glare"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(24, 181, 154, 0.14) 0%, transparent 65%)`
          }}
          aria-hidden="true"
        />
      )}

      {/* 16:9 Thumbnail preview sitting visually in 3D */}
      <div
        className="card-thumbnail-container"
        onClick={() => onOpenDetails(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenDetails(project);
          }
        }}
        aria-label={`Open details for ${project.projectTitle}`}
      >
        <img
          src={imgSrc}
          alt={`Illustration preview for ${project.projectTitle}`}
          loading="lazy"
          className="card-thumbnail-img"
          onError={handleImageError}
        />
        <div className="card-thumb-overlay" aria-hidden="true">
          <span className="card-quick-view-badge">
            <Eye size={14} /> Quick View
          </span>
        </div>
        <span className="card-track-badge">
          {project.track}
        </span>
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        <button
          type="button"
          onClick={() => onOpenDetails(project)}
          className="card-title-button"
        >
          <h3 id={`proj-title-${project.id}`} className="card-title">
            {project.projectTitle}
          </h3>
        </button>

        <div className="card-intern-row">
          <User size={13} color="#18B59A" aria-hidden="true" />
          <span className="card-intern-name">{project.internName}</span>
        </div>

        <p className="card-description">
          {project.description}
        </p>

        {/* Technology Chips */}
        {Array.isArray(project.technologies) && project.technologies.length > 0 && (
          <div className="card-tech-list" aria-label="Technologies used">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="tech-tag more" title={project.technologies.slice(4).join(', ')}>
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Card Actions Row: Always provides functional, tactile actions */}
        <div className="card-actions-row">
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            className="card-action-btn-primary btn-tactile"
            aria-label={`View full details of ${project.projectTitle}`}
          >
            <Eye size={15} aria-hidden="true" />
            <span>Project Details</span>
          </button>

          {hasLiveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-action-btn-secondary btn-tactile"
              title="Open external live demo"
              aria-label={`View live demo of ${project.projectTitle}`}
            >
              <ExternalLink size={14} aria-hidden="true" />
              <span>Live Demo</span>
            </a>
          ) : hasGithubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-action-btn-secondary btn-tactile"
              title="Open GitHub repository"
              aria-label={`View GitHub repository for ${project.projectTitle}`}
            >
              <Github size={14} aria-hidden="true" />
              <span>Source Code</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onOpenDetails(project)}
              className="card-action-btn-secondary btn-tactile"
              aria-label={`View architecture stack for ${project.projectTitle}`}
            >
              <Layers size={14} aria-hidden="true" />
              <span>Stack Specs</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
