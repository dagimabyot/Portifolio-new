
import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_DATA } from './constants';
import { PortfolioData, Project, Lead } from './types';
import { loadPortfolioData, projectsApi, settingsApi, leadsApi, authStorage } from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Console from './pages/Console';
import Login from './pages/Login';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>({ ...INITIAL_DATA, leads: [] });
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(authStorage.isAuthenticated());

  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.hash || '#/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash || '#/';
      setCurrentPath(newHash);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Load projects/testimonials/settings from the Django backend on mount.
  const refreshPublicData = useCallback(async () => {
    try {
      const remote = await loadPortfolioData();
      setData(prev => ({ ...prev, ...remote }));
      setApiError(null);
    } catch (err: any) {
      console.error('Failed to load portfolio data from API', err);
      setApiError(
        'Could not reach the backend API. Showing fallback content — start the Django server ' +
        '(see backend/README.md) to load live data.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPublicData();
  }, [refreshPublicData]);

  // Load leads only once authenticated (they're protected on the backend).
  const refreshLeads = useCallback(async () => {
    if (!authStorage.isAuthenticated()) return;
    try {
      const leads = await leadsApi.list();
      setData(prev => ({ ...prev, leads }));
    } catch (err) {
      console.error('Failed to load leads', err);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) refreshLeads();
  }, [isAuthenticated, refreshLeads]);

  const updateSettings = async (newSettings: PortfolioData['settings']) => {
    const saved = await settingsApi.update(newSettings);
    setData(prev => ({ ...prev, settings: saved }));
  };

  const addProject = async (project: Project) => {
    const { id, ...payload } = project;
    const created = await projectsApi.create(payload);
    setData(prev => ({ ...prev, projects: [created, ...prev.projects] }));
  };

  const deleteProject = async (id: string) => {
    await projectsApi.remove(id);
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const addLead = async (lead: Lead) => {
    const { id, timestamp, read, ...payload } = lead;
    await leadsApi.submit(payload);
  };

  const markLeadRead = async (id: string) => {
    await leadsApi.markRead(id);
    setData(prev => ({ ...prev, leads: prev.leads.map(l => l.id === id ? { ...l, read: true } : l) }));
  };

  const handleLogout = () => {
    authStorage.clearToken();
    setIsAuthenticated(false);
    window.location.hash = '#/';
  };

  const renderPage = () => {
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
    if (path.includes('console')) {
      if (!isAuthenticated) {
        return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
      }
      return <Console data={data} onCreateProject={addProject} />;
    }
    if (path.includes('admin')) {
      if (!isAuthenticated) {
        return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
      }
      return (
        <Admin
          data={data}
          onUpdateSettings={updateSettings}
          onAddProject={addProject}
          onDeleteProject={deleteProject}
          onMarkLeadRead={markLeadRead}
          onLogout={handleLogout}
        />
      );
    }
    return <Home data={data} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
      <Header settings={data.settings} currentPath={currentPath} />
      <main className="flex-grow pt-20">
        {apiError && (
          <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-6">
            <div className="px-6 py-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium">
              {apiError}
            </div>
          </div>
        )}
        <div className="animate-in fade-in duration-500">
          {loading ? (
            <div className="min-h-[60vh] flex items-center justify-center text-slate-500">Loading…</div>
          ) : (
            renderPage()
          )}
        </div>
      </main>
      <Footer settings={data.settings} />
    </div>
  );
};

export default App;
