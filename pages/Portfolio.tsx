
import React, { useState } from 'react';
import { PortfolioData, ProjectCategory } from '../types';
import ProjectCard from '../components/ProjectCard';

interface PortfolioProps {
  data: PortfolioData;
}

const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');

  const categories: (ProjectCategory | 'All')[] = [
    'All',
    ProjectCategory.WEB,
    ProjectCategory.MOBILE,
    ProjectCategory.DESIGN,
    ProjectCategory.AI
  ];

  const filteredProjects = filter === 'All' 
    ? data.projects 
    : data.projects.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen space-y-20">
      <div className="max-w-3xl space-y-6">
        <span className="text-blue-500 font-bold text-sm uppercase tracking-widest block">Work Portfolio</span>
        <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">The Project Archive<span className="text-blue-500">.</span></h1>
        <p className="text-slate-400 text-lg lg:text-xl leading-relaxed">
          A collection of digital tools, creative websites, and innovative applications I've engineered over the past 2+ years.
        </p>
      </div>

      {/* Dynamic Filter Bar */}
      <div className="flex flex-wrap gap-4 py-4 border-y border-slate-800/50">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
              filter === cat 
                ? 'bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-600/30' 
                : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:border-blue-500/30 hover:text-blue-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              className="animate-in fade-in slide-in-from-bottom-10" 
              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'backwards' }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-[3rem] animate-pulse">
          <svg className="w-20 h-20 mx-auto mb-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
          <p className="text-slate-500 max-w-sm mx-auto">This project category is currently empty. Check back soon for fresh work.</p>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
