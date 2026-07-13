# Deployment Guide

## Overview

This guide will walk you through deploying your portfolio website to production using Vercel.

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (free tier available)
- Supabase project set up with database schema
- Environment variables ready

## Step 1: Prepare Environment Variables

Collect these from your Supabase project:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
POSTGRES_URL=postgresql://user:password@host:5432/database
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Run deployment command:
```bash
vercel --prod
```

3. Follow the prompts to:
   - Link to your GitHub project
   - Set up environment variables
   - Configure build settings

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables in project settings
5. Deploy

## Step 3: Configure Environment Variables in Vercel

In Vercel project settings:

1. Go to Settings → Environment Variables
2. Add each environment variable:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `POSTGRES_URL`

3. Ensure variables are available for Production and Preview environments

## Step 4: Database Setup

Run migrations on your Supabase database:

```bash
# Connect to your Supabase database
psql $POSTGRES_URL

# Run the schema creation script
\i scripts/create-schema.sql
```

Or use the Supabase SQL editor to run `scripts/create-schema.sql`

## Step 5: Configure Custom Domain (Optional)

1. Go to Vercel project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (can take up to 48 hours)

## Step 6: Verify Deployment

1. Visit your Vercel deployment URL
2. Test all pages:
   - Homepage
   - About page
   - Portfolio page
   - Contact form
   - Admin console

3. Check browser console for errors
4. Test responsive design on mobile

## Admin Console Access

After deployment, access admin console at:
- `/console` - Login page
- `/admin` - Dashboard (after login)

Default credentials (change these):
- Username: `dagidev`
- Password: `Dagim123$`

## Monitoring and Maintenance

### View Logs

In Vercel Dashboard:
1. Go to Deployments
2. Click on a deployment
3. View function logs and edge logs

### Monitor Performance

1. Check Web Vitals in Vercel Analytics
2. Use Lighthouse in Chrome DevTools
3. Monitor API response times

### Update Content

1. Log into admin console
2. Use dashboard to manage:
   - Projects
   - Messages
   - Skills
   - Experience
   - Education
   - Certificates

## Troubleshooting

### Build Errors

If you see build errors:
1. Check environment variables are set correctly
2. Verify database is accessible
3. Check Node.js version compatibility
4. Review build logs in Vercel

### Database Connection Issues

If database errors occur:
1. Verify `POSTGRES_URL` is correct
2. Check Supabase project is running
3. Ensure firewall allows Vercel IPs
4. Test connection locally first

### Site Not Loading

If the site doesn't load:
1. Check Vercel deployment status
2. Clear browser cache
3. Check network tab for failed requests
4. Review serverless function logs

## Performance Optimization

### Image Optimization
- Images are automatically optimized by Next.js
- Use Vercel Analytics to monitor image performance

### Database Queries
- Consider adding indexes for frequently queried columns
- Monitor slow queries using Supabase dashboard

### Caching
- Vercel automatically caches static assets
- Use `revalidateTag()` for ISR (Incremental Static Regeneration)

## Security

### Change Admin Credentials
1. Update username and password in environment
2. Redeploy with new credentials
3. Only share securely

### Enable HTTPS
- Automatically enabled on Vercel
- Custom domains require SSL certificate (provided by Vercel)

### Database Security
- Use Row Level Security (RLS) policies in Supabase
- Never commit secrets to repository
- Use environment variables for sensitive data

## Backup and Recovery

### Database Backups
Supabase provides automatic daily backups:
1. Go to Supabase project settings
2. Check backups section
3. Can restore from backups if needed

### Code Recovery
- GitHub repository is your backup
- Can rollback to previous deployments in Vercel
- Maintain commit history

## Support

- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Supabase Documentation: [supabase.com/docs](https://supabase.com/docs)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)

---

Happy deploying! 🚀
