import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange, onClearSearch }) {
  const inputRef = useRef(null);

  // Global keyboard shortcut '/' to focus search bar
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

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
        Search projects by title, intern creator, or technology
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
          placeholder="Search by title, intern, or tech..."
          className="search-input"
          autoComplete="off"
          spellCheck="false"
        />
        {searchQuery.length > 0 ? (
          <button
            type="button"
            onClick={handleClear}
            className="search-clear-btn"
            aria-label="Clear search input"
            title="Clear search (Esc)"
          >
            <X size={16} aria-hidden="true" />
          </button>
        ) : (
          <span className="search-shortcut-hint" aria-hidden="true">
            /
          </span>
        )}
      </div>
    </div>
  );
}
