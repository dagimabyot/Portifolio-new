# Portfolio Backend (Django + DRF)

REST API powering the React portfolio frontend: projects, testimonials, the contact form (leads), and site settings, with token-based admin authentication for the `/#/admin` console.

## Stack

- Django 5/6 + Django REST Framework
- SQLite by default (swap `DATABASES` in `config/settings.py` for Postgres in production)
- Token authentication (`rest_framework.authtoken`)
- `django-cors-headers` for the frontend origin

## Quick start

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # edit values as needed
python manage.py migrate
python manage.py seed_data      # loads the existing portfolio content
python manage.py createsuperuser
python manage.py runserver 8000
```

The API is now live at `http://127.0.0.1:8000/api/`. The Django admin UI is at `http://127.0.0.1:8000/admin/`.

## Environment variables (`.env`)

| Variable | Purpose | Default |
|---|---|---|
| `DJANGO_SECRET_KEY` | Django secret key | insecure dev key — **change in production** |
| `DJANGO_DEBUG` | Debug mode | `True` |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated allowed hosts | `localhost,127.0.0.1` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated origins allowed to call the API from the browser | `http://localhost:3000,http://127.0.0.1:3000` |
| `CSRF_TRUSTED_ORIGINS` | Comma-separated trusted origins for CSRF | `http://localhost:3000` |

## API reference

All endpoints are prefixed with `/api/`.

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/projects/` | GET | Public | List projects |
| `/projects/` | POST | Token | Create project |
| `/projects/{id}/` | GET | Public | Retrieve project |
| `/projects/{id}/` | PATCH/PUT | Token | Update project |
| `/projects/{id}/` | DELETE | Token | Delete project |
| `/testimonials/` | GET | Public | List testimonials |
| `/testimonials/` | POST/PATCH/DELETE | Token | Manage testimonials |
| `/leads/` | POST | Public | Submit the contact form |
| `/leads/` | GET | Token | List contact-form submissions |
| `/leads/{id}/` | PATCH | Token | Mark a lead as read |
| `/settings/` | GET | Public | Get site settings (name, bio, socials, etc.) |
| `/settings/` | PUT/PATCH | Token | Update site settings |
| `/auth/login/` | POST | Public | `{ "username", "password" }` → `{ "token" }` |
| `/auth/logout/` | POST | Token | Invalidate the current token |
| `/auth/me/` | GET | Token | Current admin user info |

Authenticated requests use the header:

```
Authorization: Token <token>
```

## Seed data

`python manage.py seed_data` populates the database with the same projects, testimonials, and settings that used to live in `constants.tsx` on the frontend, so switching from localStorage to the API is seamless. Pass `--reset` to wipe existing projects/testimonials first.

## Production notes

- Set `DJANGO_DEBUG=False`, a real `DJANGO_SECRET_KEY`, and your real domain(s) in `DJANGO_ALLOWED_HOSTS` / `CORS_ALLOWED_ORIGINS` / `CSRF_TRUSTED_ORIGINS`.
- Swap SQLite for Postgres for anything beyond a demo (update `DATABASES` in `config/settings.py`, or read `DATABASE_URL` via `dj-database-url` if you add it).
- Run with `gunicorn config.wsgi:application` behind a reverse proxy (nginx/Caddy) rather than `runserver`.
- Serve `MEDIA_ROOT` (uploaded project images) from your reverse proxy or a bucket (S3, etc.) in production; `whitenoise` is included for static files.
- Run `python manage.py collectstatic` before deploying.
