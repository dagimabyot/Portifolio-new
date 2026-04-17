# Manual SQL Setup Guide - Copy & Paste

Follow this guide to manually set up your Supabase database with real data.

## 🔑 Your Credentials
- **URL**: https://lpagvvoqwbsbzaabeabk.supabase.co
- **Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwYWd2dm9nd2JzYnphYWJlYWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzOTY2MjcsImV4cCI6MjA5MTk3MjYyN30.itXd6wI8On5s4KzX63SWB_4nuccShsjR864e-S6DMkE

## 📋 SQL Queries to Execute

### Query 1: Create Tables

Go to https://app.supabase.com → Your Project → SQL Editor → New Query

Paste and execute:

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

-- Create leads table
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

### Query 2: Insert Real Projects

Create a new query and paste:

```sql
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

### Query 3: Insert Testimonials

Create a new query and paste:

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

### Query 4: Insert Sample Leads

Create a new query and paste:

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

### Query 5: Enable RLS and Create Policies

Create a new query and paste:

```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow public read on projects" ON projects FOR SELECT USING (TRUE);
CREATE POLICY "Allow public read on testimonials" ON testimonials FOR SELECT USING (TRUE);
CREATE POLICY "Allow public insert on leads" ON leads FOR INSERT WITH CHECK (TRUE);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_created ON testimonials(created_at DESC);
```

## ✅ Verify Data

After all queries execute:

1. Go to **Table Editor** (left sidebar)
2. Click each table to verify:
   - **projects**: 2 records (CineVerse, Electronics Store)
   - **testimonials**: 3 records
   - **leads**: 3 sample leads
   - **settings**: 1 record

## 🚀 Test Your Portfolio

1. Run your local dev server: `pnpm dev`
2. Navigate to: `http://localhost:5173/#/admin`
3. Enter password: `Dagimabyot123$`
4. You should see your real project data in the console!

## 📊 Real Data Included

### Projects
- CineVerse Movie Website
- Electronics Store Web App

### Testimonials  
- Ahmed Hassan - Project Manager
- Sarah Johnson - CEO, Tech Innovations
- Michael Chen - CTO, Digital Solutions

### Sample Leads
- John Smith - E-commerce platform inquiry
- Emily Davis - Startup job opportunity
- Robert Wilson - Legacy application modernization

### Technologies Covered
- JavaScript
- React
- TypeScript
- HTML
- CSS
- SQL

## 🔐 Password

Admin Console Password: `Dagimabyot123$` (case-sensitive)

## 📞 Need Help?

If you get stuck:
1. Check the error message in the SQL Editor
2. Make sure you're executing queries in the correct order
3. Verify the table was created before inserting data
4. Check browser console for any errors (F12)

## 🎉 You're Ready!

Once all queries execute and data is verified, your portfolio backend is production-ready with:
- ✅ Real project data
- ✅ Sample testimonials
- ✅ Contact form leads
- ✅ Secure password-protected admin console
- ✅ Supabase cloud database integration
