
import React from 'react';
import { PortfolioData } from '../types';

interface AboutProps {
  data: PortfolioData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  const skillSets = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'Django', 'PostgreSQL'] },
    { category: 'Development', items: ['Git', 'GitHub', 'REST APIs', 'Unit Testing'] },
    { category: 'Design', items: ['UI/UX Principles', 'Responsive Design', 'Framer Motion'] }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32 space-y-20 sm:space-y-32">
      {/* Intro Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start lg:items-center">
        <div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
          <div className="space-y-2 sm:space-y-3">
            <span className="text-blue-500 font-bold text-xs sm:text-sm uppercase tracking-widest block">Biography</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight">
              Engineering <br/><span className="text-blue-500">Digital Solutions.</span>
            </h1>
          </div>
          
          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-lg text-slate-400 leading-relaxed font-medium">
            <p className="text-slate-200 font-semibold text-base sm:text-lg border-l-4 border-blue-500 pl-4 sm:pl-5 bg-blue-500/5 py-2 sm:py-3 rounded-r-2xl">
              {data.settings.bio}
            </p>
            <p>
              My journey in software development is fueled by a desire to build tools that make a difference. With 2+ years of dedicated experience, I've mastered the balance between aesthetic appeal and functional robustness.
            </p>
            <p>
              I take pride in writing clean, maintainable code and staying ahead of the curve with modern frameworks. Whether it's a responsive landing page or a complex full-stack application, I bring 100% commitment to every line of code.
            </p>
          </div>

          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
            <a 
              href={data.settings.socials.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 rounded-2xl border border-slate-800 text-white hover:border-blue-500 hover:text-blue-500 hover:bg-slate-800/50 transition-all shadow-xl hover:shadow-blue-500/10 flex items-center justify-center sm:justify-start group transform hover:scale-105 active:scale-95"
            >
              <svg className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span className="text-sm sm:text-base font-bold">View GitHub</span>
            </a>
            <a 
              href={data.settings.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 rounded-2xl border border-slate-800 text-white hover:border-blue-500 hover:text-blue-500 hover:bg-slate-800/50 transition-all shadow-xl hover:shadow-blue-500/10 flex items-center justify-center sm:justify-start group transform hover:scale-105 active:scale-95"
            >
              <svg className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span className="text-sm sm:text-base font-bold">LinkedIn Profile</span>
            </a>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 relative perspective-1000 mt-8 lg:mt-0 flex justify-center lg:justify-end" style={{ perspective: '1000px' }}>
          <div className="relative aspect-[3/4] w-full max-w-xs bg-slate-900 rounded-[3rem] overflow-hidden border-2 border-slate-800 shadow-2xl transition-all duration-700 hover:rotate-0 rotate-3 glow-blue group preserve-3d hover:shadow-2xl hover:shadow-blue-500/20 animate-float" style={{ transform: 'perspective(1000px) rotateY(8deg) rotateX(3deg) skewY(-8deg)' }}>
            <img 
              src="/profile.png" 
              alt="Dagim Abyot" 
              className="w-full h-full object-cover object-top grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-125 hover:scale-135" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          </div>
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] -z-10 animate-pulse"></div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-slate-800/40 rounded-full blur-[100px] -z-10"></div>
        </div>
      </div>

      {/* Skills Grid */}
      <section className="space-y-12 sm:space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4 px-4">
          <span className="text-blue-500 font-bold text-xs sm:text-sm uppercase tracking-widest block">Expertise</span>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white tracking-tighter">My Technical Stack<span className="text-blue-500">.</span></h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg">
            I utilize a modern ecosystem of tools to build high-performance, secure, and beautiful web applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-0">
          {skillSets.map((skillGroup, idx) => (
            <div 
              key={skillGroup.category} 
              className="group p-10 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <span className="text-blue-500 font-black text-xl">{skillGroup.category[0]}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                {skillGroup.category}
              </h3>
              <ul className="space-y-4">
                {skillGroup.items.map(item => (
                  <li key={item} className="flex items-center text-slate-400 font-medium group-hover:text-blue-400 transition-colors">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-60 group-hover:opacity-100"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA in About */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] p-6 sm:p-12 lg:p-20 text-center relative overflow-hidden group mx-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-20 -mt-20"></div>
        <div className="relative z-10 space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tighter">Let's build something together.</h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-xl mx-auto px-2">
            If you're looking for a developer who values quality and communication, I'd love to hear about your next project.
          </p>
          <button onClick={() => window.location.hash = '#/contact'} className="inline-flex items-center justify-center px-8 sm:px-12 py-3 sm:py-5 bg-blue-600 text-white font-bold text-sm sm:text-base rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 transform hover:scale-105 active:scale-95 w-full sm:w-auto">
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
