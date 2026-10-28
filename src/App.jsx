import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TopProjectsSection from './components/TopProjectsSection';
import SearchBar from './components/SearchBar';
import FilterControls from './components/FilterControls';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import LoadingState from './components/LoadingState';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import Footer from './components/Footer';

import { fetchProjects, computeShowcaseMetrics } from './services/projectService';
import { useProjectFilters } from './hooks/useProjectFilters';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Load project records via service layer
  const loadProjectData = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await fetchProjects({ delayMs: 180 });
      setProjects(data);
      setIsLoading(false);
    } catch (err) {
      setLoadError(err.message || 'Failed to initialize project records.');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjectData();
  }, [loadProjectData]);

  // Compute live showcase metrics from loaded dataset
  const showcaseMetrics = useMemo(() => {
    return computeShowcaseMetrics(projects);
  }, [projects]);

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
      {/* Navigation Header with Real Logo & Official Company Navigation */}
      <Navbar />

      <main id="main-content">
        {/* Hero Section with Looping Video & Interactive 3D Stage */}
        <Hero
          metrics={showcaseMetrics}
          onRefreshProjects={loadProjectData}
        />

        {/* Featured "Top 5 Intern Projects" Section (Original Company Concept from Video) */}
        {!isLoading && !loadError && (
          <TopProjectsSection
            projects={projects.slice(0, 5)}
            onOpenDetails={setSelectedProject}
          />
        )}

        {/* 3D Search & Filter Command Deck */}
        <section className="toolbar-section" id="all-projects-section">
          <div className="container">
            <div className="section-title-wrapper">
              <h2 className="all-projects-heading">All Projects</h2>
              <p className="all-projects-sub">Explore and filter across all internship tracks and technologies.</p>
            </div>

            <div className="toolbar-card toolbar-3d-deck">
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

        {/* 3D Projects Showcase Gallery */}
        <section
          id="gallery-section"
          className="gallery-section"
          aria-label="Projects Showcase Gallery"
        >
          <div className="container">
            {/* 1. Loading Skeleton State */}
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

            {/* 5. Success State: Interactive 3D Projects Grid */}
            {!isLoading && !loadError && filteredProjects.length > 0 && (
              <ProjectsGrid
                projects={filteredProjects}
                onOpenDetails={setSelectedProject}
              />
            )}
          </div>
        </section>
      </main>

      {/* 3D Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Footer matching Original Company Architecture */}
      <Footer />
    </div>
  );
}
