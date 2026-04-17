import React, { useState, useEffect } from 'react'
import { PortfolioData } from '../types'
import {
  fetchProjects,
  fetchLeads,
  fetchTestimonials,
  addProject,
  deleteProject,
  updateLeadStatus,
  deleteLead,
  addTestimonial,
} from '../lib/database'
import { Project, Testimonial, Lead } from '../lib/supabase'

interface ConsoleSupabaseProps {
  data: PortfolioData
}

const ConsoleSupabase: React.FC<ConsoleSupabaseProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'leads' | 'testimonials'>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    url: '',
    image: '',
    technologies: '',
    category: '',
    featured: false,
  })

  const [testimonialForm, setTestimonialForm] = useState({
    author: '',
    content: '',
    role: '',
    image: '',
  })

  // Load data on mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [projectsData, leadsData, testimonialsData] = await Promise.all([
        fetchProjects(),
        fetchLeads(),
        fetchTestimonials(),
      ])

      setProjects(projectsData)
      setLeads(leadsData)
      setTestimonials(testimonialsData)
    } catch (error) {
      console.error('[v0] Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()

    const newProject = await addProject({
      title: projectForm.title,
      description: projectForm.description,
      url: projectForm.url,
      image: projectForm.image,
      technologies: projectForm.technologies.split(',').map((t) => t.trim()),
      category: projectForm.category,
      featured: projectForm.featured,
    })

    if (newProject) {
      setProjects([newProject, ...projects])
      setProjectForm({
        title: '',
        description: '',
        url: '',
        image: '',
        technologies: '',
        category: '',
        featured: false,
      })
      setShowAddForm(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const success = await deleteProject(id)
      if (success) {
        setProjects(projects.filter((p) => p.id !== id))
      }
    }
  }

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault()

    const newTestimonial = await addTestimonial({
      author: testimonialForm.author,
      content: testimonialForm.content,
      role: testimonialForm.role,
      image: testimonialForm.image,
    })

    if (newTestimonial) {
      setTestimonials([newTestimonial, ...testimonials])
      setTestimonialForm({
        author: '',
        content: '',
        role: '',
        image: '',
      })
      setShowAddForm(false)
    }
  }

  const handleUpdateLeadStatus = async (id: string, status: 'new' | 'contacted' | 'closed') => {
    const updated = await updateLeadStatus(id, status)
    if (updated) {
      setLeads(leads.map((l) => (l.id === id ? updated : l)))
    }
  }

  const handleDeleteLead = async (id: string) => {
    if (window.confirm('Delete this lead?')) {
      const success = await deleteLead(id)
      if (success) {
        setLeads(leads.filter((l) => l.id !== id))
      }
    }
  }

  if (isLoading) {
    return (
      <div className="px-8 sm:px-12 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">Loading data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-8 sm:px-12 lg:px-16 py-20 space-y-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-12">
          <span className="text-blue-500 font-bold text-sm uppercase tracking-widest block">Admin Dashboard</span>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">Console Dashboard</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Manage your portfolio projects, leads, and testimonials.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {(['projects', 'leads', 'testimonials'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setShowAddForm(false)
              }}
              className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {tab === 'projects' && `Projects (${projects.length})`}
              {tab === 'leads' && `Leads (${leads.length})`}
              {tab === 'testimonials' && `Testimonials (${testimonials.length})`}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Portfolio Projects</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all"
              >
                {showAddForm ? 'Cancel' : '+ Add Project'}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddProject} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Title</label>
                    <input
                      type="text"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="Project title"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Category</label>
                    <input
                      type="text"
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      placeholder="e.g., Web Application"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Description</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Project description"
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">URL</label>
                    <input
                      type="url"
                      value={projectForm.url}
                      onChange={(e) => setProjectForm({ ...projectForm, url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Image URL</label>
                    <input
                      type="url"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                    placeholder="React, TypeScript, JavaScript"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="featured" className="text-sm font-semibold text-white">
                    Featured on homepage
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all"
                >
                  Add Project
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 overflow-hidden">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                  )}
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">{project.description}</p>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 rounded-full">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="ml-2 inline-block px-3 py-1 text-xs font-semibold bg-yellow-500/20 text-yellow-300 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-center font-bold transition-all"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="px-3 py-2 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Contact Leads</h2>

            <div className="space-y-4">
              {leads.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No leads yet</p>
              ) : (
                leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">{lead.name}</h3>
                        <p className="text-sm text-slate-400">{lead.email}</p>
                        {lead.phone && <p className="text-sm text-slate-400">{lead.phone}</p>}
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          lead.status === 'new'
                            ? 'bg-green-500/20 text-green-300'
                            : lead.status === 'contacted'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-gray-500/20 text-gray-300'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-slate-300">{lead.message}</p>
                    <div className="flex gap-2 pt-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleUpdateLeadStatus(lead.id, e.target.value as 'new' | 'contacted' | 'closed')
                        }
                        className="px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Testimonials</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all"
              >
                {showAddForm ? 'Cancel' : '+ Add Testimonial'}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddTestimonial} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Author</label>
                    <input
                      type="text"
                      value={testimonialForm.author}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                      placeholder="Author name"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Role</label>
                    <input
                      type="text"
                      value={testimonialForm.role}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                      placeholder="e.g., CEO, Project Manager"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Testimonial</label>
                  <textarea
                    value={testimonialForm.content}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                    placeholder="Testimonial text"
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Image URL</label>
                  <input
                    type="url"
                    value={testimonialForm.image}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all"
                >
                  Add Testimonial
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                  {testimonial.image && (
                    <img src={testimonial.image} alt={testimonial.author} className="w-16 h-16 rounded-full mb-4" />
                  )}
                  <p className="text-slate-300 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="text-white font-bold">{testimonial.author}</p>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConsoleSupabase
