# Vercel Deployment Guide for DSA Arena

## Prerequisites
1. GitHub repository: https://github.com/hdubey16/DSA-Arena.git
2. Vercel account connected to GitHub
3. MongoDB Atlas database (already configured)
4. Judge0 RapidAPI key (already configured)

## Deployment Steps

### 1. Frontend Deployment (Main App)

#### Import Project to Vercel
1. Go to https://vercel.com/new
2. Import `hdubey16/DSA-Arena` repository
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Environment Variables (Frontend)
Add these in Vercel Dashboard → Settings → Environment Variables:

```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

### 2. Backend Deployment (Separate Vercel Project)

#### Create Backend Vercel Project
1. Go to https://vercel.com/new
2. Import the same `hdubey16/DSA-Arena` repository again
3. Configure project:
   - **Project Name**: `dsa-arena-backend`
   - **Framework Preset**: Other
   - **Root Directory**: `./backend`
   - **Build Command**: `npm run build` (if you have build script) or leave empty
   - **Output Directory**: Leave empty (Node.js API)
   - **Install Command**: `npm install`

#### Environment Variables (Backend)
Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# Environment
NODE_ENV=production

# Server Configuration
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb+srv://JavaStudy:JavaStudy@cluster0.6g4tx28.mongodb.net/javaprep_arena?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=javaprep_super_secret_key_2024_change_in_production_IMPORTANT
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=https://your-frontend-url.vercel.app

# Judge0 API Configuration
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=ef5eccc51amsh436977dba683b49p1f30ffjsne2238dc020dc
```

### 3. Backend Vercel Configuration

Create/update `backend/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.ts"
    }
  ]
}
```

### 4. Update Backend Package.json

Add/update these scripts in `backend/package.json`:

```json
{
  "scripts": {
    "build": "tsc",
    "vercel-build": "npm run build"
  }
}
```

### 5. Important Security Updates

#### Update JWT_SECRET
⚠️ **CRITICAL**: Change the JWT_SECRET to a strong, unique value in production:
```bash
# Generate a secure random secret (run locally):
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Use this generated value for `JWT_SECRET` in backend environment variables.

#### Update MongoDB Password
Consider creating a new MongoDB user with a strong password for production.

### 6. After Deployment

1. **Get Backend URL**: After backend deployment, copy the Vercel URL (e.g., `https://dsa-arena-backend.vercel.app`)

2. **Update Frontend Environment Variable**:
   - Go to frontend Vercel project → Settings → Environment Variables
   - Update `VITE_API_URL` to: `https://dsa-arena-backend.vercel.app/api`
   - Redeploy frontend

3. **Update Backend CORS**:
   - Go to backend Vercel project → Settings → Environment Variables
   - Update `FRONTEND_URL` to your frontend URL (e.g., `https://dsa-arena.vercel.app`)
   - Redeploy backend

### 7. Domain Configuration (Optional)

#### Custom Domain for Frontend
1. Go to Frontend Vercel Project → Settings → Domains
2. Add your custom domain (e.g., `dsaarena.com`)
3. Follow DNS configuration instructions

#### Custom Domain for Backend
1. Go to Backend Vercel Project → Settings → Domains
2. Add subdomain (e.g., `api.dsaarena.com`)
3. Update frontend `VITE_API_URL` to use custom domain

### 8. Environment Variables Summary

#### Frontend (.env for local, Vercel for production)
```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

#### Backend (.env for local, Vercel for production)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://[username]:[password]@cluster0.6g4tx28.mongodb.net/javaprep_arena?retryWrites=true&w=majority
JWT_SECRET=[generate-strong-secret]
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend-url.vercel.app
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=ef5eccc51amsh436977dba683b49p1f30ffjsne2238dc020dc
```

### 9. Testing Deployment

1. Visit your frontend URL
2. Try logging in
3. Test code execution
4. Check browser console for any CORS errors
5. Monitor Vercel function logs for backend errors

### 10. Common Issues & Solutions

#### CORS Errors
- Ensure `FRONTEND_URL` in backend matches your actual frontend URL
- Check backend `src/server.ts` CORS configuration

#### API Connection Failed
- Verify `VITE_API_URL` in frontend environment variables
- Check backend deployment logs in Vercel dashboard

#### MongoDB Connection Issues
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0) for Vercel
- Check MongoDB URI format and credentials

#### Judge0 API Errors
- Verify RapidAPI subscription is active
- Check API key is correct

### 11. Monitoring

- **Frontend Logs**: Vercel Dashboard → Your Project → Deployments → View Function Logs
- **Backend Logs**: Vercel Dashboard → Backend Project → Deployments → View Function Logs
- **MongoDB**: MongoDB Atlas → Metrics

### 12. Continuous Deployment

Both projects will auto-deploy when you push to the `main` branch on GitHub.

To deploy manually:
1. Go to Vercel Dashboard → Your Project
2. Click "Deployments" tab
3. Click "Redeploy" on any previous deployment

---

## Quick Reference

### Frontend Vercel Settings
- Framework: Vite
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `dist`

### Backend Vercel Settings
- Framework: Other
- Root Directory: `./backend`
- Build Command: Leave empty
- Output Directory: Leave empty

### Required Environment Variables
- Frontend: 1 variable (VITE_API_URL)
- Backend: 7 variables (NODE_ENV, PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN, FRONTEND_URL, JUDGE0_API_URL, JUDGE0_API_KEY)
