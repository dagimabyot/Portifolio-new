# Portfolio Setup Guide

This is a full-stack portfolio application with a React frontend and Django REST API backend.

## Project Structure

```
.
├── App.tsx, components/, pages/, services/   # React frontend (Vite)
├── public/                                    # Static assets including profile image
├── backend/                                   # Django REST API
│   ├── config/                                # Django project settings/urls
│   ├── portfolio_api/                         # Models, serializers, views, admin
│   └── README.md                              # Backend API reference
├── ADMIN_SETUP.md                             # Detailed admin console setup
├── SETUP_GUIDE.md                             # This file
└── .env.example                               # Frontend env vars example
```

## Quick Start (5 Minutes)

### Step 1: Start the Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed_data
python manage.py createsuperuser
python manage.py runserver 8000
```

When prompted for superuser credentials, enter:
- **Username**: `dagim` (or your preferred username)
- **Email**: Your email address
- **Password**: Your secure password (will be needed for admin console)

### Step 2: Start the Frontend

In a new terminal:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

### Step 3: Access Admin Console

1. Click the "Console" button in the header
2. Enter your superuser username and password
3. Manage projects, settings, and leads from the admin dashboard

## Features

### Public Site
- **Home**: Hero section with professional profile image, featured projects, and CTA
- **About**: Your bio and professional background
- **Portfolio**: Filterable projects by category (Web, Mobile, AI, etc.)
- **Contact**: Contact form with lead capture

### Admin Console (`#/admin`)
- **Login-gated**: Only accessible with superuser credentials
- **Project Management**: Create, update, and delete projects
- **Site Settings**: Edit bio, headline, contact info, and social links
- **Lead Management**: View and manage contact form submissions
- **AI Features**: Generate bios and project descriptions using Google Gemini API

### Responsive Design
- Fully mobile-responsive
- Beautiful profile image on home page with hover effects
- Optimized layouts for all screen sizes

## Environment Variables

### Frontend (.env.local)

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### Backend (.env)

```env
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
GEMINI_API_KEY=your-gemini-api-key-for-ai-features
```

## Admin Credentials

After running `python manage.py createsuperuser`, use those credentials in the admin console:

**Default format:**
- **Username**: The username you created
- **Password**: The password you created

**Example login:**
```
Username: dagim
Password: your-secure-password
```

## Troubleshooting

### "Could not reach the backend API" error

**Solution**: Ensure Django server is running:
```bash
cd backend
python manage.py runserver 8000
```

Then check that `VITE_API_URL` is correctly set in `.env.local` to match your backend URL.

### Profile image not showing

The portfolio now uses your professional profile image from `/public/profile.png`. If it's not displaying:
1. Verify the file exists at `/public/profile.png`
2. Check browser console for 404 errors
3. Clear browser cache and reload

### Admin login not working

1. Verify superuser account exists:
   ```bash
   python manage.py shell
   >>> from django.contrib.auth.models import User
   >>> User.objects.all()
   ```

2. If no superuser, create one:
   ```bash
   python manage.py createsuperuser
   ```

### Django migrations error

```bash
cd backend
python manage.py migrate
python manage.py seed_data
```

## Social Links

The portfolio now includes Telegram in the social links. Update your Telegram handle in the admin console or directly in `constants.tsx`:

```typescript
telegram: 'https://t.me/dagiabyot'
```

## API Documentation

Full API documentation is available in `backend/README.md`, including:
- Authentication endpoints
- Project CRUD operations
- Settings management
- Lead submission and retrieval

## Deployment

### Frontend (Vercel recommended)
1. Push to GitHub
2. Connect repo to Vercel
3. Deploy with one click

### Backend (Heroku/Railway/Render recommended)
1. Set environment variables
2. Configure database (PostgreSQL recommended)
3. Run migrations on deployment

## Development Tips

- **Hot reload**: Both frontend and backend support hot reloading during development
- **API Testing**: Use Django admin at `http://127.0.0.1:8000/admin` for database management
- **Database**: SQLite for development, PostgreSQL recommended for production
- **TypeScript**: Frontend uses TypeScript for type safety

## Support

For issues or questions:
1. Check `ADMIN_SETUP.md` for detailed admin setup
2. Review `backend/README.md` for API details
3. Check the browser console for errors
4. Verify all services are running on correct ports

## License

This project is private and confidential.
