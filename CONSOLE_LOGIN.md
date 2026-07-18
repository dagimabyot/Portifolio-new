# Admin Console Login

## Quick Reference

### Username and Password

**These are YOUR custom credentials that you create yourself!**

When you set up the admin console for the first time:

```bash
cd backend
python manage.py createsuperuser
```

You will be prompted to enter:
- **Username**: Choose any username you want (e.g., `dagim`, `admin`, `admin_user`)
- **Email**: Your email address
- **Password**: Choose a strong password (you'll need to enter it twice)

### Example Setup:
```
Username: dagim
Email: dagim@example.com
Password: MySecurePassword123!
```

Then use these credentials to login at: **http://localhost:3000/#/admin**

## Important Notes

- You choose the username and password when running `createsuperuser`
- There is NO default username/password - you must create one
- Keep your password secure
- If you forget your password, run `python manage.py changepassword dagim` (replace with your username)
- For production, use a strong, unique password with special characters

## Steps to Create Admin Account

1. Open terminal in `backend` folder
2. Activate virtual environment: `source venv/bin/activate`
3. Run: `python manage.py createsuperuser`
4. Enter your chosen username
5. Enter your email
6. Enter and confirm your password
7. Start server: `python manage.py runserver 8000`
8. Access console at: `http://localhost:3000/#/admin`
9. Login with your credentials

## Reset Password

If you forget your password:
```bash
cd backend
python manage.py changepassword yourUsername
```

Replace `yourUsername` with the username you created.
