import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message = 'An unexpected error occurred while loading projects.', onRetry }) {
  return (
    <div className="state-container error-state" role="alert" aria-live="assertive">
      <div className="state-icon-wrapper">
        <AlertTriangle size={34} aria-hidden="true" />
      </div>
      <h3 className="state-title">Unable to Load Showcase Data</h3>
      <p className="state-description">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn-primary"
          aria-label="Retry loading project records"
        >
          <RefreshCw size={16} aria-hidden="true" />
          <span>Retry Operation</span>
        </button>
      )}
    </div>
  );
}
