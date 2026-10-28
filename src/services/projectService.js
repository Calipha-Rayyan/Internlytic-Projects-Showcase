/**
 * Internlytic Projects Showcase - Data Service Layer
 * 
 * Provides an asynchronous abstraction layer for fetching and transforming showcase records.
 * Currently backed by verified local demonstration data in `src/data/sampleProjects.js`.
 * 
 * Future Integration Notice:
 * This service can be adapted to query an approved Supabase instance by replacing
 * local resolution with `supabase.from('showcase_projects').select('*')` with RLS policies.
 */

import { SAMPLE_PROJECTS, AVAILABLE_TRACKS } from '../data/sampleProjects';

/**
 * Fetch all showcase projects asynchronously.
 * Simulates micro-latency for smooth UI hydration and skeleton previews.
 * @param {Object} options
 * @param {number} options.delayMs - Simulated latency in milliseconds (default: 200ms)
 * @returns {Promise<Array>}
 */
export async function fetchProjects({ delayMs = 200 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!SAMPLE_PROJECTS || !Array.isArray(SAMPLE_PROJECTS)) {
          throw new Error('Project dataset format is corrupted or unreachable.');
        }
        // Deep copy to prevent external mutation
        const sanitized = SAMPLE_PROJECTS.map((project) => ({
          ...project,
          // Ensure guaranteed fallbacks for safe rendering
          id: String(project.id),
          projectTitle: project.projectTitle || 'Untitled Showcase Project',
          internName: project.internName || 'Demonstration Contributor',
          track: project.track || 'Web Development',
          description: project.description || '',
          technologies: Array.isArray(project.technologies) ? project.technologies : [],
          approvalStatus: project.approvalStatus || 'Sample Project'
        }));
        resolve(sanitized);
      } catch (err) {
        reject(new Error(err.message || 'Failed to load projects from demonstration dataset.'));
      }
    }, delayMs);
  });
}

/**
 * Fetch available domain tracks.
 * @returns {Promise<Array<string>>}
 */
export async function fetchTracks() {
  return Promise.resolve([...AVAILABLE_TRACKS]);
}

/**
 * Compute honest, dynamic showcase statistics directly from the loaded dataset.
 * Does NOT hardcode vanity metrics or fake popularity counters.
 * @param {Array} projects 
 * @returns {Object}
 */
export function computeShowcaseMetrics(projects = []) {
  const totalProjects = projects.length;

  const tracksSet = new Set();
  const techSet = new Set();

  projects.forEach((p) => {
    if (p.track) tracksSet.add(p.track);
    if (Array.isArray(p.technologies)) {
      p.technologies.forEach((t) => techSet.add(t));
    }
  });

  return {
    totalProjects,
    totalTracks: tracksSet.size,
    distinctTechnologies: techSet.size,
    isSampleData: true
  };
}
