import { getSupabaseServiceClient } from '../lib/supabase.js';

const supabase = getSupabaseServiceClient();

const projectsData = [
  {
    title: 'Hageregna Shoes E-commerce',
    slug: 'hageregna-shoes',
    description: 'A full-featured e-commerce platform for Ethiopian shoe brand',
    technologies: ['Next.js', 'React', 'PostgreSQL', 'Stripe', 'TailwindCSS'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    ],
    github_url: 'https://github.com/dagimabyot/hageregna-shoes',
    live_url: 'https://hageregna-shoes.vercel.app',
    category: 'Web Development',
    featured: true,
    completed_date: '2024-01-15',
    status: 'Completed',
    role: 'Full Stack Developer',
    key_features: [
      'Product catalog with filtering',
      'Shopping cart and checkout',
      'Stripe payment integration',
      'User accounts and order history',
      'Admin dashboard',
      'Responsive design',
    ],
  },
  {
    title: 'CBE Subscription Management System',
    slug: 'cbe-subscription',
    description: 'Enterprise subscription and billing management system for CBE',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'React Query', 'Recharts'],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    ],
    github_url: 'https://github.com/dagimabyot/cbe-subscription',
    live_url: null,
    category: 'Web Development',
    featured: true,
    completed_date: '2023-11-20',
    status: 'Completed',
    role: 'Senior Developer',
    key_features: [
      'Multi-tier subscription plans',
      'Automated billing',
      'Real-time analytics dashboard',
      'User management',
      'Payment reconciliation',
    ],
  },
  {
    title: 'CineVerse Movie Website',
    slug: 'cineverse-movie',
    description: 'Interactive movie discovery and rating platform',
    technologies: ['React', 'TMDB API', 'Firebase', 'TailwindCSS'],
    images: [
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop',
    ],
    github_url: 'https://github.com/dagimabyot/cineverse',
    live_url: 'https://cineverse-movie.vercel.app',
    category: 'Web Development',
    featured: true,
    completed_date: '2023-09-10',
    status: 'Completed',
    role: 'Developer',
    key_features: [
      'Movie search and filtering',
      'User ratings and reviews',
      'Watchlist functionality',
      'Responsive UI',
      'Real-time data from TMDB API',
    ],
  },
  {
    title: 'Konjo Kitchen Restaurant Website',
    slug: 'konjo-kitchen',
    description: 'Modern restaurant website with online ordering system',
    technologies: ['Next.js', 'React', 'Supabase', 'Stripe', 'Tailwind CSS'],
    images: [
      'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop',
    ],
    github_url: 'https://github.com/dagimabyot/konjo-kitchen',
    live_url: 'https://konjo-kitchen.vercel.app',
    category: 'Web Development',
    featured: true,
    completed_date: '2023-08-05',
    status: 'Completed',
    role: 'Full Stack Developer',
    key_features: [
      'Online menu with categories',
      'Order management system',
      'Real-time order tracking',
      'Payment integration',
      'Admin dashboard',
    ],
  },
  {
    title: 'Travel Booking App',
    slug: 'travel-booking-app',
    description: 'Comprehensive travel booking platform with flights and hotels',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe'],
    images: [
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
    ],
    github_url: 'https://github.com/dagimabyot/travel-app',
    live_url: null,
    category: 'Mobile App',
    featured: true,
    completed_date: '2023-07-20',
    status: 'Completed',
    role: 'Lead Developer',
    key_features: [
      'Flight and hotel search',
      'Booking system',
      'Payment processing',
      'Trip itinerary management',
      'Push notifications',
    ],
  },
  {
    title: 'Electronics Store',
    slug: 'electronics-store',
    description: 'E-commerce platform for electronics with inventory management',
    technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'TailwindCSS'],
    images: [
      'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=600&h=400&fit=crop',
    ],
    github_url: 'https://github.com/dagimabyot/electronics-store',
    live_url: 'https://electronics-store.vercel.app',
    category: 'Web Development',
    featured: false,
    completed_date: '2023-06-15',
    status: 'Completed',
    role: 'Full Stack Developer',
    key_features: [
      'Product catalog with search',
      'Advanced filtering',
      'Shopping cart',
      'Order management',
      'Inventory tracking',
    ],
  },
];

const skillsData = [
  // Frontend
  { skill_name: 'React', category: 'Frontend', percentage: 95 },
  { skill_name: 'Next.js', category: 'Frontend', percentage: 95 },
  { skill_name: 'TypeScript', category: 'Frontend', percentage: 90 },
  { skill_name: 'TailwindCSS', category: 'Frontend', percentage: 95 },
  { skill_name: 'Framer Motion', category: 'Frontend', percentage: 85 },
  { skill_name: 'React Query', category: 'Frontend', percentage: 85 },
  
  // Backend
  { skill_name: 'Node.js', category: 'Backend', percentage: 90 },
  { skill_name: 'Express.js', category: 'Backend', percentage: 85 },
  { skill_name: 'PostgreSQL', category: 'Backend', percentage: 90 },
  { skill_name: 'MongoDB', category: 'Backend', percentage: 80 },
  { skill_name: 'Supabase', category: 'Backend', percentage: 90 },
  
  // Tools & Others
  { skill_name: 'Git', category: 'Tools', percentage: 95 },
  { skill_name: 'Docker', category: 'Tools', percentage: 80 },
  { skill_name: 'AWS', category: 'Tools', percentage: 75 },
  { skill_name: 'REST APIs', category: 'Tools', percentage: 95 },
  { skill_name: 'GraphQL', category: 'Tools', percentage: 80 },
];

const experienceData = [
  {
    company: 'Tech Solutions Inc',
    role: 'Senior Full Stack Developer',
    description: 'Led development of multiple web applications, mentored junior developers, and architected scalable solutions.',
    start_date: '2023-06-01',
    end_date: null,
  },
  {
    company: 'Digital Innovations Ltd',
    role: 'Full Stack Developer',
    description: 'Developed and maintained web applications, implemented new features, and improved application performance.',
    start_date: '2022-03-01',
    end_date: '2023-05-31',
  },
  {
    company: 'StartUp Hub',
    role: 'Junior Developer',
    description: 'Contributed to frontend and backend development, learned best practices, and built foundational skills.',
    start_date: '2021-01-01',
    end_date: '2022-02-28',
  },
];

const educationData = [
  {
    institution: 'Addis Ababa University',
    degree: 'B.S. Computer Science',
    year: 2020,
  },
  {
    institution: 'Online Learning Platform',
    degree: 'Full Stack Web Development Bootcamp',
    year: 2021,
  },
];

const certificatesData = [
  {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023-06-15',
  },
  {
    title: 'Google Cloud Professional Data Engineer',
    issuer: 'Google Cloud',
    date: '2023-03-20',
  },
  {
    title: 'Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation',
    date: '2022-12-10',
  },
];

async function seedDatabase() {
  try {
    console.log('Starting database seed...');
    
    // Seed Projects
    console.log('Seeding projects...');
    const { error: projectError } = await supabase
      .from('projects')
      .insert(projectsData);
    
    if (projectError && projectError.code !== '23505') { // Ignore unique constraint errors
      console.error('Project error:', projectError);
    } else {
      console.log('✓ Projects seeded');
    }
    
    // Seed Skills
    console.log('Seeding skills...');
    const { error: skillError } = await supabase
      .from('skills')
      .insert(skillsData);
    
    if (skillError && skillError.code !== '23505') {
      console.error('Skill error:', skillError);
    } else {
      console.log('✓ Skills seeded');
    }
    
    // Seed Experience
    console.log('Seeding experience...');
    const { error: expError } = await supabase
      .from('experience')
      .insert(experienceData);
    
    if (expError && expError.code !== '23505') {
      console.error('Experience error:', expError);
    } else {
      console.log('✓ Experience seeded');
    }
    
    // Seed Education
    console.log('Seeding education...');
    const { error: eduError } = await supabase
      .from('education')
      .insert(educationData);
    
    if (eduError && eduError.code !== '23505') {
      console.error('Education error:', eduError);
    } else {
      console.log('✓ Education seeded');
    }
    
    // Seed Certificates
    console.log('Seeding certificates...');
    const { error: certError } = await supabase
      .from('certificates')
      .insert(certificatesData);
    
    if (certError && certError.code !== '23505') {
      console.error('Certificate error:', certError);
    } else {
      console.log('✓ Certificates seeded');
    }
    
    console.log('✓ Database seeding completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
}

seedDatabase();
