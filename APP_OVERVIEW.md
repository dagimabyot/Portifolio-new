# Portfolio App Overview

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     React Frontend (Vite)                       │
│                  Running on port 3000                           │
├─────────────────────────────────────────────────────────────────┤
│  • Home Page (hero + featured projects)                         │
│  • About Page                                                   │
│  • Portfolio Page (filterable projects)                         │
│  • Contact Page (form → backend leads)                          │
│  • Admin Console (#/admin - login protected)                    │
│  • Login Page                                                   │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ HTTP API Calls
                 │
┌────────────────▼────────────────────────────────────────────────┐
│               Django REST API Backend                           │
│            Running on port 8000 (/api)                          │
├─────────────────────────────────────────────────────────────────┤
│  • Authentication (JWT tokens)                                  │
│  • Project Management (CRUD)                                    │
│  • Site Settings                                                │
│  • Lead Collection (contact form)                               │
│  • Admin Functions                                              │
│  • AI Integration (Gemini API for content generation)          │
└────────────────┬────────────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
    SQLite DB    Django Admin
    (dev)        Interface
    
    ↓ (production)
    PostgreSQL
```

---

## User Flows

### 1. **Public User Experience**
```
Visit Portfolio → Home Page → Browse Projects/About → Contact Form
                    ↓
                Explore Projects (filterable)
                    ↓
                Submit Contact Form
                    ↓
            Lead stored in database
```

### 2. **Admin User Experience**
```
Click Console/Admin → Login Page → Enter Credentials
                           ↓
                     Admin Dashboard
                           ↓
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
    Manage Projects   Site Settings   View Leads
    • Create         • Bio            • View all
    • Edit           • Headline       • Mark as read
    • Delete         • Email          • Export
    • Add Features   • Social Links
                     • Tech Stack
```

---

## Frontend Components

```
App.tsx (Main)
├── Header.tsx
│   ├── Navigation Links
│   ├── Mobile Menu
│   └── Logo
├── Pages/
│   ├── Home.tsx
│   │   └── ProjectCard.tsx
│   │       └── ProjectDetails.tsx (modal)
│   ├── About.tsx
│   ├── Portfolio.tsx
│   │   └── ProjectCard.tsx
│   ├── Contact.tsx
│   │   └── ContactForm.tsx
│   ├── Admin.tsx
│   │   ├── ProjectManager.tsx
│   │   ├── SettingsManager.tsx
│   │   └── LeadManager.tsx
│   ├── Console.tsx
│   └── Login.tsx
└── Footer.tsx
    └── Social Links (GitHub, LinkedIn, Twitter, Telegram)
```

---

## Key Files

### Home Page
**File**: `pages/Home.tsx`
- **Image**: Professional profile photo from `/public/profile.png`
- **Features**: 
  - Hero section with headline and bio
  - Profile image with hover effects
  - Featured projects grid
  - Call-to-action section

### Navigation
**File**: `components/Header.tsx`
- **Fix**: Custom click handlers prevent querySelector errors
- **Mobile**: Responsive hamburger menu
- **Links**: Home, About, Portfolio, Contact, Admin Console

### Footer
**File**: `components/Footer.tsx`
- **Social Links**: 
  - GitHub
  - LinkedIn
  - Twitter
  - Telegram (@dagiabyot) ← NEW
- **Navigation**: Footer links to all pages
- **CTA**: "Start a project" button

### Admin Console
**Files**: 
- `pages/Admin.tsx` - Main admin interface
- `pages/Login.tsx` - Authentication form
- Requires: Valid superuser credentials

---

## Backend Structure

```
backend/
├── config/
│   ├── settings.py         # Django configuration
│   ├── urls.py             # API routes
│   └── wsgi.py             # Production entry
├── portfolio_api/
│   ├── models.py           # Database models
│   ├── serializers.py      # API serializers
│   ├── views.py            # API endpoints
│   ├── admin.py            # Django admin config
│   └── utils.py            # Helper functions
├── manage.py               # Django CLI
├── requirements.txt        # Python dependencies
├── .env.example            # Environment template
└── README.md               # Backend API docs
```

---

## Database Models

```
User
├── username (primary key)
├── email
├── password (hashed)
└── is_superuser

Project
├── id (UUID)
├── title
├── description
├── category (WEB, MOBILE, AI, etc.)
├── imageUrl
├── skills (JSON array)
├── featured (boolean)
├── github
├── link
└── timestamps

Settings
├── id (single instance)
├── name
├── bio
├── email
├── socials (JSON)
└── heroHeadline

Lead
├── id (UUID)
├── name
├── email
├── message
├── read (boolean)
└── timestamp
```

---

## API Endpoints

### Public
```
GET  /api/projects/             # List all projects
GET  /api/projects/{id}/        # Get project details
GET  /api/settings/             # Get site settings
POST /api/leads/                # Submit contact form
```

### Protected (Requires Authentication)
```
POST   /api/auth/login/         # Login with credentials
POST   /api/auth/logout/        # Logout
POST   /api/projects/           # Create project
PUT    /api/projects/{id}/      # Update project
DELETE /api/projects/{id}/      # Delete project
PUT    /api/settings/           # Update settings
GET    /api/leads/              # List all leads
PATCH  /api/leads/{id}/read/    # Mark lead as read
POST   /api/generate/bio/       # AI: Generate bio (Gemini)
POST   /api/generate/description/ # AI: Generate description
```

---

## Deployment

### Frontend (Recommended: Vercel)
```
1. Push code to GitHub
2. Connect repo to Vercel
3. Set VITE_API_URL to backend URL
4. Deploy with one click
```

### Backend (Recommended: Railway/Render/Heroku)
```
1. Set environment variables
2. Configure PostgreSQL database
3. Run migrations
4. Deploy
```

---

## Technologies Used

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **SWR** - Data fetching
- **React Router** - Hash-based routing

### Backend
- **Django** - Web framework
- **Django REST Framework** - API
- **PostgreSQL** - Database (production)
- **SQLite** - Database (development)
- **Google Gemini API** - AI content generation
- **JWT** - Authentication

---

## Mobile Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl)

All pages and components use Tailwind CSS responsive classes:
- `sm:` (640px)
- `md:` (768px)
- `lg:` (1024px)
- `xl:` (1280px)

---

## Security Features

- ✓ JWT-based authentication
- ✓ Protected admin endpoints
- ✓ CORS configured
- ✓ Password hashing (Django default)
- ✓ CSRF protection
- ✓ Input validation and sanitization
- ✓ Environment variables for sensitive data

---

## Performance Optimizations

- ✓ Code splitting with Vite
- ✓ Image optimization
- ✓ Lazy loading components
- ✓ Caching strategies
- ✓ Minified production builds
- ✓ CDN-ready assets

---

## File Structure Summary

```
portfolio/
├── App.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   └── ProjectDetails.tsx
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Portfolio.tsx
│   ├── Contact.tsx
│   ├── Admin.tsx
│   ├── Console.tsx
│   └── Login.tsx
├── services/
│   └── api.ts
├── types.ts
├── constants.tsx
├── index.tsx
├── public/
│   └── profile.png
├── backend/
│   ├── config/
│   ├── portfolio_api/
│   └── manage.py
├── QUICK_START.txt
├── ADMIN_SETUP.md
├── SETUP_GUIDE.md
└── package.json
```

---

## Next Steps

1. **Run Backend**: `cd backend && python manage.py runserver 8000`
2. **Create Superuser**: `python manage.py createsuperuser`
3. **Run Frontend**: `npm run dev`
4. **Access Admin**: `http://localhost:3000/#/admin`
5. **Manage Content**: Use admin console to add/edit projects

See `QUICK_START.txt` for immediate deployment!
