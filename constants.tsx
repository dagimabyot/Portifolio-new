
import { ProjectCategory, PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  projects: [
    {
      id: '1',
      title: 'Global E-Commerce Platform',
      description: 'A high-performance e-commerce solution with real-time inventory management, global payment integration, and an advanced admin dashboard.',
      category: ProjectCategory.WEB,
      imageUrl: 'https://picsum.photos/seed/ecommerce/800/600',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      featured: true,
      github: 'https://github.com/dagimabyot/ecommerce-platform'
    },
    {
      id: '2',
      title: 'AI-Powered Content Engine',
      description: 'An intelligent platform that leverages Large Language Models to generate, optimize, and schedule social media content for brands.',
      category: ProjectCategory.AI,
      imageUrl: 'https://picsum.photos/seed/ai-content/800/600',
      skills: ['Python', 'Gemini API', 'FastAPI', 'Next.js', 'Redis'],
      featured: true,
      link: 'https://ai-content-demo.example.com',
      github: 'https://github.com/dagimabyot/ai-content-engine'
    },
    {
      id: '3',
      title: 'Real-time Collaboration Tool',
      description: 'A workspace for teams to collaborate on documents and projects in real-time, featuring live cursors and instant notifications.',
      category: ProjectCategory.WEB,
      imageUrl: 'https://picsum.photos/seed/collab/800/600',
      skills: ['TypeScript', 'Socket.io', 'Express', 'React', 'MongoDB'],
      featured: true,
      github: 'https://github.com/dagimabyot/collab-tool'
    },
    {
      id: '4',
      title: 'Fitness Tracking Mobile App',
      description: 'A comprehensive mobile application for tracking workouts, nutrition, and health metrics with personalized insights.',
      category: ProjectCategory.MOBILE,
      imageUrl: 'https://picsum.photos/seed/fitness/800/600',
      skills: ['React Native', 'Firebase', 'Redux', 'Expo'],
      featured: false,
      link: 'https://fitness-app.example.com'
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
