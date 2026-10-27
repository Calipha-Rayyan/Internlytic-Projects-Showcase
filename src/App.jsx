import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
      const data = await fetchProjects({ delayMs: 220 });
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
      {/* Navigation Header */}
      <Navbar />

      {/* Demonstration Notice */}
      <NoticeBanner />

      <main id="main-content">
        {/* Two-Column Hero Section with 3D Scene and Video Background */}
        <Hero metrics={showcaseMetrics} />

        {/* Search & Filter Toolbar Section */}
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
