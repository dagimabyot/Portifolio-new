# Supabase Backend Setup Guide

This portfolio has been integrated with **Supabase** as the backend database for managing projects, testimonials, leads, and admin settings.

## 🔐 Admin Console Access

**Password:** `Dagimabyot123$`

The admin console is password-protected. Once you log in, your session lasts for 24 hours.

## 📋 Environment Variables

You need to add the following environment variables to your `.env.local` file:

```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from:
1. Go to your Supabase project
2. Settings → API
3. Copy the Project URL and anon key

## 🗄️ Database Tables

### 1. Projects Table
Stores portfolio projects with real data:
- **CineVerse Movie Website** - Modern movie streaming application
- **Electronics Store Web App** - E-commerce electronics platform

Fields:
- `id` (UUID) - Primary key
- `title` (TEXT) - Project name
- `description` (TEXT) - Project description
- `url` (TEXT) - Live project URL
- `image` (TEXT) - Project image URL
- `technologies` (ARRAY) - Tech stack used
- `category` (TEXT) - Project category
- `featured` (BOOLEAN) - Featured on homepage
- `created_at` (TIMESTAMP) - Creation date
- `updated_at` (TIMESTAMP) - Last update

### 2. Testimonials Table
Customer testimonials and reviews

Fields:
- `id` (UUID) - Primary key
- `author` (TEXT) - Author name
- `content` (TEXT) - Testimonial text
- `role` (TEXT) - Author's role/title
- `image` (TEXT) - Author image URL
- `created_at` (TIMESTAMP) - Creation date

### 3. Leads Table
Contact form submissions

Fields:
- `id` (UUID) - Primary key
- `name` (TEXT) - Visitor name
- `email` (TEXT) - Visitor email
- `message` (TEXT) - Message content
- `phone` (TEXT) - Visitor phone (optional)
- `status` (TEXT) - Lead status (new/contacted/closed)
- `created_at` (TIMESTAMP) - Submission date

### 4. Admin Settings Table
Admin configuration and login tracking

Fields:
- `id` (UUID) - Primary key
- `admin_password_hash` (TEXT) - Password hash
- `last_login` (TIMESTAMP) - Last login time
- `total_logins` (INTEGER) - Login count
- `created_at` (TIMESTAMP) - Creation date
- `updated_at` (TIMESTAMP) - Last update

## 🛠️ Setup Instructions

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your Project URL and anon key

### Step 2: Set Environment Variables
Create a `.env.local` file in the project root:

```env
REACT_APP_SUPABASE_URL=your_project_url
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
```

### Step 3: Initialize Database
The database tables are automatically created with Row Level Security (RLS) policies configured.

To manually run the SQL initialization script:
```bash
# The script is located at scripts/init-database.sql
# Run it through your Supabase SQL Editor
```

## 🔑 Security Features

- **Password Protection**: Admin console requires password `Dagimabyot123$`
- **Session Management**: Sessions expire after 24 hours
- **Row Level Security**: RLS policies protect data access
- **Public Read Access**: Projects and testimonials are publicly readable
- **Authenticated Inserts**: Leads can be submitted publicly

## 📱 Real Portfolio Data

The database comes pre-loaded with two real projects:

1. **CineVerse Movie Website**
   - URL: https://datacineverse-movie-website.vercel.app/
   - Technologies: React, TypeScript, JavaScript, HTML, CSS, API Integration
   - Category: Web Application

2. **Electronics Store Web App**
   - URL: https://electronics-store-two.vercel.app/
   - Technologies: React, TypeScript, JavaScript, HTML, CSS, E-commerce
   - Category: E-Commerce

## 🚀 Usage in Components

### Fetch All Projects
```typescript
import { fetchProjects } from '../lib/database';

const projects = await fetchProjects();
```

### Fetch Featured Projects
```typescript
import { fetchFeaturedProjects } from '../lib/database';

const featured = await fetchFeaturedProjects();
```

### Add New Project
```typescript
import { addProject } from '../lib/database';

const newProject = await addProject({
  title: "Project Name",
  description: "Description",
  url: "https://...",
  image: "https://...",
  technologies: ["React", "TypeScript"],
  category: "Web Application",
  featured: true
});
```

### Add Lead
```typescript
import { addLead } from '../lib/database';

const lead = await addLead({
  name: "John Doe",
  email: "john@example.com",
  message: "Interested in your services",
  phone: "+1234567890"
});
```

## 🔄 Real-time Subscriptions

To listen for real-time changes:

```typescript
import { supabase } from '../lib/supabase';

supabase
  .from('projects')
  .on('*', payload => {
    console.log('Change received!', payload)
  })
  .subscribe()
```

## 📊 Admin Console Features

Access the admin console at `/#/console` or `/#/admin`

Features:
- ✅ View all projects
- ✅ Add new projects
- ✅ Edit existing projects
- ✅ Delete projects
- ✅ Manage leads/contacts
- ✅ Track lead status
- ✅ View all testimonials
- ✅ Add new testimonials

## 🆘 Troubleshooting

### Missing Environment Variables
If you see errors about `REACT_APP_SUPABASE_URL` or `REACT_APP_SUPABASE_ANON_KEY`:
1. Create/update `.env.local` file
2. Add your Supabase credentials
3. Restart the dev server

### Can't Access Admin Console
1. Clear browser cache: `Ctrl+Shift+Delete`
2. Try incognito/private mode
3. Check password (case-sensitive): `Dagimabyot123$`

### Database Connection Issues
1. Verify Supabase is running
2. Check API keys in environment variables
3. Ensure your Supabase project is active

## 📚 Technologies Used

- **React** - Frontend framework
- **TypeScript** - Type safety
- **Supabase** - Backend database
- **HTML/CSS** - Markup and styling
- **JavaScript** - Core logic
- **SQL** - Database queries
- **Python** - Potential backend automation

## 🔗 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Portfolio GitHub](https://github.com/dagimabyot/Portifolio-new)
