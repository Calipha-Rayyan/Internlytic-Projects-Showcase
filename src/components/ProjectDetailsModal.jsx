import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, Calendar, Info, User, Layers, Tag, ShieldAlert } from 'lucide-react';

export default function ProjectDetailsModal({ project, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  // Focus trap and lifecycle management
  useEffect(() => {
    previousActiveElementRef.current = document.activeElement;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button initially
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    // Keyboard handlers: Escape to close & Tab trap
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      // Restore focus to opening trigger
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [onClose]);

  if (!project) return null;

  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasGithubUrl = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Modal Thumbnail Header */}
        <div className="modal-header">
          <img
            src={project.thumbnailUrl || '/images/placeholders/fallback.svg'}
            alt={`Detailed preview illustration of ${project.projectTitle}`}
            className="modal-header-img"
            onError={(e) => {
              e.target.src = '/images/placeholders/fallback.svg';
            }}
          />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close project details modal"
            title="Close (Esc)"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="modal-body">
          <div className="modal-tags-row">
            <span className="modal-track-badge">
              {project.track}
            </span>
            {project.rank ? (
              <span className="modal-rank-badge">
                <span className="trophy-emoji">🏆</span>
                <span>Top {project.rank} Intern Selection</span>
              </span>
            ) : (
              <span className="modal-status-badge">
                <Info size={13} aria-hidden="true" />
                <span>Showcase Project</span>
              </span>
            )}
            {project.internId && (
              <span className="modal-intern-id-badge">
                ID: {project.internId}
              </span>
            )}
          </div>

          <h2 id="modal-project-title" className="modal-title">
            {project.projectTitle}
          </h2>

          {/* Metadata Grid */}
          <div className="modal-meta-grid">
            <div className="meta-card">
              <div className="modal-meta-item-label">Creator / Intern Name</div>
              <div className="modal-meta-item-value">
                <User size={15} color="#18B59A" aria-hidden="true" />
                <span className="intern-name-highlight">{project.internName}</span>
              </div>
            </div>

            <div className="meta-card">
              <div className="modal-meta-item-label">Specialization Track</div>
              <div className="modal-meta-item-value">
                <Layers size={15} color="#18B59A" aria-hidden="true" />
                <span>{project.track}</span>
              </div>
            </div>

            <div className="meta-card">
              <div className="modal-meta-item-label">Architecture &amp; Stack</div>
              <div className="modal-meta-item-value">
                <Tag size={15} color="#18B59A" aria-hidden="true" />
                <span>{project.technologies ? `${project.technologies.length} Technologies` : 'Modular Stack'}</span>
              </div>
            </div>

            <div className="meta-card">
              <div className="modal-meta-item-label">Status Verification</div>
              <div className="modal-meta-item-value">
                <Info size={15} color="#18B59A" aria-hidden="true" />
                <span>{project.approvalStatus || 'Showcase Project'}</span>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="modal-description-block">
            <h3 className="modal-section-heading">Project Overview &amp; Architecture</h3>
            <p className="modal-full-description">
              {project.description}
            </p>
          </div>

          {/* Technology Architecture Stack */}
          {Array.isArray(project.technologies) && project.technologies.length > 0 && (
            <div className="modal-tech-block">
              <h3 className="modal-section-heading">Technology Stack &amp; Libraries</h3>
              <div className="modal-tech-stack" aria-label="Technology components">
                {project.technologies.map((tech) => (
                  <span key={tech} className="modal-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer with High-Contrast Buttons */}
        <div className="modal-footer">
          {/* Explicit, High-Contrast Close Action (Fixed contrast issue) */}
          <button
            type="button"
            onClick={onClose}
            className="modal-action-btn-close btn-tactile"
            aria-label="Close project details"
          >
            <span>Close Details</span>
          </button>

          {hasGithubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn-secondary btn-tactile"
            >
              <Github size={16} aria-hidden="true" />
              <span>GitHub Repository</span>
            </a>
          )}

          {hasLiveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn-primary btn-tactile"
            >
              <span>View Project</span>
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
