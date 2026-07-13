'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

interface ProjectForm {
  title: string;
  slug: string;
  description: string;
  technologies: string;
  live_url: string;
  github_url: string;
  category: string;
  featured: boolean;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const { register, handleSubmit, reset } = useForm<ProjectForm>();
  const [loading, setLoading] = useState(true);
  const isNewProject = params.id === 'new';

  useEffect(() => {
    if (!isNewProject) {
      fetchProject();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}`);
      const data = await response.json();
      reset({
        ...data,
        technologies: data.technologies?.join(', ') || '',
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch project:', error);
      setLoading(false);
    }
  };

  const onSubmit = async (formData: ProjectForm) => {
    try {
      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()),
      };

      const response = await fetch(
        isNewProject ? '/api/projects' : `/api/projects/${params.id}`,
        {
          method: isNewProject ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        router.push('/admin/projects');
      }
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-foreground/70">Loading...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-8">
            {isNewProject ? 'New Project' : 'Edit Project'}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-lg p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Title</label>
                <input
                  {...register('title', { required: true })}
                  type="text"
                  className="w-full px-4 py-2 bg-foreground/5 border border-accent/20 rounded-lg text-white placeholder-foreground/50 focus:outline-none focus:border-accent"
                  placeholder="Project title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Slug</label>
                <input
                  {...register('slug', { required: true })}
                  type="text"
                  className="w-full px-4 py-2 bg-foreground/5 border border-accent/20 rounded-lg text-white placeholder-foreground/50 focus:outline-none focus:border-accent"
                  placeholder="project-slug"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Description</label>
              <textarea
                {...register('description', { required: true })}
                className="w-full px-4 py-2 bg-foreground/5 border border-accent/20 rounded-lg text-white placeholder-foreground/50 focus:outline-none focus:border-accent h-32"
                placeholder="Project description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Technologies (comma-separated)
                </label>
                <input
                  {...register('technologies')}
                  type="text"
                  className="w-full px-4 py-2 bg-foreground/5 border border-accent/20 rounded-lg text-white placeholder-foreground/50 focus:outline-none focus:border-accent"
                  placeholder="React, TypeScript, Next.js"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Category</label>
                <input
                  {...register('category')}
                  type="text"
                  className="w-full px-4 py-2 bg-foreground/5 border border-accent/20 rounded-lg text-white placeholder-foreground/50 focus:outline-none focus:border-accent"
                  placeholder="Web Development"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">GitHub URL</label>
                <input
                  {...register('github_url')}
                  type="url"
                  className="w-full px-4 py-2 bg-foreground/5 border border-accent/20 rounded-lg text-white placeholder-foreground/50 focus:outline-none focus:border-accent"
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Live URL</label>
                <input
                  {...register('live_url')}
                  type="url"
                  className="w-full px-4 py-2 bg-foreground/5 border border-accent/20 rounded-lg text-white placeholder-foreground/50 focus:outline-none focus:border-accent"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3">
                <input
                  {...register('featured')}
                  type="checkbox"
                  className="w-4 h-4 rounded"
                />
                <span className="text-white font-semibold">Featured Project</span>
              </label>
            </div>

            <div className="flex gap-4 pt-6 border-t border-accent/10">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-accent hover:bg-accent/80 text-white font-bold rounded-lg transition-colors"
              >
                {isNewProject ? 'Create Project' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 bg-foreground/10 hover:bg-foreground/20 text-white font-bold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
