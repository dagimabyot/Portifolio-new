
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  images: string[];
  live_url?: string;
  github_url?: string;
  index?: number;
}

export default function ProjectCard({
  slug,
  title,
  description,
  technologies,
  images,
  live_url,
  github_url,
  index = 0,
}: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className="glass rounded-lg overflow-hidden hover:border-accent/50 transition-all group cursor-pointer h-full flex flex-col"
      >
        {/* Image */}
        <div className="h-48 bg-gradient-to-br from-accent/10 to-blue-600/10 overflow-hidden relative">
          {images?.[0] ? (
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">📱</div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{title}</h3>
          <p className="text-foreground/70 text-sm mb-4 flex-grow">{description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies?.slice(0, 3).map((tech) => (
              <span key={tech} className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                {tech}
              </span>
            ))}
            {technologies?.length > 3 && (
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                +{technologies.length - 3}
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
  );
}
