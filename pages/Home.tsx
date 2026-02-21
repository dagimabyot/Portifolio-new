
import React from 'react';
import { PortfolioData } from '../types';
import ProjectCard from '../components/ProjectCard';

interface HomeProps {
  data: PortfolioData;
}

const Home: React.FC<HomeProps> = ({ data }) => {
  const featuredProjects = data.projects.filter(p => p.featured);

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Available for Innovation</span>
            </div>
            <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-8 animate-in fade-in slide-in-from-left-6 duration-700">
              {data.settings.heroHeadline.split(' ').map((word, i) => (
                <span key={i} className={i >= 3 ? "text-blue-500" : ""}>{word} </span>
              ))}
            </h1>
            <p className="text-lg lg:text-xl text-slate-400 max-w-xl mb-12 leading-relaxed animate-in fade-in slide-in-from-left-8 duration-900">
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
            <div className="relative w-full aspect-square max-w-lg mx-auto preserve-3d transition-transform duration-700 hover:rotate-y-12 hover:rotate-x-6">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
              <div className="w-full h-full rounded-[3rem] overflow-hidden border-2 border-slate-800 glow-blue rotate-6 group">
                <img 
                  src="https://picsum.photos/seed/dagim/800/800" 
                  alt={data.settings.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105"
                />
              </div>
              <div className="absolute -top-8 -right-8 p-6 glass rounded-2xl border border-blue-500/30 shadow-2xl animate-bounce duration-[4000ms]">
                 <div className="text-blue-400 font-black text-2xl">2+</div>
                 <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] -z-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[150px] -z-20 -translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* Featured Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-blue-500 font-bold text-sm uppercase tracking-widest mb-4 block">Selected Works</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white">Digital Creations</h2>
          </div>
          <a href="#/portfolio" className="group text-blue-500 font-bold text-lg hover:text-blue-400 mt-6 md:mt-0 flex items-center">
            View All Work <svg className="w-6 h-6 ml-3 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {featuredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-bold text-sm uppercase tracking-widest mb-4 block">Kind Words</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white">Client Feedback</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {data.testimonials.map(testimonial => (
            <div key={testimonial.id} className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 relative group hover:border-blue-500/30 transition-all duration-500">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-900/40">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V5C14.017 4.44772 14.4647 4 15.017 4H19.017C20.6739 4 22.017 5.34315 22.017 7V15C22.017 16.6569 20.6739 18 19.017 18H16.017V21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91243 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H3.017C2.46472 8 2.017 7.55228 2.017 7V5C2.017 4.44772 2.46472 4 3.017 4H7.017C8.67386 4 10.017 5.34315 10.017 7V15C10.017 16.6569 8.67386 18 7.017 18H4.017V21H2.017Z" /></svg>
              </div>
              <p className="text-slate-300 text-lg italic leading-relaxed mb-10">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-2xl object-cover mr-4 border border-slate-700" />
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">{testimonial.role} @ {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-none">Have a project in mind?</h2>
            <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto opacity-80 leading-relaxed">
              Let's combine my technical expertise with your vision to create something that stands out from the competition.
            </p>
            <a href="#/contact" className="inline-flex items-center px-12 py-6 bg-white text-blue-700 font-black rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95">
              Get Started <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/20 rounded-full blur-[100px] -ml-20 -mb-20"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
