
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="perspective-1000 group">
      <div className="relative bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-500 preserve-3d card-3d flex flex-col h-full group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest bg-blue-600 text-white rounded-full shadow-lg">
              {project.category}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        </div>
        
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-slate-400 text-xs mb-3 line-clamp-1 leading-relaxed">
            {project.description}
          </p>
          
          {project.languages && project.languages.length > 0 && (
            <div className="mb-3 pb-3 border-b border-slate-700">
              <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-1">Languages</p>
              <div className="flex flex-wrap gap-1">
                {project.languages.map(lang => (
                  <span key={lang} className="px-2 py-0.5 text-[7px] font-semibold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-1.5">
            {project.skills.slice(0, 2).map(skill => (
              <span key={skill} className="px-2 py-0.5 text-[7px] font-medium bg-slate-800 text-slate-400 rounded-full border border-slate-700 group-hover:border-blue-500/30 transition-colors">
                {skill}
              </span>
            ))}
            {project.skills.length > 2 && (
              <span className="px-2 py-0.5 text-[7px] font-medium bg-slate-800 text-slate-400 rounded-full border border-slate-700">
                +{project.skills.length - 2}
              </span>
            )}
          </div>
          
          <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex space-x-2">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors p-1.5 bg-blue-500/10 rounded-lg hover:bg-blue-500/20" title="View Live">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-1.5 bg-slate-800 rounded-lg hover:bg-slate-700" title="View Source">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              )}
            </div>
            <a href={`#/portfolio`} className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter flex items-center group/btn">
              Study <svg className="w-3 h-3 ml-1 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
