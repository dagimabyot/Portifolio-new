# Dagim Abyot's Professional Portfolio

A modern, fully-functional portfolio website built with Next.js 16, React, TypeScript, Tailwind CSS, and Supabase.

## Features

✨ **Modern UI/UX**
- Responsive design for all screen sizes
- Smooth animations with Framer Motion
- Dark mode with glassmorphism effects
- Professional typography and color scheme

🎯 **Core Pages**
- **Home**: Hero section with featured projects
- **About**: Bio, skills, experience, and education
- **Portfolio**: Filterable projects with detailed pages
- **Contact**: Contact form with database integration

🔐 **Admin Console**
- Secure authentication system
- Admin dashboard for content management
- CRUD operations for all content types
- Message management system

💾 **Database Integration**
- Supabase PostgreSQL database
- Real-time data synchronization
- Tables for: projects, skills, experience, education, certificates, messages
- Scalable and production-ready

🚀 **Performance**
- Server-side rendering (SSR) with Next.js
- Image optimization
- Code splitting
- Fast page load times

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Forms**: React Hook Form + Zod validation
- **Hosting**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- npm, pnpm, or yarn
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
Create a `.env.development.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
POSTGRES_URL=your_postgres_url
```

4. **Create database schema**
```bash
node scripts/migrate.js
```

5. **Seed sample data** (optional)
```bash
node scripts/seed-data.js
```

6. **Start development server**
```bash
pnpm dev
```

Visit `http://localhost:3001` in your browser.

## Usage

### Portfolio Navigation
- Home: `/`
- About: `/about`
- Portfolio: `/portfolio`
- Project Details: `/portfolio/[slug]`
- Contact: `/contact`

### Admin Console
- Access: `/console`
- Username: `dagidev`
- Password: `Dagim123$`
- Dashboard: `/admin` (after login)

## Database Schema

### Projects
- id, title, slug, description, technologies, images, github_url, live_url, category, featured, completed_date, role, key_features, challenges, solutions, results

### Skills
- id, skill_name, category, percentage

### Experience
- id, company, role, description, start_date, end_date

### Education
- id, institution, degree, year

### Certificates
- id, title, issuer, image, date

### Contact Messages
- id, fullname, email, subject, message, read, created_at

## Deployment

Deploy to Vercel:
1. Push to GitHub
2. Import repository in Vercel
3. Set environment variables
4. Deploy

## License

MIT License - Feel free to use this as a template for your portfolio.

---

Built with Next.js and deployed on Vercel.
