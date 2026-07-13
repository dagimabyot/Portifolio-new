'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
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
  role: string;
  key_features: string[];
  challenges: string;
  solutions: string;
  results: string;
}

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setProject(data);

        // Fetch related projects from same category
        const { data: related } = await supabase
          .from('projects')
          .select('*')
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(3);

        setRelatedProjects(related || []);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-grow pt-20">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
              <p className="mt-4 text-foreground/70">Loading project...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Header />
        <main className="flex-grow pt-20">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
              <p className="text-foreground/70 mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
              <Link href="/portfolio" className="text-accent hover:text-accent-dark font-semibold">
                ← Back to Portfolio
              </Link>
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
        {/* Hero Image */}
        <section className="w-full h-96 bg-card/30 relative overflow-hidden">
          {project.images && project.images[0] ? (
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">📱</div>
          )}
        </section>

        {/* Project Content */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <Link href="/portfolio" className="text-accent hover:text-accent-dark mb-4 inline-block">
                ← Back to Portfolio
              </Link>
              <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-foreground/80 mb-6">{project.description}</p>
              
              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="glass rounded-lg p-4">
                  <p className="text-foreground/60 text-sm mb-1">Category</p>
                  <p className="font-semibold">{project.category}</p>
                </div>
                <div className="glass rounded-lg p-4">
                  <p className="text-foreground/60 text-sm mb-1">Role</p>
                  <p className="font-semibold">{project.role}</p>
                </div>
                <div className="glass rounded-lg p-4">
                  <p className="text-foreground/60 text-sm mb-1">Status</p>
                  <p className="font-semibold">Completed</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-wrap">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-all"
                  >
                    View Live Demo
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-card hover:bg-card-hover text-foreground font-semibold rounded-lg transition-all border border-accent/30"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </motion.div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-accent/10 text-accent rounded-full font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Key Features */}
            {project.key_features && project.key_features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                <ul className="space-y-3">
                  {project.key_features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-accent text-xl mt-1">✓</span>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Challenges & Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {project.challenges && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass rounded-lg p-8"
                >
                  <h3 className="text-xl font-bold mb-4 text-accent">Challenges</h3>
                  <p className="text-foreground/80 leading-relaxed">{project.challenges}</p>
                </motion.div>
              )}
              {project.solutions && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass rounded-lg p-8"
                >
                  <h3 className="text-xl font-bold mb-4 text-accent">Solutions</h3>
                  <p className="text-foreground/80 leading-relaxed">{project.solutions}</p>
                </motion.div>
              )}
            </div>

            {/* Project Gallery */}
            {project.images && project.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.images.slice(1).map((image, i) => (
                    <div key={i} className="rounded-lg overflow-hidden h-64 relative">
                      <Image
                        src={image}
                        alt={`${project.title} screenshot ${i + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-20 px-4 bg-card/30">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((relProject, i) => (
                  <motion.div
                    key={relProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="glass rounded-lg overflow-hidden hover:border-accent/50 transition-all group cursor-pointer"
                  >
                    <Link href={`/portfolio/${relProject.slug}`} className="block h-full">
                      <div className="h-48 bg-gradient-to-br from-accent/10 to-blue-600/10 overflow-hidden relative">
                        {relProject.images?.[0] ? (
                          <Image
                            src={relProject.images[0]}
                            alt={relProject.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl">📱</div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                          {relProject.title}
                        </h3>
                        <p className="text-foreground/70 text-sm">{relProject.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
