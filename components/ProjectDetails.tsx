import React from 'react';
import { Project } from '../types';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div 
        className="relative bg-slate-900 rounded-2xl border border-slate-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          title="Close"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Image */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-white">{project.title}</h2>
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-blue-600 text-white rounded-full">
                {project.category}
              </span>
            </div>
            
            {project.status && (
              <div className="inline-block mb-4">
                <span className="px-3 py-1 text-xs font-semibold bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                  {project.status}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-300 text-base leading-relaxed mb-6">
            {project.detailedDescription || project.description}
          </p>

          {/* Role and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-800">
            {project.role && (
              <div>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Role</p>
                <p className="text-slate-300">{project.role}</p>
              </div>
            )}
            {(project.startDate || project.endDate) && (
              <div>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Duration</p>
                <p className="text-slate-300">
                  {project.startDate && project.endDate
                    ? `${project.startDate} - ${project.endDate}`
                    : project.startDate || project.endDate}
                </p>
              </div>
            )}
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="mb-6 pb-6 border-b border-slate-800">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Key Features</p>
              <ul className="space-y-2">
                {project.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-slate-300">
                    <span className="text-blue-400 mr-3 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges and Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-slate-800">
            {project.challenges && (
              <div>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Challenges</p>
                <p className="text-slate-300 text-sm leading-relaxed">{project.challenges}</p>
              </div>
            )}
            {project.solutions && (
              <div>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Solutions</p>
                <p className="text-slate-300 text-sm leading-relaxed">{project.solutions}</p>
              </div>
            )}
          </div>

          {/* Results */}
          {project.results && (
            <div className="mb-6 pb-6 border-b border-slate-800">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Results</p>
              <p className="text-slate-300 text-sm leading-relaxed">{project.results}</p>
            </div>
          )}

          {/* Languages */}
          {project.languages && project.languages.length > 0 && (
            <div className="mb-6 pb-6 border-b border-slate-800">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Languages</p>
              <div className="flex flex-wrap gap-2">
                {project.languages.map(lang => (
                  <span key={lang} className="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          <div className="mb-6 pb-6 border-b border-slate-800">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Skills & Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.skills.map(skill => (
                <span key={skill} className="px-3 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Source Code
                </a>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
