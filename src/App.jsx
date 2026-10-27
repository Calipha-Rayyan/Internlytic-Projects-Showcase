import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import NoticeBanner from './components/NoticeBanner';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import FilterControls from './components/FilterControls';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import LoadingState from './components/LoadingState';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import Footer from './components/Footer';

import { SAMPLE_PROJECTS } from './data/sampleProjects';
import { useProjectFilters } from './hooks/useProjectFilters';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Load project records (simulating clean local retrieval with graceful lifecycle)
  const loadProjectData = useCallback(() => {
    setIsLoading(true);
    setLoadError(null);

    // Initial mount hydration with brief transition for skeleton preview
    const timer = setTimeout(() => {
      try {
        if (!SAMPLE_PROJECTS || !Array.isArray(SAMPLE_PROJECTS)) {
          throw new Error('Project dataset format is invalid or unreachable.');
        }
        setProjects(SAMPLE_PROJECTS);
        setIsLoading(false);
      } catch (err) {
        setLoadError(err.message || 'Failed to initialize project records.');
        setIsLoading(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cleanup = loadProjectData();
    return cleanup;
  }, [loadProjectData]);

  // Integrated search & track filtering hook
  const {
    searchQuery,
    setSearchQuery,
    selectedTrack,
    setSelectedTrack,
    selectedTech,
    setSelectedTech,
    trackCounts,
    availableTechnologies,
    filteredProjects,
    totalProjectsCount,
    filteredCount,
    isFiltered,
    resetFilters
  } = useProjectFilters(projects);

  return (
    <div className="app-root">
      {/* Navigation Header */}
      <Navbar />

      {/* Demonstration Notice */}
      <NoticeBanner />

      <main id="main-content">
        {/* Hero Section */}
        <Hero
          totalProjects={totalProjectsCount}
          totalTracks={Object.keys(trackCounts).length - 1}
        />

        {/* Search & Filter Toolbar */}
        <section className="toolbar-section">
          <div className="container">
            <div className="toolbar-card">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClearSearch={() => setSearchQuery('')}
              />

              <FilterControls
                selectedTrack={selectedTrack}
                onSelectTrack={setSelectedTrack}
                selectedTech={selectedTech}
                onSelectTech={setSelectedTech}
                availableTechnologies={availableTechnologies}
                trackCounts={trackCounts}
                totalCount={totalProjectsCount}
                filteredCount={filteredCount}
                isFiltered={isFiltered}
                onResetFilters={resetFilters}
              />
            </div>
          </div>
        </section>

        {/* Projects Gallery Section */}
        <section
          id="gallery-section"
          className="gallery-section"
          aria-label="Projects Showcase Gallery"
        >
          <div className="container">
            {/* 1. Loading State */}
            {isLoading && <LoadingState count={6} />}

            {/* 2. Error State */}
            {!isLoading && loadError && (
              <ErrorState message={loadError} onRetry={loadProjectData} />
            )}

            {/* 3. Empty Repository State */}
            {!isLoading && !loadError && projects.length === 0 && (
              <EmptyState isSearchResult={false} />
            )}

            {/* 4. No Filter Matches State */}
            {!isLoading && !loadError && projects.length > 0 && filteredProjects.length === 0 && (
              <EmptyState
                isSearchResult={true}
                searchQuery={searchQuery}
                onReset={resetFilters}
              />
            )}

            {/* 5. Success State: Projects Grid */}
            {!isLoading && !loadError && filteredProjects.length > 0 && (
              <ProjectsGrid
                projects={filteredProjects}
                onOpenDetails={setSelectedProject}
              />
            )}
          </div>
        </section>
      </main>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
