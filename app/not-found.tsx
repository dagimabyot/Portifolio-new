'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-foreground/70 mb-8">Page not found</p>
        <p className="text-foreground/60 mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-accent hover:bg-accent/80 text-white font-bold rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
