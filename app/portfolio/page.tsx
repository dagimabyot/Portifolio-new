'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  images: string[];
  github_url: string;
  live_url: string;
  category: string;
  featured: boolean;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('completed_date', { ascending: false });
        
        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-grow pt-20">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
              <p className="mt-4 text-foreground/70">Loading projects...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-card/30">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Portfolio</h1>
            <p className="text-xl text-foreground/80">
              Explore my latest projects and see what I&apos;ve been working on.
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-accent text-white'
                      : 'bg-card hover:bg-card-hover text-foreground/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-foreground/70 text-lg">No projects found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, i) => (
                  <Link href={`/portfolio/${project.slug}`}>
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="glass rounded-lg overflow-hidden hover:border-accent/50 transition-all group cursor-pointer h-full flex flex-col"
                    >
                      {/* Image */}
                      <div className="h-48 bg-gradient-to-br from-accent/10 to-blue-600/10 overflow-hidden relative">
                        {project.images?.[0] ? (
                          <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl">📱</div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                        <p className="text-foreground/70 text-sm mb-4 flex-grow">{project.description}</p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies?.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                              {tech}
                            </span>
                          ))}
                          {project.technologies?.length > 3 && (
                            <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Links */}
                        <div className="flex gap-3 pt-4 border-t border-accent/10">
                          <span className="flex-1 text-center px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded text-sm font-semibold transition-all">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
