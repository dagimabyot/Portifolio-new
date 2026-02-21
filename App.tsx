
import React, { useState, useEffect } from 'react';
import { INITIAL_DATA } from './constants';
import { PortfolioData, Project, Lead } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('portfolio_data_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure the headline and email are updated to the new required ones even if loading from cache
        parsed.settings.heroHeadline = "Hi i'm Dagim Abyot Full stack developer";
        parsed.settings.email = "dagim045@gmail.com";
        parsed.settings.phone = "+251 977078336";
        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse local data", e);
    }
    return INITIAL_DATA;
  });

  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.hash || '#/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash || '#/';
      setCurrentPath(newHash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    window.addEventListener('hashchange', handleHashChange);
    // Initial check in case it changed during mount
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio_data_v2', JSON.stringify(data));
  }, [data]);

  const updateSettings = (newSettings: PortfolioData['settings']) => {
    setData(prev => ({ ...prev, settings: newSettings }));
  };

  const addProject = (project: Project) => {
    setData(prev => ({ ...prev, projects: [project, ...prev.projects] }));
  };

  const deleteProject = (id: string) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const addLead = (lead: Lead) => {
    setData(prev => ({ ...prev, leads: [lead, ...prev.leads] }));
  };

  const markLeadRead = (id: string) => {
    setData(prev => ({ ...prev, leads: prev.leads.map(l => l.id === id ? { ...l, read: true } : l) }));
  };

  const renderPage = () => {
    // Normalize path comparison
    const path = currentPath.toLowerCase();
    
    if (path === '#/' || path === '' || path === '#') {
      return <Home data={data} />;
    }
    if (path.includes('about')) {
      return <About data={data} />;
    }
    if (path.includes('portfolio')) {
      return <Portfolio data={data} />;
    }
    if (path.includes('contact')) {
      return <Contact data={data} onContactSubmit={addLead} />;
    }
    if (path.includes('admin')) {
      return (
        <Admin 
          data={data} 
          onUpdateSettings={updateSettings}
          onAddProject={addProject}
          onDeleteProject={deleteProject}
          onMarkLeadRead={markLeadRead}
        />
      );
    }
    return <Home data={data} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
      <Header settings={data.settings} currentPath={currentPath} />
      <main className="flex-grow pt-20">
        <div className="animate-in fade-in duration-500">
          {renderPage()}
        </div>
      </main>
      <Footer settings={data.settings} />
    </div>
  );
};

export default App;
