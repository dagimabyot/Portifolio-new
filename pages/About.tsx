
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
    <div className="bg-[#020617] min-h-screen">
      {/* Hero Section - Two Column Layout */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left Column: Bio & CTA */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-blue-500 font-bold text-xs uppercase tracking-widest block">About</span>
              <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                Full Stack Developer
              </h1>
            </div>
            
            {/* Main Bio Box */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 space-y-4">
              <p className="text-slate-200 font-semibold text-base leading-relaxed">
                {data.settings.bio}
              </p>
              <div className="w-full h-px bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-transparent"></div>
              <p className="text-slate-400 text-sm leading-relaxed">
                My journey in software development is fueled by a desire to build tools that make a difference. With 2+ years of dedicated experience, I've mastered the balance between aesthetic appeal and functional robustness.
              </p>
            </div>

            {/* Additional Context */}
            <div className="text-slate-400 text-sm leading-relaxed space-y-3">
              <p>
                I take pride in writing clean, maintainable code and staying ahead of the curve with modern frameworks. Whether it's a responsive landing page or a complex full-stack application, I bring 100% commitment to every project.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a 
                href={data.settings.socials.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-5 py-2.5 bg-slate-800/60 border border-slate-700 text-white text-sm font-medium rounded-lg hover:border-blue-500 hover:bg-slate-800 transition-all flex items-center gap-2 group"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a 
                href={data.settings.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-5 py-2.5 bg-slate-800/60 border border-slate-700 text-white text-sm font-medium rounded-lg hover:border-blue-500 hover:bg-slate-800 transition-all flex items-center gap-2 group"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Column: Profile Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs aspect-[3/4]">
              <div className="relative h-full bg-slate-900/30 rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 group">
                <img 
                  src="https://picsum.photos/seed/dagim_about/800/1000" 
                  alt="Dagim Abyot" 
                  className="w-full h-full object-cover object-top grayscale-50 group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-slate-800/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <section className="bg-slate-900/30 border-y border-slate-700/30 py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="mb-10">
            <span className="text-blue-500 font-bold text-xs uppercase tracking-widest block mb-2">Skills</span>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Technical Stack</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillSets.map((skillGroup, idx) => (
              <div 
                key={skillGroup.category} 
                className="group p-6 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-5 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                  <span className="text-blue-400 font-bold text-sm">{skillGroup.category[0]}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-4">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map(item => (
                    <li key={item} className="flex items-center text-slate-400 text-xs font-medium group-hover:text-slate-300 transition-colors">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-slate-700/30 rounded-2xl p-10 lg:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -mr-40 -mt-40 -z-10"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Ready to collaborate?</h2>
            <p className="text-slate-400 text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
              I'm always interested in hearing about new projects and opportunities. Feel free to reach out if you'd like to discuss your next idea.
            </p>
            <div className="pt-2">
              <a href="#/contact" className="inline-block px-8 py-3 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 transform hover:scale-105 active:scale-95">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
