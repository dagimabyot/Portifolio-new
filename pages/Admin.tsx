
import React, { useState } from 'react';
import { PortfolioData, Project, ProjectCategory, Lead } from '../types';
import { geminiService } from '../services/geminiService';

interface AdminProps {
  data: PortfolioData;
  onUpdateSettings: (settings: PortfolioData['settings']) => void;
  onAddProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onMarkLeadRead: (id: string) => void;
}

const Admin: React.FC<AdminProps> = ({ data, onUpdateSettings, onAddProject, onDeleteProject, onMarkLeadRead }) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'projects' | 'leads'>('settings');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Form states
  const [settingsForm, setSettingsForm] = useState(data.settings);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    category: ProjectCategory.WEB,
    imageUrl: 'https://picsum.photos/800/600',
    skills: [],
    featured: false
  });

  const handleAiBioImprovement = async () => {
    setIsAiLoading(true);
    const improved = await geminiService.improveBio(settingsForm.bio);
    setSettingsForm(prev => ({ ...prev, bio: improved }));
    setIsAiLoading(false);
  };

  const handleAiProjectDesc = async () => {
    if (!newProject.title) return;
    setIsAiLoading(true);
    const desc = await geminiService.generateProjectDescription(newProject.title, newProject.skills || []);
    setNewProject(prev => ({ ...prev, description: desc }));
    setIsAiLoading(false);
  };

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
    alert('System settings updated successfully.');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.title && newProject.description) {
      onAddProject({
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        category: newProject.category as ProjectCategory,
        imageUrl: newProject.imageUrl as string,
        skills: newProject.skills || [],
        featured: !!newProject.featured,
        link: newProject.link,
        github: newProject.github
      });
      setNewProject({ title: '', description: '', category: ProjectCategory.WEB, skills: [], featured: false, imageUrl: 'https://picsum.photos/800/600' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">System Console<span className="text-blue-500">_</span></h1>
          <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-[0.2em]">Manage your digital presence</p>
        </div>
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['settings', 'projects', 'leads'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -z-10"></div>
        
        {activeTab === 'settings' && (
          <div className="p-10 lg:p-16">
            <h2 className="text-2xl font-bold text-white mb-10 flex items-center">
               <span className="w-2 h-6 bg-blue-600 rounded-full mr-4"></span>
               Configuration
            </h2>
            <form onSubmit={saveSettings} className="space-y-10 max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Identity Name</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={settingsForm.name}
                    onChange={e => setSettingsForm({...settingsForm, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Brand Signature</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={settingsForm.brandName}
                    onChange={e => setSettingsForm({...settingsForm, brandName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Primary Headline</label>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={settingsForm.heroHeadline}
                  onChange={e => setSettingsForm({...settingsForm, heroHeadline: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Primary Email</label>
                  <input
                    type="email"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={settingsForm.email}
                    onChange={e => setSettingsForm({...settingsForm, email: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={settingsForm.phone || ''}
                    onChange={e => setSettingsForm({...settingsForm, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-1 px-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">About Brief</label>
                  <button 
                    type="button"
                    onClick={handleAiBioImprovement}
                    disabled={isAiLoading}
                    className="text-[10px] font-bold text-blue-500 flex items-center hover:underline disabled:opacity-50 uppercase tracking-widest"
                  >
                    <svg className={`w-3 h-3 mr-2 ${isAiLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Optimize with AI
                  </button>
                </div>
                <textarea
                  rows={6}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
                  value={settingsForm.bio}
                  onChange={e => setSettingsForm({...settingsForm, bio: e.target.value})}
                />
              </div>
              <button
                type="submit"
                className="px-12 py-5 bg-blue-600 text-white font-black text-lg uppercase tracking-widest rounded-2xl hover:bg-blue-500 transition-all duration-300 shadow-2xl shadow-blue-900/40"
              >
                Update Core Settings
              </button>
            </form>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="p-10 lg:p-16">
            <h2 className="text-2xl font-bold text-white mb-10 flex items-center">
               <span className="w-2 h-6 bg-blue-600 rounded-full mr-4"></span>
               Asset Management
            </h2>
            
            <div className="bg-slate-950/50 p-10 rounded-[2.5rem] mb-16 border border-slate-800">
              <h3 className="font-bold text-white mb-10 uppercase tracking-widest text-sm">Deploy New Asset</h3>
              <form onSubmit={handleAddProject} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input
                    placeholder="Project Title"
                    className="px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-700 font-medium"
                    value={newProject.title}
                    onChange={e => setNewProject({...newProject, title: e.target.value})}
                  />
                  <select
                    className="px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none"
                    value={newProject.category}
                    onChange={e => setNewProject({...newProject, category: e.target.value as ProjectCategory})}
                  >
                    {Object.values(ProjectCategory).map(cat => (
                      <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Executive Summary</label>
                    <button 
                      type="button" 
                      onClick={handleAiProjectDesc}
                      disabled={isAiLoading}
                      className="text-[10px] font-bold text-blue-500 flex items-center hover:underline disabled:opacity-50 uppercase tracking-widest"
                    >
                      Draft with AI
                    </button>
                  </div>
                  <textarea
                    placeholder="Provide a technical summary..."
                    className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-slate-700"
                    value={newProject.description}
                    onChange={e => setNewProject({...newProject, description: e.target.value})}
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative inline-block w-12 mr-3 align-middle select-none transition duration-200 ease-in">
                    <input 
                      type="checkbox" 
                      id="featured" 
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-slate-700 border-4 border-slate-950 appearance-none cursor-pointer"
                      checked={newProject.featured}
                      onChange={e => setNewProject({...newProject, featured: e.target.checked})}
                    />
                    <label htmlFor="featured" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-800 cursor-pointer"></label>
                  </div>
                  <label htmlFor="featured" className="text-sm font-bold text-slate-400 uppercase tracking-widest">Pin to Highlights</label>
                </div>
                <button
                  type="submit"
                  className="px-10 py-4 bg-white text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:bg-blue-50 transition-all duration-300 transform active:scale-95"
                >
                  Confirm Deployment
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-slate-500 uppercase tracking-widest text-[10px] mb-6">Current Inventory</h3>
              {data.projects.map(project => (
                <div key={project.id} className="group flex items-center justify-between p-6 bg-slate-950/50 border border-slate-800 rounded-[2rem] hover:border-blue-500/50 transition-all duration-500">
                  <div className="flex items-center">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden mr-6 group-hover:scale-110 transition-transform">
                      <img src={project.imageUrl} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-blue-500/10 group-hover:opacity-0 transition-opacity"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h4>
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">{project.category} {project.featured && <span className="text-blue-500 ml-2">// Featured</span>}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onDeleteProject(project.id)}
                    className="p-3 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="p-10 lg:p-16">
             <h2 className="text-2xl font-bold text-white mb-10 flex items-center">
               <span className="w-2 h-6 bg-blue-600 rounded-full mr-4"></span>
               Inbound Comms
            </h2>
            {data.leads.length > 0 ? (
              <div className="space-y-8">
                {data.leads.map(lead => (
                  <div key={lead.id} className={`p-10 rounded-[2.5rem] border transition-all duration-500 ${lead.read ? 'bg-slate-950/50 border-slate-800' : 'bg-blue-500/5 border-blue-500/30 ring-1 ring-blue-500/20 shadow-2xl shadow-blue-900/10'}`}>
                    <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                      <div>
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2 block">{new Date(lead.timestamp).toLocaleString()}</span>
                        <h4 className="text-2xl font-black text-white leading-tight">{lead.subject}</h4>
                        <p className="text-slate-400 mt-2 font-medium">Origin: <span className="text-white">{lead.name}</span> <span className="text-slate-600 ml-2">[{lead.email}]</span></p>
                      </div>
                      {!lead.read && (
                        <button 
                          onClick={() => onMarkLeadRead(lead.id)}
                          className="px-6 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40"
                        >
                          Acknowledge
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/20 rounded-full"></div>
                      <p className="text-slate-300 p-8 pt-0 leading-relaxed font-medium italic whitespace-pre-wrap">"{lead.message}"</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-40 text-center border-2 border-dashed border-slate-800 rounded-[3rem]">
                <svg className="w-20 h-20 mx-auto mb-8 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                <h3 className="text-2xl font-bold text-white mb-2">Comms Grid Silent</h3>
                <p className="text-slate-500 max-w-sm mx-auto">No inbound transmissions detected at this time.</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <style>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #3b82f6;
          background-color: #3b82f6;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #3b82f6;
        }
        .toggle-checkbox {
          right: 24px;
          transition: all 0.3s;
        }
      `}</style>
    </div>
  );
};

export default Admin;
