import React from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectsGrid({ projects, onOpenDetails }) {
  return (
    <div
      className="projects-grid"
      role="region"
      aria-label="Projects Gallery Grid"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
}
