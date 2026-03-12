
import React, { useState } from 'react';

interface HeaderProps {
  settings: { brandName: string };
  currentPath: string;
}

const Header: React.FC<HeaderProps> = ({ settings, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '#/' },
    { label: 'About', path: '#/about' },
    { label: 'Portfolio', path: '#/portfolio' },
    { label: 'Contact', path: '#/contact' },
  ];

  const isActive = (path: string) => {
    const current = currentPath.toLowerCase() || '#/';
    const target = path.toLowerCase();
    if (target === '#/' && (current === '#/' || current === '' || current === '#')) return true;
    return current.includes(target.replace('#/', ''));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-800/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <a href="#/" className="text-2xl font-bold tracking-tight text-white flex items-center group">
              <span className="text-blue-500 mr-1">_</span>
              {settings.brandName.split(' ')[0]}
              <span className="text-blue-500 ml-0.5">.</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-blue-400 relative py-2 group ${
                  isActive(item.path) ? 'text-blue-400' : 'text-slate-400'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 ${isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </a>
            ))}
            <a
              href="#/admin"
              className="px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 border border-slate-800 hover:border-blue-500 shadow-xl shadow-black/40"
            >
              Console
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-blue-400 focus:outline-none p-2 rounded-xl hover:bg-slate-800/50 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu with improved overlay */}
      {isOpen && (
        <div className="md:hidden glass border-b border-slate-800/50 py-10 px-6 space-y-4 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all ${
                isActive(item.path) ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-6">
            <a
              href="#/admin"
              onClick={() => setIsOpen(false)}
              className="block w-full py-5 rounded-2xl text-center text-lg font-black uppercase tracking-[0.3em] bg-blue-600 text-white shadow-2xl shadow-blue-500/20"
            >
              Console
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
