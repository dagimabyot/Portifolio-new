-- Create Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  image TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Admin Settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_password_hash TEXT NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE,
  total_logins INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert real project data
INSERT INTO projects (title, description, url, image, technologies, category, featured) VALUES
(
  'CineVerse Movie Website',
  'A modern movie streaming and browsing web application with a responsive UI and dynamic content features. Features include movie discovery, watchlist management, and detailed movie information.',
  'https://datacineverse-movie-website.vercel.app/',
  'https://images.unsplash.com/photo-1533613220915-121e63e19b7f?w=500&h=300&fit=crop',
  ARRAY['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'API Integration'],
  'Web Application',
  true
),
(
  'Electronics Store Web App',
  'An e-commerce style electronics store showcasing products with a clean UI and interactive shopping experience. Features include product filtering, cart management, and checkout functionality.',
  'https://electronics-store-two.vercel.app/',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop',
  ARRAY['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'E-commerce'],
  'E-Commerce',
  true
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read on projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on testimonials" ON testimonials
  FOR SELECT USING (true);

-- Create policies for authenticated inserts (leads)
CREATE POLICY "Allow public insert on leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read own leads" ON leads
  FOR SELECT USING (true);
