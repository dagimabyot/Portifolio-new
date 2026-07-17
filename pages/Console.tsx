import React, { useState } from 'react';
import { PortfolioData, Project, ProjectCategory } from '../types';

interface ConsoleProps {
  data: PortfolioData;
  onCreateProject: (project: Project) => Promise<void> | void;
}

const CATEGORY_MAP: Record<string, ProjectCategory> = {
  web: ProjectCategory.WEB,
  mobile: ProjectCategory.MOBILE,
  ai: ProjectCategory.AI,
  design: ProjectCategory.DESIGN,
};

const Console: React.FC<ConsoleProps> = ({ data, onCreateProject }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    languages: '',
    imageUrl: '',
    deployedLink: '',
    githubLink: '',
    category: ''
  });
  const [deploying, setDeploying] = useState(false);
  const [deployMessage, setDeployMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, imageUrl: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setDeployMessage({ type: 'error', text: 'Title and description are required.' });
      return;
    }
    setDeploying(true);
    setDeployMessage(null);
    try {
      await onCreateProject({
        id: Date.now().toString(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: CATEGORY_MAP[formData.category] || ProjectCategory.WEB,
        imageUrl: formData.imageUrl || 'https://picsum.photos/800/600',
        skills: [],
        languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean),
        link: formData.deployedLink,
        github: formData.githubLink,
        featured: false,
        status: 'Completed',
      });
      setDeployMessage({ type: 'success', text: 'Asset deployed — it now appears in your Portfolio.' });
      setFormData({
        title: '',
        description: '',
        languages: '',
        imageUrl: '',
        deployedLink: '',
        githubLink: '',
        category: ''
      });
    } catch (err: any) {
      setDeployMessage({ type: 'error', text: err.message || 'Failed to deploy asset.' });
    } finally {
      setDeploying(false);
    }
  };

  const consoleProject = data.projects.find(p => p.id === '1');

  return (
    <div className="px-8 sm:px-12 lg:px-16 py-20 space-y-20">
      {/* Console Project Header */}
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-12">
          <span className="text-blue-500 font-bold text-sm uppercase tracking-widest block">Project Management</span>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">Console Project</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Manage and deploy your console project assets with ease.</p>
        </div>

        {/* Console Project Overview */}
        {consoleProject && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">{consoleProject.title}</h2>
            <p className="text-slate-400 mb-6">{consoleProject.description}</p>
            
            {consoleProject.languages && consoleProject.languages.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {consoleProject.languages.map(lang => (
                    <span key={lang} className="px-3 py-1 text-sm font-semibold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {consoleProject.github && (
                <a 
                  href={consoleProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
              )}
              {consoleProject.link && (
                <a 
                  href={consoleProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Visit Live
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Asset Management Section */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-black text-white">Deploy New Asset</h2>
          <p className="text-slate-400 mt-2">Add images, update project details, and manage your assets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white">Add New Asset</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Asset Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter asset name" 
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your asset" 
                  rows={3} 
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Choose Languages</label>
                <input 
                  type="text" 
                  name="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                  placeholder="e.g., TypeScript, JavaScript, Python" 
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <p className="text-xs text-slate-400 mt-1">Separate multiple languages with commas</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Upload Image</label>
                <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <svg className="w-8 h-8 mx-auto text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden" 
                    id="image-upload" 
                  />
                  <label htmlFor="image-upload" className="block cursor-pointer">
                    <p className="text-sm text-slate-400">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
                {formData.imageUrl && (
                  <div className="mt-4 relative h-40 rounded-xl overflow-hidden border border-slate-700">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white">Asset Links</h3>
            
            <form onSubmit={handleDeploy} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Deployed Link</label>
                <div className="relative">
                  <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  <input 
                    type="url" 
                    name="deployedLink"
                    value={formData.deployedLink}
                    onChange={handleInputChange}
                    placeholder="https://example.com" 
                    className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">GitHub Repository</label>
                <div className="relative">
                  <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <input 
                    type="url" 
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username/repo" 
                    className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Asset Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Select Category</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile App</option>
                  <option value="ai">AI/Machine Learning</option>
                  <option value="design">Design</option>
                </select>
              </div>

              {deployMessage && (
                <div className={`px-5 py-4 rounded-xl text-sm font-medium border ${
                  deployMessage.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  {deployMessage.text}
                </div>
              )}

              <button 
                type="submit"
                disabled={deploying}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40 transform hover:scale-105 active:scale-95 mt-6 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {deploying ? 'Deploying…' : 'Deploy Asset'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Console;
