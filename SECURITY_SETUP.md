# Security and Setup Guide

## ⚠️ IMPORTANT: Environment Variables Setup

This project requires sensitive credentials that are **NOT** included in the repository for security reasons.

### Required Setup Steps

1. **Copy Example Files**
   ```bash
   # Frontend
   cp .env.example .env
   
   # Backend
   cp backend/.env.example backend/.env
   ```

2. **Configure MongoDB Atlas**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Create a database user with password
   - Get your connection string
   - Update `MONGODB_URI` in `backend/.env`

3. **Generate JWT Secret**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   Copy the output and update `JWT_SECRET` in `backend/.env`

4. **Get Judge0 API Key**
   - Sign up at [RapidAPI](https://rapidapi.com/)
   - Subscribe to [Judge0 CE API](https://rapidapi.com/judge0-official/api/judge0-ce)
   - Copy your API key
   - Update `JUDGE0_API_KEY` in `backend/.env`

5. **Update Frontend API URL**
   - Update `VITE_API_URL` in `.env` to match your backend URL
   - For local development: `http://localhost:5000/api`
   - For production: Your deployed backend URL

### MongoDB Atlas Network Access

Make sure to whitelist your IP address or allow access from anywhere (0.0.0.0/0) in MongoDB Atlas:
- Go to Network Access in MongoDB Atlas
- Add IP Address
- For development: Add your current IP
- For production (Vercel): Add `0.0.0.0/0`

### Security Best Practices

1. **Never commit `.env` files to git**
2. **Use strong, unique passwords for MongoDB**
3. **Rotate JWT secrets regularly**
4. **Keep API keys confidential**
5. **Use different credentials for development and production**

### File Structure

```
.env                 # Frontend environment variables (git ignored)
.env.example         # Frontend template (committed)
backend/.env         # Backend environment variables (git ignored)
backend/.env.example # Backend template (committed)
```

### Vercel Deployment

For Vercel deployment, you need to:
1. Add all environment variables in Vercel Dashboard
2. Do NOT commit actual `.env` files
3. See `VERCEL_DEPLOYMENT.md` for detailed instructions

### What's Safe to Commit?

✅ `.env.example` files (templates without real credentials)
✅ Documentation files
✅ Source code

❌ `.env` files with real credentials
❌ API keys
❌ Database passwords
❌ JWT secrets

### Getting Help

If you need help setting up:
1. Check `VERCEL_DEPLOYMENT.md` for deployment guide
2. Check `ENV_VARIABLES.md` for environment variables reference
3. Check `.env.example` files for required variables

---

**Remember**: The security of your application depends on keeping these credentials private!
