'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  start_date: string;
  end_date?: string;
}

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experience');
      const data = await response.json();
      setExperiences(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-foreground/70">Loading experience...</div>;

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-white mb-12">Experience</h2>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass rounded-lg p-6 border-l-4 border-accent"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <p className="text-accent font-semibold">{exp.company}</p>
              </div>
              <p className="text-foreground/70 text-sm">
                {new Date(exp.start_date).toLocaleDateString()} -{' '}
                {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}
              </p>
            </div>
            <p className="text-foreground/80 mt-4">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
