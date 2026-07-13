'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  id: string;
  skill_name: string;
  category: string;
  percentage: number;
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const data = await response.json();
      setSkills(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-foreground/70">Loading skills...</div>;

  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-white mb-12">Technical Skills</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {categories.map((category, catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-accent mb-6">{category}</h3>

            <div className="space-y-4">
              {skills
                .filter(s => s.category === category)
                .map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{skill.skill_name}</span>
                      <span className="text-accent">{skill.percentage}%</span>
                    </div>
                    <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ delay: index * 0.1, duration: 1 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-accent to-blue-600 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
