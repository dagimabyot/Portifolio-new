'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';

export default function About() {

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
            <SkillsSection />
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <ExperienceSection />
          </div>
        </section>

        {/* Education Section */}
        <section className="py-20 px-4 bg-card/30 pb-32">
          <div className="max-w-4xl mx-auto">
            <EducationSection />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
