# Admin Setup Guide

## Quick Start - Backend Setup

The portfolio requires a Django backend API to manage projects, settings, and leads. Follow these steps:

### Prerequisites
- Python 3.8+
- pip

### 1. Setup Backend Environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
# Edit .env and set your API keys if needed (e.g., GEMINI_API_KEY for AI features)
```

### 3. Initialize Database

```bash
python manage.py migrate
python manage.py seed_data
```

### 4. Create Admin Account

```bash
python manage.py createsuperuser
```

You will be prompted to enter:
- **Username**: Your desired admin username (e.g., `dagim`)
- **Email**: Your email address
- **Password**: A secure password (you'll need to enter it twice)

**Example:**
```
Username: dagim
Email: dagim@example.com
Password: (enter your secure password)
```

### 5. Start the Backend Server

```bash
python manage.py runserver 8000
```

The API will be available at: `http://127.0.0.1:8000/api`

## Frontend Setup

### 1. Install Dependencies

```bash
npm install
# or with yarn: yarn install
# or with pnpm: pnpm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will be available at: `http://localhost:3000`

## Accessing the Admin Console

Once both servers are running:

1. Open the portfolio at `http://localhost:3000`
2. Click the "Console" button in the header or navigate to `#/admin`
3. Enter your superuser credentials (username and password from step 4 above)
4. You can now:
   - Manage projects
   - Edit site settings
   - View and manage contact form submissions
   - Use AI-assist features for bio and project descriptions

## Default Admin Credentials Format

After creating your superuser account, use these in the admin console:
- **Username**: The username you entered in the `createsuperuser` command
- **Password**: The password you set in the `createsuperuser` command

## Troubleshooting

### "Could not reach the backend API" error

**Solution**: Make sure the Django server is running:
```bash
cd backend
python manage.py runserver 8000
```

### Admin login fails

**Solution**: Verify you created a superuser account:
```bash
python manage.py shell
>>> from django.contrib.auth.models import User
>>> User.objects.all()  # Should show your superuser
```

### Database errors

**Solution**: Reset the database:
```bash
python manage.py migrate
python manage.py seed_data
python manage.py createsuperuser
```

## API Documentation

See `backend/README.md` for full API documentation and endpoints.

## Security Notes

- Never commit `.env` files with real API keys
- Use environment variables for sensitive configuration
- Change default passwords before deployment
- Use strong, unique passwords for production superuser accounts
