import React from 'react';
import { Filter, RotateCcw, Tag, Check, ChevronDown } from 'lucide-react';
import { AVAILABLE_TRACKS } from '../data/sampleProjects';

export default function FilterControls({
  selectedTrack,
  onSelectTrack,
  selectedTech,
  onSelectTech,
  availableTechnologies = [],
  trackCounts = {},
  totalCount = 0,
  filteredCount = 0,
  isFiltered = false,
  onResetFilters
}) {
  return (
    <div className="filter-toolbar-inner" id="filter-toolbar" role="region" aria-label="Category and Track Filters">
      {/* Top Filter Bar: Track Header and Technology Dropdown */}
      <div className="filter-header-row">
        <div className="filter-label">
          <Filter size={15} color="#18B59A" aria-hidden="true" />
          <span>Filter by Track / Domain</span>
        </div>

        {/* Technology Filter Dropdown */}
        {availableTechnologies.length > 0 && (
          <div className="tech-filter-group">
            <label htmlFor="tech-filter-select" className="tech-filter-label">
              <Tag size={13} color="#18B59A" aria-hidden="true" />
              <span>Tech:</span>
            </label>
            <div className="tech-select-wrapper">
              <select
                id="tech-filter-select"
                value={selectedTech}
                onChange={(e) => onSelectTech(e.target.value)}
                className="tech-filter-select"
                aria-label="Filter by technology"
              >
                <option value="">All Tech Stacks ({availableTechnologies.length})</option>
                {availableTechnologies.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="select-chevron" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>

      {/* Track Pills List */}
      <div className="filter-pills-list" role="tablist" aria-label="Track Categories">
        {AVAILABLE_TRACKS.map((track) => {
          const isActive = selectedTrack === track;
          const count = trackCounts[track] || 0;

          return (
            <button
              key={track}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`filter-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTrack(track)}
            >
              {isActive && <Check size={13} className="pill-check-icon" aria-hidden="true" />}
              <span>{track}</span>
              <span className="filter-pill-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Toolbar Status Row: Result Counter & Reset Button */}
      <div className="toolbar-status-row">
        <div className="results-count-text">
          Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> showcase projects
          {selectedTrack !== 'All Tracks' && (
            <span className="active-filter-indicator">
              in <em>"{selectedTrack}"</em>
            </span>
          )}
          {selectedTech && (
            <span className="active-filter-indicator">
              with <em>"{selectedTech}"</em>
            </span>
          )}
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="reset-filters-btn"
            aria-label="Reset all search queries and active filters"
          >
            <RotateCcw size={14} aria-hidden="true" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
