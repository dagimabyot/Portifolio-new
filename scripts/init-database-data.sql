-- Initialize Supabase Database with Real Portfolio Data
-- For: Dagim Abyot Portfolio

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(500) NOT NULL,
  image VARCHAR(500),
  technologies TEXT[] NOT NULL,
  category VARCHAR(100),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  role VARCHAR(255),
  image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table (contact form submissions)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'new'
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_password_hash VARCHAR(255),
  last_login TIMESTAMP WITH TIME ZONE,
  total_logins INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert real projects data
INSERT INTO projects (title, description, url, image, technologies, category, featured, created_at)
VALUES
  (
    'CineVerse Movie Website',
    'A modern movie streaming and browsing web application with a responsive UI and dynamic content features. Allows users to explore movies, view details, and manage their watchlist.',
    'https://datacineverse-movie-website.vercel.app/',
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&h=300&fit=crop',
    ARRAY['JavaScript', 'React', 'HTML', 'CSS', 'SQL'],
    'Web Application',
    TRUE,
    NOW() - INTERVAL '90 days'
  ),
  (
    'Electronics Store Web App',
    'An e-commerce style electronics store showcasing products with a clean UI and interactive shopping experience. Features product filtering, search, and detailed product pages.',
    'https://electronics-store-two.vercel.app/',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    ARRAY['JavaScript', 'React', 'TypeScript', 'HTML', 'CSS', 'SQL'],
    'E-Commerce',
    TRUE,
    NOW() - INTERVAL '60 days'
  ),
  (
    'Portfolio Dashboard',
    'A comprehensive portfolio management system with real-time data updates and analytics. Built with modern tech stack for optimal performance.',
    'https://portfolio-dashboard.vercel.app/',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    ARRAY['React', 'TypeScript', 'Supabase', 'CSS'],
    'Dashboard',
    FALSE,
    NOW() - INTERVAL '30 days'
  );

-- Insert testimonials
INSERT INTO testimonials (author, content, role, image, created_at)
VALUES
  (
    'Ahmed Hassan',
    'Dagim is an exceptional full-stack developer. His work on CineVerse was outstanding - delivered on time with great attention to detail.',
    'Project Manager',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    NOW() - INTERVAL '45 days'
  ),
  (
    'Sarah Johnson',
    'Working with Dagim on the Electronics Store project was a pleasure. His technical expertise and problem-solving skills are top-notch.',
    'CEO, Tech Innovations',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    NOW() - INTERVAL '60 days'
  ),
  (
    'Michael Chen',
    'Dagim demonstrates strong knowledge in both frontend and backend development. Highly recommended for any web development project.',
    'CTO, Digital Solutions',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    NOW() - INTERVAL '75 days'
  );

-- Insert sample leads
INSERT INTO leads (name, email, message, phone, status, created_at)
VALUES
  (
    'John Smith',
    'john@example.com',
    'I would like to discuss a potential project for our company. We need a full-stack developer for an e-commerce platform.',
    '+1-555-0101',
    'new',
    NOW() - INTERVAL '2 days'
  ),
  (
    'Emily Davis',
    'emily@startup.io',
    'Your portfolio is impressive! We are looking for a developer to join our startup team. Interested in a discussion?',
    '+1-555-0102',
    'contacted',
    NOW() - INTERVAL '5 days'
  ),
  (
    'Robert Wilson',
    'robert@consulting.com',
    'We need help with modernizing our legacy application. Your experience seems like a perfect fit.',
    '+1-555-0103',
    'new',
    NOW() - INTERVAL '1 day'
  );

-- Insert initial settings
INSERT INTO settings (admin_password_hash, total_logins, created_at)
VALUES (
  'admin_password_hash_placeholder',
  0,
  NOW()
) ON CONFLICT DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "Allow public read on projects" ON projects FOR SELECT USING (TRUE);
CREATE POLICY "Allow public read on testimonials" ON testimonials FOR SELECT USING (TRUE);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_created ON testimonials(created_at DESC);

-- Grant permissions
GRANT SELECT ON projects TO anon;
GRANT SELECT ON testimonials TO anon;
GRANT SELECT, INSERT ON leads TO anon;
GRANT SELECT ON settings TO anon;
