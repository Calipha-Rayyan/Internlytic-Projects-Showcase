import React from 'react';

export default function LoadingState({ count = 6 }) {
  return (
    <div className="loading-grid" aria-label="Loading projects" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card" aria-hidden="true">
          <div className="skeleton-thumb" />
          <div className="skeleton-body">
            <div className="skeleton-line w-50" />
            <div className="skeleton-line w-80" />
            <div className="skeleton-line w-100" />
            <div className="skeleton-line w-65" />
          </div>
        </div>
      ))}
    </div>
  );
}
