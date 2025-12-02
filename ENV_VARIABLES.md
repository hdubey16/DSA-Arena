# Environment Variables for Vercel Deployment

## Frontend Environment Variables
Add these in your **Frontend Vercel Project** → Settings → Environment Variables:

```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

**Note**: Replace `your-backend-url` with actual backend Vercel URL after backend deployment.

---

## Backend Environment Variables
Add these in your **Backend Vercel Project** → Settings → Environment Variables:

### Required Variables (7 total):

```env
NODE_ENV=production
```

```env
PORT=5000
```

```env
MONGODB_URI=your_mongodb_atlas_connection_string_here
```

```env
JWT_SECRET=YOUR_SECURE_RANDOM_SECRET_HERE
```
⚠️ **IMPORTANT**: Generate a new secure secret for production:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

```env
JWT_EXPIRES_IN=7d
```

```env
FRONTEND_URL=https://your-frontend-url.vercel.app
```
**Note**: Replace with actual frontend Vercel URL.

```env
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

```env
JUDGE0_API_KEY=your_judge0_rapidapi_key_here
```

---

## Deployment Order

1. **Deploy Backend First**
   - Get backend URL (e.g., `https://dsa-arena-backend.vercel.app`)
   
2. **Update Frontend Environment Variable**
   - Set `VITE_API_URL` to backend URL + `/api`
   
3. **Deploy Frontend**
   - Get frontend URL (e.g., `https://dsa-arena.vercel.app`)
   
4. **Update Backend Environment Variable**
   - Set `FRONTEND_URL` to frontend URL
   - Redeploy backend

---

## MongoDB Atlas Configuration

Make sure MongoDB Atlas allows Vercel connections:
1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
3. Or add Vercel IP ranges if preferred for security

---

## Quick Commands

### Generate JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Test Environment Variables Locally:
```bash
# Frontend
npm run dev

# Backend
cd backend
npm run dev
```

---

## Vercel Project Configuration

### Frontend:
- **Framework**: Vite
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Backend:
- **Framework**: Other
- **Root Directory**: `./backend`
- **Build Command**: Leave empty (handled by vercel-build script)
- **Output Directory**: Leave empty

---

## Troubleshooting

### CORS Error?
✅ Check `FRONTEND_URL` matches your actual frontend URL
✅ Verify backend CORS configuration in `src/server.ts`

### API Not Connecting?
✅ Verify `VITE_API_URL` includes `/api` suffix
✅ Check backend deployment logs in Vercel

### MongoDB Connection Failed?
✅ Check MongoDB Atlas network access settings
✅ Verify connection string format

### Judge0 Not Working?
✅ Verify RapidAPI subscription is active
✅ Check API key is correct in environment variables
