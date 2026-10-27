import React from 'react';
import { SearchX, FolderOpen, RotateCcw } from 'lucide-react';

export default function EmptyState({ isSearchResult = false, searchQuery = '', onReset }) {
  if (isSearchResult) {
    return (
      <div className="state-container" role="status" aria-live="polite">
        <div className="state-icon-wrapper">
          <SearchX size={34} aria-hidden="true" />
        </div>
        <h3 className="state-title">No projects match your search</h3>
        <p className="state-description">
          {searchQuery ? (
            <>
              We couldn't find any projects matching "<strong>{searchQuery}</strong>" with the selected filters. Try searching with different keywords or clearing your active filters.
            </>
          ) : (
            'No projects found matching the selected track criteria. Try broadening your filter selection.'
          )}
        </p>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="btn-primary"
            aria-label="Reset all search queries and filters"
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
        <FolderOpen size={34} aria-hidden="true" />
      </div>
      <h3 className="state-title">No projects currently available</h3>
      <p className="state-description">
        The showcase database is currently empty. Please check back later or verify that demonstration records have been loaded.
      </p>
    </div>
  );
}
