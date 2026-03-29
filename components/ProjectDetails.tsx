import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onClose }) => {
  const [pinnedHighlight, setPinnedHighlight] = useState(false);
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 10;
    setIsScrollAtBottom(isAtBottom);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'In Progress':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Planned':
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[95vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-t-3xl shadow-2xl flex flex-col" style={{ borderBottomLeftRadius: isScrollAtBottom ? '1.5rem' : '0px', borderBottomRightRadius: isScrollAtBottom ? '1.5rem' : '0px' }}>
        {/* Header with Close Button - Fixed */}
        <div className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 px-8 py-6 flex items-center justify-between z-10 flex-shrink-0 rounded-t-3xl">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {project.category}
            </span>
            <h2 className="text-3xl font-black text-white">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white flex-shrink-0"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div ref={contentRef} onScroll={handleScroll} className="p-8 space-y-8 overflow-y-auto flex-1">
          {/* Project Image */}
          <div className="rounded-2xl overflow-hidden border border-slate-700/50">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Status and Date Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.status && (
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/30">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                <p className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${getStatusColor(project.status)}`}>
                  {project.status}
                </p>
              </div>
            )}
            {project.startDate && (
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/30">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Start Date</p>
                <p className="text-white font-semibold">{formatDate(project.startDate)}</p>
              </div>
            )}
            {project.endDate && (
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/30">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">End Date</p>
                <p className="text-white font-semibold">{formatDate(project.endDate)}</p>
              </div>
            )}
            {project.role && (
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/30">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Role</p>
                <p className="text-white font-semibold">{project.role}</p>
              </div>
            )}
          </div>

          {/* Short Description */}
          <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">Executive Summary</p>
            <p className="text-slate-200 leading-relaxed text-lg">{project.description}</p>
          </div>

          {/* About Section */}
          {project.moreDetails && (
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/30">
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-3">About</p>
              <p className="text-slate-400 leading-relaxed">{project.moreDetails}</p>
            </div>
          )}

          {/* Detailed Description */}
          {project.detailedDescription && (
            <div>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-3">Overview</p>
              <p className="text-slate-400 leading-relaxed">{project.detailedDescription}</p>
            </div>
          )}

          {/* Languages and Technologies */}
          <div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-4">Languages & Technologies</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.languages && project.languages.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-blue-400 mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(project.languages)).map(lang => (
                      <span key={lang} className="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.skills.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(project.skills)).map(skill => (
                      <span key={skill} className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-4">Key Features</p>
              <ul className="space-y-3">
                {project.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                    <span className="text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges & Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.challenges && (
              <div>
                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-3">Challenges</p>
                <p className="text-slate-400 leading-relaxed text-sm">{project.challenges}</p>
              </div>
            )}
            {project.solutions && (
              <div>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">Solutions</p>
                <p className="text-slate-400 leading-relaxed text-sm">{project.solutions}</p>
              </div>
            )}
          </div>

          {/* Results/Impact */}
          {project.results && (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">Results & Impact</p>
              <p className="text-slate-200 leading-relaxed">{project.results}</p>
            </div>
          )}

          {/* Pin to Highlights */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/30">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">Pin to Highlights</label>
            <button
              onClick={() => setPinnedHighlight(!pinnedHighlight)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                pinnedHighlight ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  pinnedHighlight ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Links Section */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/30 space-y-4">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Project Links</p>
            <div className="flex flex-wrap gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.caseStudyLink && (
                <a
                  href={project.caseStudyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Case Study
                </a>
              )}
            </div>
          </div>

          {/* Confirm/Publish */}
        </div>


      </div>
    </div>
  );
};

export default ProjectDetails;
