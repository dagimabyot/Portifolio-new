
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
    detailedDescription: '',
    category: ProjectCategory.WEB,
    imageUrl: 'https://picsum.photos/800/600',
    skills: [],
    languages: [],
    featured: false,
    link: '',
    github: '',
    caseStudyLink: '',
    status: 'Completed',
    startDate: '',
    endDate: '',
    role: '',
    keyFeatures: [],
    challenges: '',
    solutions: '',
    results: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

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
        detailedDescription: newProject.detailedDescription,
        category: newProject.category as ProjectCategory,
        imageUrl: newProject.imageUrl as string,
        skills: newProject.skills || [],
        languages: newProject.languages || [],
        featured: !!newProject.featured,
        link: newProject.link,
        github: newProject.github,
        caseStudyLink: newProject.caseStudyLink,
        status: newProject.status as any,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        role: newProject.role,
        keyFeatures: newProject.keyFeatures,
        challenges: newProject.challenges,
        solutions: newProject.solutions,
        results: newProject.results
      });
      setNewProject({ 
        title: '', 
        description: '', 
        detailedDescription: '',
        category: ProjectCategory.WEB, 
        skills: [], 
        languages: [],
        featured: false, 
        imageUrl: 'https://picsum.photos/800/600',
        status: 'Completed',
        startDate: '',
        endDate: '',
        role: '',
        keyFeatures: [],
        challenges: '',
        solutions: '',
        results: ''
      });
      setSkillInput('');
      setLanguageInput('');
      setFeatureInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-20 gap-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 w-fit">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Management Dashboard</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter">System Console<span className="text-blue-500">_</span></h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">Manage your complete digital presence and portfolio. Update settings, add projects, and track leads.</p>
          </div>
          <div className="flex bg-slate-900/80 backdrop-blur-sm p-2 rounded-2xl border border-slate-800 gap-2">
            {(['settings', 'projects', 'leads'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-900/50' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/30 backdrop-blur-sm rounded-[2.5rem] border border-slate-800/50 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-800/20 rounded-full blur-[100px] -z-10"></div>
        
          {activeTab === 'settings' && (
          <div className="p-12 lg:p-20">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                <h2 className="text-3xl lg:text-4xl font-black text-white">Profile Configuration</h2>
              </div>
              <p className="text-slate-400 text-lg">Manage your personal branding and core information</p>
            </div>

            <form onSubmit={saveSettings} className="space-y-12">
              {/* Identity Section */}
              <div className="space-y-6">
                <div className="px-6 py-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                  <p className="text-sm font-bold text-blue-400 uppercase tracking-widest">Identity Information</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest block">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={settingsForm.name}
                      onChange={e => setSettingsForm({...settingsForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest block">Brand Name</label>
                    <input
                      type="text"
                      placeholder="Your brand/portfolio name"
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={settingsForm.brandName}
                      onChange={e => setSettingsForm({...settingsForm, brandName: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Headlines & Bio Section */}
              <div className="space-y-6">
                <div className="px-6 py-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Messaging</p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest block">Hero Headline</label>
                    <input
                      type="text"
                      placeholder="e.g., Full Stack Developer & Designer"
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={settingsForm.heroHeadline}
                      onChange={e => setSettingsForm({...settingsForm, heroHeadline: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-slate-300 uppercase tracking-widest block">Professional Bio</label>
                      <button 
                        type="button"
                        onClick={handleAiBioImprovement}
                        disabled={isAiLoading}
                        className="text-xs font-bold text-blue-400 flex items-center gap-1 hover:text-blue-300 disabled:opacity-50 transition-colors uppercase tracking-widest"
                      >
                        <svg className={`w-4 h-4 ${isAiLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        {isAiLoading ? 'Optimizing...' : 'Enhance with AI'}
                      </button>
                    </div>
                    <textarea
                      rows={5}
                      placeholder="Write a compelling biography about yourself..."
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all leading-relaxed"
                      value={settingsForm.bio}
                      onChange={e => setSettingsForm({...settingsForm, bio: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-6">
                <div className="px-6 py-4 rounded-2xl bg-purple-500/5 border border-purple-500/20">
                  <p className="text-sm font-bold text-purple-400 uppercase tracking-widest">Contact Details</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest block">Email Address</label>
                    <div className="relative">
                      <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={settingsForm.email}
                        onChange={e => setSettingsForm({...settingsForm, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest block">Phone Number</label>
                    <div className="relative">
                      <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 00-.7.29l-1.36 1.36a1 1 0 00-.22 1.09C7.05 9.23 10.77 13 14.54 14.69c.33.12.77.04 1.09-.22l1.36-1.36a1 1 0 00.29-.7V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v3a2 2 0 002 2h3v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3z" /></svg>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={settingsForm.phone || ''}
                        onChange={e => setSettingsForm({...settingsForm, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black text-base uppercase tracking-widest rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-xl shadow-blue-900/40 hover:shadow-blue-900/60 transform hover:scale-105 active:scale-95 mt-8"
              >
                Save Profile Settings
              </button>
            </form>
          </div>
        )}

          )}

        {activeTab === 'projects' && (
          <div className="p-12 lg:p-20">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                <h2 className="text-3xl lg:text-4xl font-black text-white">Portfolio Management</h2>
              </div>
              <p className="text-slate-400 text-lg">Add, edit, and manage your project portfolio</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900/40 to-slate-950/40 p-12 rounded-2xl mb-16 border border-slate-800/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                <h3 className="font-black text-white text-lg uppercase tracking-widest">Create New Project</h3>
              </div>
              <form onSubmit={handleAddProject} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* LEFT COLUMN */}
                <div className="space-y-8">
                  {/* Basic Info */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Title</label>
                    <input
                      placeholder="Enter project title"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-700 font-medium"
                      value={newProject.title}
                      onChange={e => setNewProject({...newProject, title: e.target.value})}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Category</label>
                    <select
                      className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none"
                      value={newProject.category}
                      onChange={e => setNewProject({...newProject, category: e.target.value as ProjectCategory})}
                    >
                      {Object.values(ProjectCategory).map(cat => (
                        <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Short Description */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Short Description</label>
                    <textarea
                      placeholder="Brief description of the project..."
                      rows={3}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-slate-700"
                      value={newProject.description}
                      onChange={e => setNewProject({...newProject, description: e.target.value})}
                    />
                  </div>

                  {/* Detailed Description */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Detailed Description (About)</label>
                      <button 
                        type="button" 
                        onClick={handleAiProjectDesc}
                        disabled={isAiLoading}
                        className="text-[10px] font-bold text-blue-500 flex items-center hover:underline disabled:opacity-50 uppercase tracking-widest"
                      >
                        <svg className={`w-3 h-3 mr-2 ${isAiLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Draft with AI
                      </button>
                    </div>
                    <textarea
                      placeholder="Provide comprehensive project details..."
                      rows={4}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-slate-700"
                      value={newProject.detailedDescription}
                      onChange={e => setNewProject({...newProject, detailedDescription: e.target.value})}
                    />
                  </div>

                  {/* Cover Image */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Cover Image URL</label>
                    <input
                      placeholder="https://picsum.photos/800/600"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-700"
                      value={newProject.imageUrl}
                      onChange={e => setNewProject({...newProject, imageUrl: e.target.value})}
                    />
                  </div>

                  {/* Technologies/Languages */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Technologies/Skills</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        placeholder="Add skill"
                        className="flex-1 px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-700 text-sm"
                        value={skillInput}
                        onChange={e => setSkillInput(e.target.value)}
                        onKeyPress={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (skillInput.trim()) {
                              setNewProject({...newProject, skills: [...(newProject.skills || []), skillInput.trim()]});
                              setSkillInput('');
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (skillInput.trim()) {
                            setNewProject({...newProject, skills: [...(newProject.skills || []), skillInput.trim()]});
                            setSkillInput('');
                          }
                        }}
                        className="px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 text-sm font-bold"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newProject.skills?.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium flex items-center">
                          {skill}
                          <button type="button" onClick={() => setNewProject({...newProject, skills: newProject.skills?.filter((_, i) => i !== idx)})} className="ml-2 hover:text-blue-200">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Languages Used</label>
                    <div className="flex gap-2 mb-2">
                      <select
                        className="flex-1 px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
                        value={languageInput}
                        onChange={e => {
                          if (e.target.value && !newProject.languages?.includes(e.target.value)) {
                            setNewProject({...newProject, languages: [...(newProject.languages || []), e.target.value]});
                          }
                          setLanguageInput('');
                        }}
                      >
                        <option value="">Select a language</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="C#">C#</option>
                        <option value="Go">Go</option>
                        <option value="Rust">Rust</option>
                        <option value="PHP">PHP</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Swift">Swift</option>
                        <option value="Kotlin">Kotlin</option>
                        <option value="SQL">SQL</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="Sass/SCSS">Sass/SCSS</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          if (languageInput && !newProject.languages?.includes(languageInput)) {
                            setNewProject({...newProject, languages: [...(newProject.languages || []), languageInput]});
                            setLanguageInput('');
                          }
                        }}
                        className="px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 text-sm font-bold"
                        disabled={!languageInput}
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newProject.languages?.map((lang, idx) => (
                        <span key={idx} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-medium flex items-center">
                          {lang}
                          <button type="button" onClick={() => setNewProject({...newProject, languages: newProject.languages?.filter((_, i) => i !== idx)})} className="ml-2 hover:text-emerald-200">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Your Role */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Your Role in Project</label>
                    <input
                      placeholder="e.g. Full-Stack Developer, Lead Designer"
                      className="w-full px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-700"
                      value={newProject.role}
                      onChange={e => setNewProject({...newProject, role: e.target.value})}
                    />
                  </div>

                  {/* Featured Toggle */}
                  <div className="flex items-center p-6 bg-slate-800/30 rounded-2xl border border-slate-800">
                    <div className="relative inline-block w-12 mr-4 align-middle select-none transition duration-200 ease-in">
                      <input 
                        type="checkbox" 
                        id="featured" 
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-slate-700 border-4 border-slate-950 appearance-none cursor-pointer"
                        checked={newProject.featured}
                        onChange={e => setNewProject({...newProject, featured: e.target.checked})}
                      />
                      <label htmlFor="featured" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-800 cursor-pointer"></label>
                    </div>
                    <label htmlFor="featured" className="text-sm font-bold text-slate-300 uppercase tracking-widest">Pin to Highlights</label>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-8">
                  {/* Links */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Demo (Optional)</label>
                    <input
                      placeholder="https://demo.example.com"
                      className="w-full px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-700 text-sm"
                      value={newProject.link}
                      onChange={e => setNewProject({...newProject, link: e.target.value})}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">GitHub (Optional)</label>
                    <input
                      placeholder="https://github.com/user/repo"
                      className="w-full px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-700 text-sm"
                      value={newProject.github}
                      onChange={e => setNewProject({...newProject, github: e.target.value})}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Case Study (Optional)</label>
                    <input
                      placeholder="https://casestudy.example.com"
                      className="w-full px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-700 text-sm"
                      value={newProject.caseStudyLink}
                      onChange={e => setNewProject({...newProject, caseStudyLink: e.target.value})}
                    />
                  </div>

                  {/* Status & Dates */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</label>
                    <select
                      className="w-full px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={newProject.status}
                      onChange={e => setNewProject({...newProject, status: e.target.value as any})}
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Planned">Planned</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={newProject.startDate}
                      onChange={e => setNewProject({...newProject, startDate: e.target.value})}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">End Date (Optional)</label>
                    <input
                      type="date"
                      className="w-full px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={newProject.endDate}
                      onChange={e => setNewProject({...newProject, endDate: e.target.value})}
                    />
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Key Features</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        placeholder="Add a key feature"
                        className="flex-1 px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-700 text-sm"
                        value={featureInput}
                        onChange={e => setFeatureInput(e.target.value)}
                        onKeyPress={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (featureInput.trim()) {
                              setNewProject({...newProject, keyFeatures: [...(newProject.keyFeatures || []), featureInput.trim()]});
                              setFeatureInput('');
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (featureInput.trim()) {
                            setNewProject({...newProject, keyFeatures: [...(newProject.keyFeatures || []), featureInput.trim()]});
                            setFeatureInput('');
                          }
                        }}
                        className="px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 text-sm font-bold"
                      >
                        Add
                      </button>
                    </div>
                    <div className="space-y-2 max-h-24 overflow-y-auto">
                      {newProject.keyFeatures?.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                          <span className="text-sm text-slate-200">{feature}</span>
                          <button type="button" onClick={() => setNewProject({...newProject, keyFeatures: newProject.keyFeatures?.filter((_, i) => i !== idx)})} className="text-red-500 hover:text-red-400">×</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Challenges</label>
                    <textarea
                      placeholder="What challenges did you face?"
                      rows={2}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-slate-700"
                      value={newProject.challenges}
                      onChange={e => setNewProject({...newProject, challenges: e.target.value})}
                    />
                  </div>

                  {/* Solutions */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Solutions</label>
                    <textarea
                      placeholder="How did you solve them?"
                      rows={2}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-slate-700"
                      value={newProject.solutions}
                      onChange={e => setNewProject({...newProject, solutions: e.target.value})}
                    />
                  </div>

                  {/* Results */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Results / Impact</label>
                    <textarea
                      placeholder="What were the measurable results?"
                      rows={2}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-slate-700"
                      value={newProject.results}
                      onChange={e => setNewProject({...newProject, results: e.target.value})}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-10 py-5 bg-white text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:bg-blue-50 transition-all duration-300 transform active:scale-95 text-lg"
                  >
                    Save / Publish Project
                  </button>
                </div>
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
