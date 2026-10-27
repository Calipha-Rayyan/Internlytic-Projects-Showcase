import React, { useState } from 'react';
import { ExternalLink, Github, Eye, User } from 'lucide-react';

export default function ProjectCard({ project, onOpenDetails }) {
  const [imgSrc, setImgSrc] = useState(project.thumbnailUrl || '/images/placeholders/fallback.svg');

  const handleImageError = () => {
    setImgSrc('/images/placeholders/fallback.svg');
  };

  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasGithubUrl = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);

  return (
    <article className="project-card" aria-labelledby={`proj-title-${project.id}`}>
      {/* Thumbnail area */}
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
          alt={`Demonstration preview of ${project.projectTitle}`}
          loading="lazy"
          className="card-thumbnail-img"
          onError={handleImageError}
        />
        <span className="card-track-badge">
          {project.track}
        </span>
      </div>

      {/* Card Content */}
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
          <User size={13} aria-hidden="true" />
          <span className="card-intern-name">{project.internName}</span>
        </div>

        <p className="card-description">
          {project.description}
        </p>

        {/* Technology Badges */}
        {Array.isArray(project.technologies) && project.technologies.length > 0 && (
          <div className="card-tech-list" aria-label="Technologies used">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="tech-tag" title={project.technologies.slice(4).join(', ')}>
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Actions Row */}
        <div className="card-actions-row">
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            className="card-action-btn-primary"
            aria-label={`View full details of ${project.projectTitle}`}
          >
            <Eye size={15} aria-hidden="true" />
            <span>Details</span>
          </button>

          {/* Conditional External Actions - Only rendered when valid URLs exist */}
          {hasLiveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link-icon-btn"
              title="View live demo (opens in new tab)"
              aria-label={`View live demo of ${project.projectTitle}`}
            >
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          )}

          {hasGithubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link-icon-btn"
              title="View GitHub repository (opens in new tab)"
              aria-label={`View GitHub repository for ${project.projectTitle}`}
            >
              <Github size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
