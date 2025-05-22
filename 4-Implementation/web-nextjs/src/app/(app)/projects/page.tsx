"use client";

import Link from 'next/link';

export default function ProjectsPage() {
  const projects = [
    { id: '12345', name: 'Alpha Project', description: 'Initial phase of the new platform development.' },
    { id: '67890', name: 'Beta Initiative', description: 'Testing and refinement of core features.' },
    { id: 'ABCDE', name: 'Gamma Development', description: 'Scaling and performance optimization.' },
    { id: 'XYZ001', name: 'Delta Deployment', description: 'Preparation for production release.' },
  ];

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Projects</h1>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Project List</h2>
        {projects.length > 0 ? (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow">
                <Link href={`/projects/${project.id}`} className="block group">
                  <h3 className="text-lg font-medium text-green-600 dark:text-green-400 group-hover:underline">
                    {project.name} (ID: {project.id})
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {project.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No projects found.</p>
        )}
      </div>
    </div>
  );
}
