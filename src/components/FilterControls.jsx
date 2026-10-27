import React from 'react';
import { Filter, RotateCcw, Tag } from 'lucide-react';
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
    <div className="filter-tracks-wrapper" id="filter-toolbar" role="region" aria-label="Category and Track Filters">
      <div className="filter-header-row">
        <div className="filter-label">
          <Filter size={15} aria-hidden="true" />
          <span>Filter by Track / Domain</span>
        </div>

        {/* Optional Technology Filter Dropdown */}
        {availableTechnologies.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label htmlFor="tech-filter-select" className="filter-label" style={{ marginBottom: 0 }}>
              <Tag size={14} aria-hidden="true" />
              <span>Tech:</span>
            </label>
            <select
              id="tech-filter-select"
              value={selectedTech}
              onChange={(e) => onSelectTech(e.target.value)}
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-deep-blue)',
                backgroundColor: 'var(--color-surface-muted)',
                border: '1px solid var(--color-border-main)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.3rem 0.6rem',
                cursor: 'pointer'
              }}
              aria-label="Filter by technology"
            >
              <option value="">All Technologies</option>
              {availableTechnologies.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Track Pills */}
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
              <span>{track}</span>
              <span className="filter-pill-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Summary status and Reset button */}
      <div className="toolbar-status-row">
        <span className="results-count-text">
          Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> projects
          {selectedTrack !== 'All Tracks' && ` in "${selectedTrack}"`}
          {selectedTech && ` using ${selectedTech}`}
        </span>

        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="reset-filters-btn"
            aria-label="Reset all search queries and active filters"
          >
            <RotateCcw size={14} aria-hidden="true" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
