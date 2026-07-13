'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: number;
}

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await fetch('/api/education');
      const data = await response.json();
      setEducation(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch education:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-foreground/70">Loading education...</div>;

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-white mb-12">Education</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass rounded-lg p-6"
          >
            <p className="text-accent font-semibold mb-2">{edu.year}</p>
            <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
            <p className="text-foreground/80">{edu.institution}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
