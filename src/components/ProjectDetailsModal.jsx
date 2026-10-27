import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, Calendar, CheckCircle2, User, Layers, Tag } from 'lucide-react';

export default function ProjectDetailsModal({ project, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  // Store trigger element and manage focus
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
      // Restore focus to opener
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

        {/* Modal Body */}
        <div className="modal-body">
          <span className="modal-track-badge">
            {project.track}
          </span>

          <h2 id="modal-project-title" className="modal-title">
            {project.projectTitle}
          </h2>

          {/* Metadata Grid */}
          <div className="modal-meta-grid">
            <div>
              <div className="modal-meta-item-label">Creator / Intern</div>
              <div className="modal-meta-item-value" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={15} color="#18B59A" aria-hidden="true" />
                <span>{project.internName}</span>
              </div>
            </div>

            <div>
              <div className="modal-meta-item-label">Track / Domain</div>
              <div className="modal-meta-item-value" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={15} color="#18B59A" aria-hidden="true" />
                <span>{project.track}</span>
              </div>
            </div>

            <div>
              <div className="modal-meta-item-label">Showcase Record Date</div>
              <div className="modal-meta-item-value" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={15} color="#18B59A" aria-hidden="true" />
                <span>{project.createdAt || '2026 Season'}</span>
              </div>
            </div>

            <div>
              <div className="modal-meta-item-label">Verification Status</div>
              <div className="modal-meta-item-value" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={15} color="#18B59A" aria-hidden="true" />
                <span style={{ textTransform: 'capitalize' }}>{project.approvalStatus || 'Curated Sample'}</span>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h3 className="modal-section-heading">Project Overview</h3>
            <p className="modal-full-description">
              {project.description}
            </p>
          </div>

          {/* Technology Stack */}
          {Array.isArray(project.technologies) && project.technologies.length > 0 && (
            <div>
              <h3 className="modal-section-heading">Technology Architecture</h3>
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

        {/* Modal Actions Footer */}
        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Close Details
          </button>

          {hasLiveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>View Project</span>
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          )}

          {hasGithubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ backgroundColor: '#073A40', color: '#FFFFFF', borderColor: '#18B59A' }}
            >
              <Github size={16} aria-hidden="true" />
              <span>GitHub Repository</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
