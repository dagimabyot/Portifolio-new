
import React from 'react';
import { PortfolioData } from '../types';
import ProjectCard from '../components/ProjectCard';

interface HomeProps {
  data: PortfolioData;
}

const Home: React.FC<HomeProps> = ({ data }) => {
  const featuredProjects = data.projects.filter(p => p.featured);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 sm:pb-32">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-16 py-8 sm:py-20 lg:py-32 overflow-hidden mt-0">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-12">
          <div className="flex-1 text-center lg:text-left z-10 order-2 lg:order-1">
            <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 sm:mb-8 animate-in fade-in slide-in-from-left-4 duration-500 text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="font-bold text-blue-400 uppercase tracking-widest">Available for Innovation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-7xl font-black text-white tracking-tighter leading-tight sm:leading-none mb-6 sm:mb-8 animate-in fade-in duration-700">
              {data.settings.heroHeadline.split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className={`inline-block mr-3 ${i >= 3 ? "text-blue-500" : ""}`}
                  style={{
                    animation: `slideUp 0.6s ease-out forwards`,
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 mb-8 sm:mb-12 leading-relaxed animate-in fade-in slide-in-from-left-8 duration-900" style={{ animationDelay: '0.6s' }}>
              {data.settings.bio}
            </p>
            <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-6 animate-in fade-in slide-in-from-left-10 duration-1000">
              <a href="#" className="px-6 sm:px-10 py-2.5 sm:py-5 bg-blue-600 text-white font-bold text-xs sm:text-base rounded-2xl shadow-xl shadow-blue-900/40 hover:bg-blue-500 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center whitespace-nowrap">
                Download CV
              </a>
              <button onClick={() => window.location.hash = '#/contact'} className="px-6 sm:px-10 py-2.5 sm:py-5 bg-slate-900 text-white font-bold text-xs sm:text-base border border-slate-800 rounded-2xl hover:bg-slate-800 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center whitespace-nowrap">
                Let's Talk
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative perspective-1000 z-0 order-1 lg:order-2">
            <div className="relative w-full max-w-sm mx-auto preserve-3d transition-transform duration-700 hover:rotate-y-12 hover:rotate-x-6" style={{ transform: 'perspective(1000px) rotateY(-8deg) rotateX(3deg)' }}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
              <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden border-2 border-slate-800 glow-blue rotate-3 group animate-float hover:shadow-2xl hover:shadow-blue-500/30 transition-all" style={{ transform: 'skewY(-8deg)' }}>
                <img 
                  src="/profile.png" 
                  alt={data.settings.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-120"
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
      <section className="px-4 sm:px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0 mb-8 sm:mb-12">
            <div>
              <span className="text-blue-500 font-bold text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3 block">Selected Works</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">Featured Projects</h2>
            </div>
            <button onClick={() => window.location.hash = '#/portfolio'} className="group text-blue-500 font-bold text-sm sm:text-base hover:text-blue-400 mt-4 sm:mt-0 flex items-center justify-start sm:justify-end w-full sm:w-auto">
              View All Work <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredProjects.slice(0, 3).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="px-4 sm:px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 text-center relative overflow-hidden group">
            <div className="relative z-10 space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tighter leading-tight">Ready to collaborate?</h2>
              <p className="text-blue-100 text-xs sm:text-base mb-6 sm:mb-10 max-w-xl mx-auto opacity-80 leading-relaxed">
                Let's create something exceptional together. Get in touch to discuss your project.
              </p>
              <button onClick={() => window.location.hash = '#/contact'} className="inline-flex items-center justify-center px-6 sm:px-10 py-2.5 sm:py-4 bg-white text-blue-700 font-bold text-xs sm:text-base rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-xl transform hover:scale-105 active:scale-95 w-full sm:w-auto">
                Get Started <svg className="w-4 sm:w-5 h-4 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
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
