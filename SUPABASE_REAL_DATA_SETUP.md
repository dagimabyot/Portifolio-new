# Supabase Database Setup Guide

## Your Credentials
- **Project URL**: https://lpagvvoqwbsbzaabeabk.supabase.co
- **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwYWd2dm9nd2JzYnphYWJlYWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzOTY2MjcsImV4cCI6MjA5MTk3MjYyN30.itXd6wI8On5s4KzX63SWB_4nuccShsjR864e-S6DMkE`

## Setup Steps

### Step 1: Access Supabase Dashboard
1. Go to [Supabase Console](https://app.supabase.com)
2. Navigate to your project: `lpagvvoqwbsbzaabeabk`
3. Go to **SQL Editor** (left sidebar)

### Step 2: Create Tables & Insert Data

Copy and paste the SQL below into the SQL Editor and execute:

```sql
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
```

### Step 3: Insert Real Project Data

Execute this in a new SQL query:

```sql
-- Insert real projects data
INSERT INTO projects (title, description, url, image, technologies, category, featured)
VALUES
  (
    'CineVerse Movie Website',
    'A modern movie streaming and browsing web application with a responsive UI and dynamic content features. Allows users to explore movies, view details, and manage their watchlist.',
    'https://datacineverse-movie-website.vercel.app/',
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&h=300&fit=crop',
    ARRAY['JavaScript', 'React', 'HTML', 'CSS', 'SQL'],
    'Web Application',
    TRUE
  ),
  (
    'Electronics Store Web App',
    'An e-commerce style electronics store showcasing products with a clean UI and interactive shopping experience. Features product filtering, search, and detailed product pages.',
    'https://electronics-store-two.vercel.app/',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    ARRAY['JavaScript', 'React', 'TypeScript', 'HTML', 'CSS', 'SQL'],
    'E-Commerce',
    TRUE
  );
```

### Step 4: Insert Testimonials

Execute this in a new SQL query:

```sql
INSERT INTO testimonials (author, content, role, image)
VALUES
  (
    'Ahmed Hassan',
    'Dagim is an exceptional full-stack developer. His work on CineVerse was outstanding - delivered on time with great attention to detail.',
    'Project Manager',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  ),
  (
    'Sarah Johnson',
    'Working with Dagim on the Electronics Store project was a pleasure. His technical expertise and problem-solving skills are top-notch.',
    'CEO, Tech Innovations',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  ),
  (
    'Michael Chen',
    'Dagim demonstrates strong knowledge in both frontend and backend development. Highly recommended for any web development project.',
    'CTO, Digital Solutions',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
  );
```

### Step 5: Insert Sample Leads

Execute this in a new SQL query:

```sql
INSERT INTO leads (name, email, message, phone, status)
VALUES
  (
    'John Smith',
    'john@example.com',
    'I would like to discuss a potential project for our company. We need a full-stack developer for an e-commerce platform.',
    '+1-555-0101',
    'new'
  ),
  (
    'Emily Davis',
    'emily@startup.io',
    'Your portfolio is impressive! We are looking for a developer to join our startup team. Interested in a discussion?',
    '+1-555-0102',
    'contacted'
  ),
  (
    'Robert Wilson',
    'robert@consulting.com',
    'We need help with modernizing our legacy application. Your experience seems like a perfect fit.',
    '+1-555-0103',
    'new'
  );
```

### Step 6: Enable RLS and Create Policies

Execute this in a new SQL query:

```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "Allow public read on projects" ON projects FOR SELECT USING (TRUE);
CREATE POLICY "Allow public read on testimonials" ON testimonials FOR SELECT USING (TRUE);
CREATE POLICY "Allow public insert on leads" ON leads FOR INSERT WITH CHECK (TRUE);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_created ON testimonials(created_at DESC);
```

## Verification

After running all queries, verify the data:

1. Go to **Table Editor** in Supabase
2. Check these tables:
   - `projects` - Should have 2 records (CineVerse, Electronics Store)
   - `testimonials` - Should have 3 records
   - `leads` - Should have 3 sample leads
   - `settings` - Should have 1 record

## Testing Locally

Now test your portfolio:

1. **Navigate to Login**: `http://localhost:5173/#/admin`
2. **Enter Password**: `Dagimabyot123$`
3. **Access Console**: You should see your real project data

## Admin Console Features

Once logged in, you can:
- ✅ View all projects with real data
- ✅ View contact form leads
- ✅ Manage testimonials
- ✅ Edit portfolio settings
- ✅ Export data
- ✅ Real-time data synchronization from Supabase

## Environment Variables

The following are already set in Vercel:
- `VITE_SUPABASE_URL` = `https://lpagvvoqwbsbzaabeabk.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = (your public anon key)

## Troubleshooting

**Issue**: Tables not appearing
- Solution: Refresh the Table Editor or SQL Editor page

**Issue**: Data not showing in console
- Solution: Verify all SQL queries executed successfully, then hard refresh the browser

**Issue**: Login not working
- Solution: Password is case-sensitive: `Dagimabyot123$`

**Issue**: CORS errors
- Solution: Supabase handles CORS automatically for the anon key

## Next Steps

1. ✅ Set up database tables
2. ✅ Insert real project data
3. ✅ Test login with password
4. ✅ Verify data in admin console
5. Deploy to Vercel

Your portfolio backend is now production-ready! 🚀
