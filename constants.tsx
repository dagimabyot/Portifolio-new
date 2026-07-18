
import { ProjectCategory, PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  projects: [
    {
      id: '1',
      title: 'Console Project',
      description: 'A modern console application with interactive features and real-time updates.',
      detailedDescription: 'Built with React 18 and TypeScript, this project showcases modern web development practices with a responsive design and interactive UI components. The application features real-time data synchronization and advanced state management patterns for optimal performance.',
      category: ProjectCategory.WEB,
      imageUrl: 'https://picsum.photos/seed/console/800/600',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      languages: ['TypeScript', 'JavaScript'],
      featured: true,
      github: 'https://github.com/dagimabyot/console-project',
      link: 'https://console-project-demo.vercel.app',
      moreDetails: 'Built with React 18 and TypeScript, this project showcases modern web development practices with a responsive design and interactive UI components. Features real-time data synchronization and advanced state management.',
      status: 'Completed',
      startDate: '2024-01-15',
      endDate: '2024-03-20',
      role: 'Full-Stack Developer',
      keyFeatures: [
        'Real-time data synchronization using WebSockets',
        'Advanced state management with custom hooks',
        'Responsive design for all device sizes',
        'Dark mode support with theme persistence',
        'Performance optimized with code splitting'
      ],
      challenges: 'Managing real-time state across multiple components while maintaining performance. The main challenge was implementing efficient data synchronization without overwhelming the network.',
      solutions: 'Implemented a custom hook-based state management system combined with WebSocket optimization techniques. Used debouncing and throttling for network requests.',
      results: 'Achieved 98% Lighthouse score, 50% reduction in bundle size, and support for 10,000+ concurrent users with zero data loss.'
    },
    {
      id: '2',
      title: 'Global E-Commerce Platform',
      description: 'A high-performance e-commerce solution with real-time inventory management and global payment integration.',
      detailedDescription: 'This full-stack e-commerce platform leverages modern technologies to deliver a seamless shopping experience. Built on React and Node.js with PostgreSQL backend, it handles complex transactions, multi-currency support, and real-time inventory synchronization across multiple warehouses.',
      category: ProjectCategory.WEB,
      imageUrl: 'https://picsum.photos/seed/ecommerce/800/600',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Redis'],
      languages: ['JavaScript', 'TypeScript', 'SQL'],
      featured: true,
      github: 'https://github.com/dagimabyot/ecommerce-platform',
      link: 'https://ecommerce-platform-demo.vercel.app',
      moreDetails: 'Full-stack e-commerce platform with integrated Stripe payments, real-time inventory tracking, and a comprehensive admin dashboard. Features multi-currency support and advanced search capabilities.',
      status: 'Completed',
      startDate: '2023-08-10',
      endDate: '2024-02-15',
      role: 'Lead Full-Stack Developer',
      keyFeatures: [
        'Stripe payment integration with multiple payment methods',
        'Real-time inventory management across warehouses',
        'Advanced product search with AI recommendations',
        'Multi-currency and multi-language support',
        'Comprehensive admin dashboard with analytics',
        'Order tracking and automated notifications'
      ],
      challenges: 'Handling high traffic during peak shopping seasons while maintaining sub-second response times. Managing complex inventory logic across multiple locations.',
      solutions: 'Implemented Redis caching layer, database query optimization, and load balancing. Created efficient inventory synchronization with transaction locks.',
      results: 'Processed $2.5M in transactions in first quarter. Achieved 99.9% uptime, reduced checkout abandonment by 35%, and increased conversion rate by 28%.'
    },
    {
      id: '3',
      title: 'AI-Powered Content Engine',
      description: 'An intelligent platform that leverages LLMs to generate, optimize, and schedule social media content.',
      detailedDescription: 'This cutting-edge AI platform integrates Google Gemini API with a custom backend to deliver brand-aware content generation. The system learns from user preferences and engagement metrics to continuously improve content quality and relevance.',
      category: ProjectCategory.AI,
      imageUrl: 'https://picsum.photos/seed/ai-content/800/600',
      skills: ['Python', 'Gemini API', 'FastAPI', 'Next.js', 'Redis', 'PostgreSQL'],
      languages: ['Python', 'JavaScript', 'TypeScript'],
      featured: true,
      link: 'https://ai-content-demo.example.com',
      github: 'https://github.com/dagimabyot/ai-content-engine',
      moreDetails: 'Leverages Google Gemini API to intelligently generate and optimize social media content. Features content scheduling, analytics integration, and brand-aware content generation with Redis caching.',
      status: 'In Progress',
      startDate: '2024-01-01',
      role: 'AI/ML Engineer & Backend Developer',
      keyFeatures: [
        'AI-powered content generation using Gemini API',
        'Brand voice training and personalization',
        'Multi-platform content optimization',
        'Intelligent content scheduling based on audience insights',
        'Performance analytics and engagement tracking',
        'Content approval workflow with team collaboration'
      ],
      challenges: 'Ensuring AI-generated content maintains brand consistency while being unique. Fine-tuning the model to understand nuanced brand voices and cultural context.',
      solutions: 'Developed custom fine-tuning pipeline with brand guidelines enforcement. Implemented human-in-the-loop review system for content quality assurance.',
      results: 'Users report 40% reduction in content creation time. Average engagement rate increased by 52%. Successfully trained on 100+ unique brand voices with 95% brand consistency score.'
    },
    {
      id: '4',
      title: 'Real-time Collaboration Tool',
      description: 'A workspace for teams to collaborate with live cursors, document sync, and instant notifications.',
      detailedDescription: 'A production-grade collaboration platform built with WebSocket technology. Teams can work simultaneously on documents with real-time synchronization, seeing exactly where colleagues are typing. The system ensures data consistency even under poor network conditions.',
      category: ProjectCategory.WEB,
      imageUrl: 'https://picsum.photos/seed/collab/800/600',
      skills: ['TypeScript', 'Socket.io', 'Express', 'React', 'MongoDB', 'WebRTC'],
      languages: ['TypeScript', 'JavaScript'],
      featured: true,
      github: 'https://github.com/dagimabyot/collab-tool',
      link: 'https://collab-tool-demo.vercel.app',
      moreDetails: 'Real-time collaboration platform powered by Socket.io with live cursor tracking, document synchronization, and instant notifications. Supports team workspaces and permission-based access control.',
      status: 'Completed',
      startDate: '2023-11-01',
      endDate: '2024-01-30',
      role: 'Full-Stack Engineer',
      keyFeatures: [
        'Live cursor tracking for all users',
        'Real-time document synchronization with conflict resolution',
        'Instant notifications and activity feeds',
        'Team workspaces with granular permissions',
        'Version history and document recovery',
        'Integrated video/audio chat using WebRTC'
      ],
      challenges: 'Achieving low-latency synchronization with conflict-free collaborative editing. Handling network disconnections gracefully without data loss.',
      solutions: 'Implemented Operational Transformation (OT) algorithm for conflict resolution. Built intelligent queue system for offline changes sync.',
      results: 'Supports 100+ concurrent users per document. Average latency of 150ms. 99.99% data consistency. Used by 500+ teams managing 50,000+ documents.'
    },
    {
      id: '5',
      title: 'Fitness Tracking Mobile App',
      description: 'A comprehensive mobile app for tracking workouts, nutrition, and health metrics with personalized insights.',
      detailedDescription: 'This cross-platform fitness application leverages device sensors to accurately track workouts and integrate health data. The intelligent algorithm provides personalized recommendations based on fitness goals and historical performance data.',
      category: ProjectCategory.MOBILE,
      imageUrl: 'https://picsum.photos/seed/fitness/800/600',
      skills: ['React Native', 'Firebase', 'Redux', 'Expo', 'TypeScript'],
      languages: ['JavaScript', 'TypeScript'],
      featured: false,
      link: 'https://fitness-app.example.com',
      github: 'https://github.com/dagimabyot/fitness-app',
      moreDetails: 'Cross-platform mobile app built with React Native and Expo. Features real-time workout tracking, personalized nutrition plans, health metrics analysis, and social sharing capabilities with Firebase backend.',
      status: 'Completed',
      startDate: '2023-07-15',
      endDate: '2023-12-20',
      role: 'Mobile Lead Developer',
      keyFeatures: [
        'Real-time workout tracking using device sensors',
        'Personalized fitness plans and goal setting',
        'Nutrition tracking with food database integration',
        'Progress visualization with detailed analytics',
        'Social features with friend challenges',
        'Integration with popular health apps (Apple Health, Google Fit)',
        'Offline workout tracking with sync'
      ],
      challenges: 'Accurate motion detection and sensor data interpretation. Balancing feature richness with app performance on lower-end devices.',
      solutions: 'Implemented native sensor APIs with fallback mechanisms. Optimized state management and lazy loading strategies for better performance.',
      results: '50,000+ downloads with 4.8 star rating. 70% weekly active users. Users average 5.2 workouts per week. 90% user retention after 30 days.'
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
      twitter: 'https://twitter.com/dagim_dev',
      telegram: 'https://t.me/dagiabyot'
    }
  }
};
