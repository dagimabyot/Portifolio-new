# 🚀 Quick Start Guide - Supabase Backend

## Get Started in 5 Minutes

### 1️⃣ Create Supabase Project (2 min)
- Go to [supabase.com](https://supabase.com)
- Create new project
- Copy **Project URL** and **Anon Key**

### 2️⃣ Add Environment Variables (1 min)
Create `.env.local` in project root:
```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3️⃣ Initialize Database (1 min)
1. In Supabase → SQL Editor
2. Copy code from `scripts/init-database.sql`
3. Paste and RUN

### 4️⃣ Test Console (1 min)
1. Run: `npm run dev` or `pnpm dev`
2. Click **Console** button
3. Password: `Dagimabyot123$`
4. You're in! 🎉

## 📊 What You Get

| Feature | Status |
|---------|--------|
| Admin Console | ✅ Ready |
| Password Protection | ✅ Dagimabyot123$ |
| Project Management | ✅ Ready |
| Lead Management | ✅ Ready |
| Testimonial Manager | ✅ Ready |
| Real Project Data | ✅ 2 projects loaded |

## 🔗 Real Projects Included

1. **CineVerse Movie Website**
   - https://datacineverse-movie-website.vercel.app/

2. **Electronics Store Web App**
   - https://electronics-store-two.vercel.app/

## 📱 Admin Dashboard Tabs

### Projects
- View all projects
- Add new projects
- Delete projects
- Mark as featured

### Leads
- View contact form submissions
- Update lead status (new/contacted/closed)
- Delete leads

### Testimonials
- View all testimonials
- Add new testimonials
- View with author info

## 🔑 Admin Password
```
Dagimabyot123$
```

## 📝 Environment Variables

| Variable | Value |
|----------|-------|
| REACT_APP_SUPABASE_URL | Your Supabase Project URL |
| REACT_APP_SUPABASE_ANON_KEY | Your Anon Key |

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Password wrong | Clear cache, try: `Dagimabyot123$` |
| Can't connect | Check `.env.local` file |
| Tables missing | Run SQL from `scripts/init-database.sql` |
| 404 error | Verify Supabase project is active |

## 📚 Full Docs

- Full setup: `BACKEND_SETUP_INSTRUCTIONS.md`
- Technical docs: `SUPABASE_SETUP.md`
- Code: `/lib/database.ts`

## 🚀 Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Settings
4. Deploy! ✨

---

**Need help?** See full documentation in `BACKEND_SETUP_INSTRUCTIONS.md`
