import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange, onClearSearch }) {
  const inputRef = useRef(null);

  const handleClear = () => {
    onClearSearch();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && searchQuery) {
      handleClear();
    }
  };

  return (
    <div className="search-form" role="search">
      <label htmlFor="project-search-input" className="sr-only">
        Search projects by title or intern name
      </label>
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} aria-hidden="true" />
        <input
          ref={inputRef}
          id="project-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by project title or intern name..."
          className="search-input"
          autoComplete="off"
          spellCheck="false"
        />
        {searchQuery.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="search-clear-btn"
            aria-label="Clear search input"
            title="Clear search"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
