import React from 'react';
import { SearchX, FolderOpen, RotateCcw, Sparkles } from 'lucide-react';

export default function EmptyState({ isSearchResult = false, searchQuery = '', onReset }) {
  if (isSearchResult) {
    return (
      <div className="state-container no-results-compact" role="status" aria-live="polite">
        <div className="state-icon-wrapper">
          <SearchX size={32} color="#18B59A" aria-hidden="true" />
          <div className="state-icon-pulse" aria-hidden="true" />
        </div>

        <h3 className="state-title">No matching showcase projects</h3>

        <p className="state-description">
          {searchQuery ? (
            <>
              No results found for "<strong>{searchQuery}</strong>" under your active filters. Try searching with different keywords or reset to view all tracks.
            </>
          ) : (
            'No projects found matching the active track and technology criteria. Broaden your selection to discover more work.'
          )}
        </p>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="btn-primary btn-tactile empty-reset-btn"
            aria-label="Reset all search queries and active filters"
          >
            <RotateCcw size={16} aria-hidden="true" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="state-container" role="status" aria-live="polite">
      <div className="state-icon-wrapper">
        <FolderOpen size={32} color="#18B59A" aria-hidden="true" />
      </div>
      <h3 className="state-title">No projects currently available</h3>
      <p className="state-description">
        The showcase database is currently empty. Please verify that demonstration records have been loaded.
      </p>
    </div>
  );
}
