# Backend Setup Instructions - Supabase Integration

This document provides step-by-step instructions to set up the Supabase backend for your portfolio.

## 🎯 Overview

Your portfolio now has a fully functional Supabase backend with:
- ✅ Password-protected admin console
- ✅ Real project data (CineVerse, Electronics Store)
- ✅ Secure database with Row Level Security (RLS)
- ✅ Lead management system
- ✅ Testimonial management
- ✅ Full CRUD operations

## 🔐 Admin Credentials

**Console Password:** `Dagimabyot123$`

> ⚠️ **Important**: Change this password after first login for security!

## 📋 Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Fill in the form:
   - Project Name: `portfolio-backend` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose closest to your location
4. Click **"Create new project"**
5. Wait for project to initialize (3-5 minutes)

## 🔑 Step 2: Get Your API Keys

1. In Supabase, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (under `Project URL`)
   - **Anon Public** key (under `API KEYS` section)

## 📝 Step 3: Configure Environment Variables

### Option A: Local Development (`.env.local`)

Create a `.env.local` file in your project root:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace with your actual values from Step 2.

### Option B: Vercel Deployment

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add:
   - Name: `REACT_APP_SUPABASE_URL`
   - Value: Your Supabase Project URL
   - Environments: Production, Preview, Development

4. Add another variable:
   - Name: `REACT_APP_SUPABASE_ANON_KEY`
   - Value: Your Supabase Anon Key
   - Environments: Production, Preview, Development

## 🗄️ Step 4: Initialize Database Tables

### Option A: Using Supabase SQL Editor (Recommended)

1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy the SQL from `/scripts/init-database.sql`
4. Paste into the query editor
5. Click **RUN**

The database tables will be created with:
- ✅ Projects table (with real CineVerse & Electronics Store data)
- ✅ Testimonials table
- ✅ Leads table
- ✅ Admin Settings table
- ✅ Row Level Security (RLS) policies

### Option B: Using Node Script

```bash
npm run setup:db
# or
pnpm setup:db
```

## ✅ Step 5: Verify Setup

1. Open your portfolio in browser
2. Click **Console** button in header
3. You should see the login page
4. Enter password: `Dagimabyot123$`
5. Click **Login**

You should see:
- **Projects Tab**: CineVerse Movie Website & Electronics Store
- **Leads Tab**: Empty (waiting for contact form submissions)
- **Testimonials Tab**: Empty (ready to add)

## 🚀 Step 6: Test the Dashboard

### Add a New Project:
1. Go to **Projects** tab
2. Click **+ Add Project**
3. Fill in details:
   - Title: Test Project
   - Description: Test Description
   - URL: https://example.com
   - Image URL: https://via.placeholder.com/500
   - Technologies: React, TypeScript
   - Category: Web Application
4. Click **Add Project**

### Add a Testimonial:
1. Go to **Testimonials** tab
2. Click **+ Add Testimonial**
3. Fill in details and submit

## 📊 File Structure

```
project-root/
├── lib/
│   ├── supabase.ts           # Supabase client & types
│   └── database.ts           # Database query functions
├── contexts/
│   └── AdminAuthContext.tsx  # Authentication context
├── pages/
│   ├── Login.tsx             # Login page component
│   ├── Console.tsx           # Original console (deprecated)
│   └── ConsoleSupabase.tsx   # New Supabase-integrated console
├── styles/
│   └── Login.css             # Login page styles
├── scripts/
│   ├── init-database.sql     # SQL table creation
│   └── setup-supabase.js     # Node setup script
├── .env.example              # Environment variables template
└── SUPABASE_SETUP.md        # This file
```

## 🔒 Security Best Practices

### Current Implementation:
- ✅ Password-protected console
- ✅ 24-hour session expiration
- ✅ Row Level Security (RLS) enabled
- ✅ Secure localStorage (session tokens)

### Recommendations:
1. **Change Console Password**: Update the password after first login
2. **Use HTTPS**: Always use HTTPS in production
3. **Audit Logs**: Enable Supabase audit logs in Settings
4. **API Keys**: Rotate API keys regularly
5. **RLS Policies**: Review RLS policies for sensitive data

## 🐛 Troubleshooting

### Issue: "Missing REACT_APP_SUPABASE_URL"

**Solution:**
1. Create `.env.local` file
2. Add your Supabase credentials
3. Restart dev server

### Issue: "Cannot connect to Supabase"

**Checklist:**
- [ ] Supabase project is active
- [ ] API credentials are correct
- [ ] Internet connection is active
- [ ] Firewall not blocking requests

### Issue: "Login page shows but won't accept password"

**Solution:**
1. Clear browser cache: `Ctrl+Shift+Delete`
2. Try incognito mode
3. Check password is exactly: `Dagimabyot123$` (case-sensitive)

### Issue: "Tables not found"

**Solution:**
1. Run SQL initialization through Supabase SQL Editor
2. Verify tables exist: Go to Supabase → Table Editor
3. Check for error messages in browser console

## 📱 Real Project Data

Two real projects are pre-loaded:

### 1. CineVerse Movie Website
- **Live Site**: https://datacineverse-movie-website.vercel.app/
- **Technologies**: React, TypeScript, JavaScript, HTML, CSS, API Integration
- **Category**: Web Application
- **Description**: Modern movie streaming and browsing web application

### 2. Electronics Store Web App
- **Live Site**: https://electronics-store-two.vercel.app/
- **Technologies**: React, TypeScript, JavaScript, HTML, CSS, E-commerce
- **Category**: E-Commerce
- **Description**: E-commerce electronics store with shopping experience

## 🔄 Database Operations

### Available Functions

All functions are in `/lib/database.ts`:

```typescript
// Projects
fetchProjects()              // Get all projects
fetchFeaturedProjects()      // Get featured projects only
addProject(project)          // Add new project
updateProject(id, updates)   // Update project
deleteProject(id)            // Delete project

// Testimonials
fetchTestimonials()          // Get all testimonials
addTestimonial(testimonial)  // Add testimonial
deleteTestimonial(id)        // Delete testimonial

// Leads
fetchLeads()                 // Get all leads
addLead(lead)               // Add lead from contact form
updateLeadStatus(id, status) // Update lead status
deleteLead(id)              // Delete lead
```

## 📞 Support

### Common Questions

**Q: Can I change the admin password?**
A: Yes, edit `contexts/AdminAuthContext.tsx` line 42:
```typescript
const correctPassword = 'Dagimabyot123$' // Change this
```
Then redeploy.

**Q: How do I backup my data?**
A: In Supabase, go to Settings → Backups and enable daily backups.

**Q: Can I use this with a custom domain?**
A: Yes, Supabase works with any domain. Just ensure HTTPS is enabled.

**Q: What's the storage limit?**
A: Free tier: 500MB. Check [Supabase pricing](https://supabase.com/pricing) for details.

## 🎓 Next Steps

1. ✅ Set up Supabase project
2. ✅ Configure environment variables
3. ✅ Initialize database tables
4. ✅ Test the admin console
5. 📝 Add your testimonials
6. 📝 Add more projects
7. 🚀 Deploy to production

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Deployment](https://vercel.com/docs)
- [Portfolio GitHub](https://github.com/dagimabyot/Portifolio-new)

---

**Created**: 2024
**Version**: 1.0
**Admin Password**: Dagimabyot123$
