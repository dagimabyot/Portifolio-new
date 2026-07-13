'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express.js', 'PostgreSQL', 'Supabase', 'MongoDB'],
    },
    {
      category: 'Tools',
      items: ['Git', 'Docker', 'AWS', 'REST APIs', 'GraphQL'],
    },
  ];

  const experience = [
    {
      role: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc',
      period: '2023 - Present',
      description: 'Led development of multiple web applications and mentored junior developers.',
    },
    {
      role: 'Full Stack Developer',
      company: 'Digital Innovations Ltd',
      period: '2022 - 2023',
      description: 'Developed and maintained web applications with a focus on performance.',
    },
    {
      role: 'Junior Developer',
      company: 'StartUp Hub',
      period: '2021 - 2022',
      description: 'Contributed to frontend and backend development of various projects.',
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-card/30">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">About Me</h1>
            <p className="text-xl text-foreground/80">
              Passionate full stack developer with a mission to create elegant solutions to complex problems.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Text */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Who I Am</h2>
                <p className="text-foreground/80">
                  I&apos;m a full stack developer with a passion for building beautiful and functional web applications. 
                  With years of experience in both frontend and backend development, I specialize in creating 
                  user-centric solutions that solve real-world problems.
                </p>
                <p className="text-foreground/80">
                  My journey in tech started with a curiosity about how things work. Today, I leverage modern 
                  technologies like React, Next.js, Node.js, and PostgreSQL to build scalable and performant applications.
                </p>
                <p className="text-foreground/80">
                  When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, 
                  or sharing knowledge with the developer community.
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-6">
                <div className="glass rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-accent mb-2">50+</h3>
                  <p className="text-foreground/70">Projects Completed</p>
                </div>
                <div className="glass rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-accent mb-2">30+</h3>
                  <p className="text-foreground/70">Happy Clients</p>
                </div>
                <div className="glass rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-accent mb-2">5+</h3>
                  <p className="text-foreground/70">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-4 bg-card/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Skills & Expertise</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category} className="glass rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-6 text-accent">{skillGroup.category}</h3>
                  <div className="space-y-3">
                    {skillGroup.items.map((skill) => (
                      <div key={skill} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-foreground/80">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
            
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div key={i} className="glass rounded-lg p-6 border-l-4 border-accent">
                  <div className="flex flex-col md:flex-row justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-accent">{exp.company}</p>
                    </div>
                    <p className="text-foreground/60 text-sm">{exp.period}</p>
                  </div>
                  <p className="text-foreground/80">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
