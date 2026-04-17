# 🚀 START HERE - Database Setup Guide

Your Supabase backend is ready! Follow these simple steps to get it running.

## ⏱️ Time Required: 5 Minutes

---

## Step 1: Open Setup Guide (1 min)

Open this file in your project:
```
MANUAL_SQL_SETUP.md
```

This file contains all the SQL queries you need to copy and paste.

---

## Step 2: Go to Supabase (1 min)

Visit: https://app.supabase.com

1. Log in with your account
2. Select project: `lpagvvoqwbsbzaabeabk`
3. Click **SQL Editor** (left sidebar)

---

## Step 3: Create Database Tables (1 min)

In Supabase SQL Editor:

1. Click **New Query**
2. Open `MANUAL_SQL_SETUP.md` → Copy **Query 1: Create Tables**
3. Paste into SQL Editor
4. Click **RUN**
5. Wait for success message ✓

---

## Step 4: Insert Your Projects (1 min)

1. Click **New Query** (top right)
2. Open `MANUAL_SQL_SETUP.md` → Copy **Query 2: Insert Real Projects**
3. Paste into SQL Editor
4. Click **RUN**
5. Wait for success message ✓

---

## Step 5: Insert Testimonials (1 min)

1. Click **New Query**
2. Open `MANUAL_SQL_SETUP.md` → Copy **Query 3: Insert Testimonials**
3. Paste into SQL Editor
4. Click **RUN**
5. Wait for success message ✓

---

## Step 6: Insert Sample Leads (1 min)

1. Click **New Query**
2. Open `MANUAL_SQL_SETUP.md` → Copy **Query 4: Insert Sample Leads**
3. Paste into SQL Editor
4. Click **RUN**
5. Wait for success message ✓

---

## Step 7: Enable Security Policies (1 min)

1. Click **New Query**
2. Open `MANUAL_SQL_SETUP.md` → Copy **Query 5: Enable RLS and Create Policies**
3. Paste into SQL Editor
4. Click **RUN**
5. Wait for success message ✓

---

## Step 8: Verify Data (1 min)

1. In Supabase, click **Table Editor** (left sidebar)
2. You should see 4 tables:
   - `projects` (2 records) ✓
   - `testimonials` (3 records) ✓
   - `leads` (3 records) ✓
   - `settings` (1 record) ✓

---

## Step 9: Test Locally (1 min)

Open terminal in your project:

```bash
pnpm dev
```

Then open your browser to:
```
http://localhost:5173/#/admin
```

Enter password:
```
Dagimabyot123$
```

You should see your real projects!

---

## ✅ Success Checklist

- [ ] All 5 SQL queries executed successfully
- [ ] Data appears in Supabase Table Editor
- [ ] Login page loads at `/#/admin`
- [ ] Password works: `Dagimabyot123$`
- [ ] Admin console shows projects
- [ ] Can see CineVerse and Electronics Store projects
- [ ] Can see 3 testimonials
- [ ] Can see 3 sample leads

---

## 📊 Real Data You'll See

### Projects
1. **CineVerse Movie Website**
   - Live at: https://datacineverse-movie-website.vercel.app/
   
2. **Electronics Store Web App**
   - Live at: https://electronics-store-two.vercel.app/

### Testimonials
- Ahmed Hassan (Project Manager)
- Sarah Johnson (CEO, Tech Innovations)
- Michael Chen (CTO, Digital Solutions)

### Sample Leads
- John Smith - interested in e-commerce work
- Emily Davis - startup job opportunity
- Robert Wilson - legacy app modernization

---

## 🔐 Your Admin Password

```
Dagimabyot123$
```

(Case-sensitive!)

---

## 🎯 Next Steps After Setup

1. ✅ Complete database setup (you're doing this now)
2. Test locally and verify everything works
3. Deploy to Vercel when ready
4. Monitor in Supabase dashboard for new leads

---

## 📁 Files Reference

- **MANUAL_SQL_SETUP.md** - SQL queries to copy/paste
- **SUPABASE_REAL_DATA_SETUP.md** - Detailed explanations
- **SETUP_READY.md** - Complete overview
- **SUPABASE_COMPLETE.txt** - Full documentation
- **scripts/init-database-data.sql** - All SQL in one file

---

## 🆘 Stuck?

**Problem**: SQL query failed
- Check you're copying the entire query
- Make sure there are no typos
- Try running just the CREATE TABLE part first

**Problem**: No data appears
- Make sure all 5 queries executed successfully
- Check Supabase Table Editor for data
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

**Problem**: Login doesn't work
- Password is case-sensitive: `Dagimabyot123$`
- Clear browser cache
- Check browser console (F12) for errors

**Problem**: "Can't connect to Supabase"
- Verify environment variables are set in Vercel
- Check your internet connection
- Verify Supabase project URL is correct

---

## 🚀 You're Ready!

Your portfolio backend is fully configured with real data.

**Start now**: Open `MANUAL_SQL_SETUP.md` and follow the SQL queries!

Questions? Check `SUPABASE_COMPLETE.txt` for full documentation.

Good luck! 🎉
