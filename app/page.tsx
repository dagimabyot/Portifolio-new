'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold">
                Hi, I&apos;m <span className="text-accent">Dagim Abyot</span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-foreground/80">
                Full Stack Developer | Web Designer | Problem Solver
              </p>
              
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                I create beautiful, functional, and user-centric digital solutions. 
                Specializing in modern web technologies to bring your ideas to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link
                  href="/portfolio"
                  className="px-8 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-all transform hover:scale-105"
                >
                  View My Work
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 border-2 border-accent text-accent hover:bg-accent/10 font-bold rounded-lg transition-all"
                >
                  Let&apos;s Connect
                </Link>
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-20"
            >
              <svg className="w-6 h-6 mx-auto text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects Preview */}
        <section className="py-20 px-4 bg-card/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="glass rounded-lg p-6 hover:border-accent/50 transition-all group cursor-pointer"
                >
                  <div className="h-48 bg-gradient-to-br from-accent/10 to-blue-600/10 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-4xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Project {i}</h3>
                  <p className="text-foreground/70 mb-4">
                    Amazing project built with modern technologies
                  </p>
                  <Link href="/portfolio" className="text-accent hover:text-accent-dark font-semibold">
                    Learn More →
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="px-8 py-3 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 rounded-lg font-semibold transition-all"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center glass rounded-lg p-12">
            <h2 className="text-4xl font-bold mb-6">Ready to work together?</h2>
            <p className="text-lg text-foreground/80 mb-8">
              Let&apos;s create something amazing. Get in touch with me today.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-all transform hover:scale-105"
            >
              Start a Project
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
