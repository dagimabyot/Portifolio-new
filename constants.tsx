
import { ProjectCategory, PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  projects: [
    {
      id: '1',
      title: 'Console Project',
      description: 'A modern console application with interactive features and real-time updates. Add your project details and custom images.',
      category: ProjectCategory.WEB,
      imageUrl: 'https://picsum.photos/seed/console/800/600',
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      languages: ['TypeScript', 'JavaScript'],
      featured: true,
      github: 'https://github.com/dagimabyot/console-project',
      link: 'https://console-project-demo.vercel.app',
      moreDetails: 'Built with React 18 and TypeScript, this project showcases modern web development practices with a responsive design and interactive UI components. Features real-time data synchronization and advanced state management.'
    },
    {
      id: '2',
      title: 'Global E-Commerce Platform',
      description: 'A high-performance e-commerce solution with real-time inventory management, global payment integration, and an advanced admin dashboard.',
      category: ProjectCategory.WEB,
      imageUrl: 'https://picsum.photos/seed/ecommerce/800/600',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      languages: ['JavaScript', 'TypeScript', 'SQL'],
      featured: true,
      github: 'https://github.com/dagimabyot/ecommerce-platform',
      link: 'https://ecommerce-platform-demo.vercel.app',
      moreDetails: 'Full-stack e-commerce platform with integrated Stripe payments, real-time inventory tracking, and a comprehensive admin dashboard. Features multi-currency support and advanced search capabilities.'
    },
    {
      id: '3',
      title: 'AI-Powered Content Engine',
      description: 'An intelligent platform that leverages Large Language Models to generate, optimize, and schedule social media content for brands.',
      category: ProjectCategory.AI,
      imageUrl: 'https://picsum.photos/seed/ai-content/800/600',
      skills: ['Python', 'Gemini API', 'FastAPI', 'Next.js', 'Redis'],
      languages: ['Python', 'JavaScript', 'TypeScript'],
      featured: true,
      link: 'https://ai-content-demo.example.com',
      github: 'https://github.com/dagimabyot/ai-content-engine',
      moreDetails: 'Leverages Google Gemini API to intelligently generate and optimize social media content. Features content scheduling, analytics integration, and brand-aware content generation with Redis caching.'
    },
    {
      id: '4',
      title: 'Real-time Collaboration Tool',
      description: 'A workspace for teams to collaborate on documents and projects in real-time, featuring live cursors and instant notifications.',
      category: ProjectCategory.WEB,
      imageUrl: 'https://picsum.photos/seed/collab/800/600',
      skills: ['TypeScript', 'Socket.io', 'Express', 'React', 'MongoDB'],
      languages: ['TypeScript', 'JavaScript'],
      featured: true,
      github: 'https://github.com/dagimabyot/collab-tool',
      link: 'https://collab-tool-demo.vercel.app',
      moreDetails: 'Real-time collaboration platform powered by Socket.io with live cursor tracking, document synchronization, and instant notifications. Supports team workspaces and permission-based access control.'
    },
    {
      id: '5',
      title: 'Fitness Tracking Mobile App',
      description: 'A comprehensive mobile application for tracking workouts, nutrition, and health metrics with personalized insights.',
      category: ProjectCategory.MOBILE,
      imageUrl: 'https://picsum.photos/seed/fitness/800/600',
      skills: ['React Native', 'Firebase', 'Redux', 'Expo'],
      languages: ['JavaScript', 'TypeScript'],
      featured: false,
      link: 'https://fitness-app.example.com',
      github: 'https://github.com/dagimabyot/fitness-app',
      moreDetails: 'Cross-platform mobile app built with React Native and Expo. Features real-time workout tracking, personalized nutrition plans, health metrics analysis, and social sharing capabilities with Firebase backend.'
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'Sarah Jenkins',
      role: 'Product Manager',
      company: 'TechCorp',
      content: 'Dagim is an absolute professional. The project was delivered ahead of schedule and exceeded our technical expectations. His attention to detail in the UI is unmatched.',
      avatar: 'https://picsum.photos/seed/sarah/100/100'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'CTO',
      company: 'InnovateSoft',
      content: 'Working with Dagim was a breeze. He has a deep understanding of full-stack architecture and was able to solve complex backend challenges while keeping the frontend performant.',
      avatar: 'https://picsum.photos/seed/michael/100/100'
    }
  ],
  leads: [],
  settings: {
    name: 'Dagim Abyot',
    brandName: 'Dagim.dev',
    bio: 'I am a results-driven Full Stack Developer with 2+ years of experience building scalable web applications. I specialize in React, Node.js, and Python, with a passion for clean code and exceptional user experiences. I bridge the gap between complex backend logic and intuitive frontend design.',
    heroHeadline: "Hi i'm Dagim Abyot Full stack developer",
    heroSubline: 'I engineer high-performance digital solutions that combine technical precision with creative design.',
    email: 'dagim045@gmail.com',
    phone: '+251 977078336',
    socials: {
      github: 'https://github.com/dagimabyot/',
      linkedin: 'https://www.linkedin.com/in/dagim-abyot/',
      twitter: 'https://twitter.com/dagim_dev'
    }
  }
};
