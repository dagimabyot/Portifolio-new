
import React from 'react';
import { PortfolioData } from '../types';
import ProjectCard from '../components/ProjectCard';

interface HomeProps {
  data: PortfolioData;
}

const Home: React.FC<HomeProps> = ({ data }) => {
  const featuredProjects = data.projects.filter(p => p.featured);

  return (
    <div className="space-y-24 pb-32">
      {/* Hero Section */}
      <section className="relative px-8 sm:px-12 lg:px-16 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Available for Innovation</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-8 animate-in fade-in slide-in-from-left-6 duration-700">
              {data.settings.heroHeadline.split(' ').map((word, i) => (
                <span key={i} className={i >= 3 ? "text-blue-500" : ""}>{word} </span>
              ))}
            </h1>
            <p className="text-lg lg:text-lg text-slate-400 max-w-lg mb-12 leading-relaxed animate-in fade-in slide-in-from-left-8 duration-900">
              {data.settings.bio}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-in fade-in slide-in-from-left-10 duration-1000">
              <a href="#" className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/40 hover:bg-blue-500 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                Download CV
              </a>
              <a href="#/contact" className="px-10 py-5 bg-slate-900 text-white font-bold border border-slate-800 rounded-2xl hover:bg-slate-800 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                Let's Talk
              </a>
            </div>
          </div>
          
          <div className="flex-1 relative perspective-1000 z-0">
            <div className="relative w-full max-w-sm mx-auto preserve-3d transition-transform duration-700 hover:rotate-y-12 hover:rotate-x-6">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
              <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden border-2 border-slate-800 glow-blue rotate-3 group">
                <img 
                  src="https://picsum.photos/seed/dagim/500/650" 
                  alt={data.settings.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-5 glass rounded-2xl border border-blue-500/30 shadow-2xl">
                 <div className="text-blue-400 font-black text-xl">2+</div>
                 <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] -z-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[150px] -z-20 -translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* Featured Projects Grid */}
      <section className="px-8 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-blue-500 font-bold text-sm uppercase tracking-widest mb-3 block">Selected Works</span>
              <h2 className="text-3xl lg:text-4xl font-black text-white">Featured Projects</h2>
            </div>
            <a href="#/portfolio" className="group text-blue-500 font-bold text-base hover:text-blue-400 mt-6 md:mt-0 flex items-center">
              View All Work <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.slice(0, 3).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Asset Management Section */}
      <section className="px-8 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-blue-500 font-bold text-sm uppercase tracking-widest mb-3 block">Management</span>
            <h2 className="text-3xl lg:text-4xl font-black text-white">Deploy New Asset</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white">Add New Project</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Project Title</label>
                  <input type="text" placeholder="Enter project name" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Description</label>
                  <textarea placeholder="Describe your project" rows={3} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Choose Languages</label>
                  <input type="text" placeholder="e.g., TypeScript, JavaScript, Python" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors" />
                  <p className="text-xs text-slate-400 mt-1">Separate multiple languages with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Upload Image</label>
                  <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <svg className="w-8 h-8 mx-auto text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    <input type="file" accept="image/*" className="hidden" id="image-upload" />
                    <label htmlFor="image-upload" className="block cursor-pointer">
                      <p className="text-sm text-slate-400">Click to upload or drag and drop</p>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white">Project Links</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Deployed Link</label>
                  <div className="relative">
                    <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    <input type="url" placeholder="https://example.com" className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">GitHub Repository</label>
                  <div className="relative">
                    <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    <input type="url" placeholder="https://github.com/username/repo" className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Project Category</label>
                  <select className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none transition-colors">
                    <option value="">Select Category</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="ai">AI/Machine Learning</option>
                    <option value="design">Design</option>
                  </select>
                </div>

                <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40 transform hover:scale-105 active:scale-95 mt-4">
                  Deploy Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="px-8 sm:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 tracking-tighter leading-none">Ready to collaborate?</h2>
              <p className="text-blue-100 text-base mb-10 max-w-xl mx-auto opacity-80 leading-relaxed">
                Let's create something exceptional together. Get in touch to discuss your project.
              </p>
              <a href="#/contact" className="inline-flex items-center px-10 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-xl transform hover:scale-105 active:scale-95">
                Get Started <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
