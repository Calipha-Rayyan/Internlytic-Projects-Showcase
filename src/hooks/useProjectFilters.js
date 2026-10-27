import { useState, useMemo, useCallback } from 'react';

/**
 * Custom hook to manage search queries, category filters, and active results
 * @param {Array} projects - List of all projects
 */
export function useProjectFilters(projects = []) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('All Tracks');
  const [selectedTech, setSelectedTech] = useState('');

  // Extract all unique technologies from projects
  const availableTechnologies = useMemo(() => {
    const techSet = new Set();
    projects.forEach((p) => {
      if (Array.isArray(p.technologies)) {
        p.technologies.forEach((tech) => techSet.add(tech));
      }
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Count projects per track for filter pills
  const trackCounts = useMemo(() => {
    const counts = { 'All Tracks': projects.length };
    projects.forEach((p) => {
      if (p.track) {
        counts[p.track] = (counts[p.track] || 0) + 1;
      }
    });
    return counts;
  }, [projects]);

  // Filtered results
  const filteredProjects = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      // 1. Search Query filter (matches project title OR intern name OR tech tags)
      if (trimmedQuery) {
        const titleMatch = project.projectTitle
          ? project.projectTitle.toLowerCase().includes(trimmedQuery)
          : false;
        const internMatch = project.internName
          ? project.internName.toLowerCase().includes(trimmedQuery)
          : false;
        const techMatch = Array.isArray(project.technologies)
          ? project.technologies.some((t) => t.toLowerCase().includes(trimmedQuery))
          : false;

        if (!titleMatch && !internMatch && !techMatch) {
          return false;
        }
      }

      // 2. Track / Category filter
      if (selectedTrack !== 'All Tracks') {
        if (project.track !== selectedTrack) {
          return false;
        }
      }

      // 3. Optional technology filter
      if (selectedTech) {
        if (
          !Array.isArray(project.technologies) ||
          !project.technologies.includes(selectedTech)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [projects, searchQuery, selectedTrack, selectedTech]);

  const isFiltered = Boolean(
    searchQuery.trim() !== '' ||
    selectedTrack !== 'All Tracks' ||
    selectedTech !== ''
  );

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTrack('All Tracks');
    setSelectedTech('');
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    selectedTrack,
    setSelectedTrack,
    selectedTech,
    setSelectedTech,
    trackCounts,
    availableTechnologies,
    filteredProjects,
    totalProjectsCount: projects.length,
    filteredCount: filteredProjects.length,
    isFiltered,
    resetFilters
  };
}
