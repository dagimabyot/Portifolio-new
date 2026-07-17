# Dagim Abyot — Portfolio

A full-stack developer portfolio: React + TypeScript + Vite on the frontend, Django + Django REST Framework on the backend.

## Structure

```
.
├── App.tsx, components/, pages/, services/   # React frontend (Vite)
├── backend/                                  # Django REST API
│   ├── config/                               # Django project settings/urls
│   ├── portfolio_api/                        # Models, serializers, views, admin
│   └── README.md                             # Backend setup & API reference
└── .env.example                              # Frontend env vars
```

## Running locally

### 1. Backend (Django API)

```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed_data
python manage.py createsuperuser
python manage.py runserver 8000
```

See `backend/README.md` for the full API reference and production notes.

### 2. Frontend (React)

```bash
cp .env.example .env.local     # set VITE_API_URL if not using the default
npm install
npm run dev
```

The app runs at `http://localhost:3000` and talks to the Django API at `http://127.0.0.1:8000/api` by default.

## Admin console

Visit `#/admin` and sign in with the superuser account you created (`python manage.py createsuperuser`). From there you can manage projects, edit site settings, and read contact-form submissions — all persisted through the Django API instead of browser localStorage.

## Features

- **Public site**: home, about, portfolio (filterable by category), contact form
- **Contact form** -> stored as a `Lead` in the database via the Django API
- **Admin console** (`#/admin`, login-gated): manage projects, site settings, and view/mark leads as read
- **AI-assist buttons** in the admin console (bio + project description generation) use the Gemini API — set `GEMINI_API_KEY` in `.env.local` to enable them
