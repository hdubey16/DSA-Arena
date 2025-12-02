# JavaPrep Arena - Backend Setup Guide

## Overview
This guide explains how to set up the backend API server for JavaPrep Arena to connect with the MongoDB database and enable user authentication and tracking.

## Current Status ✅
- ✅ Frontend fully built with admin panel (10 modules)
- ✅ Authentication context with JWT and session tracking
- ✅ MongoDB and Axios packages installed
- ✅ API client configured with all endpoints
- ✅ User and Admin login pages created
- ✅ Protected routes with role-based access control
- ✅ Demo credentials removed from admin login

## Environment Variables (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# MongoDB Configuration
VITE_MONGODB_URI=mongodb://localhost:27017
VITE_MONGODB_DB=javaprep_arena

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

## Next Steps - Backend Server

### 1. Create Backend Server (Node.js + Express)

Create a new folder `backend/` in your project root and set up:

```bash
mkdir backend
cd backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv express-validator
npm install --save-dev typescript @types/express @types/node @types/bcryptjs @types/jsonwebtoken ts-node nodemon
```

### 2. Backend Folder Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.ts              # MongoDB connection
│   ├── models/
│   │   ├── User.ts            # User schema
│   │   ├── Topic.ts           # Topic schema
│   │   ├── Question.ts        # Question schema
│   │   ├── Test.ts            # Test schema
│   │   ├── Submission.ts      # Submission schema
│   │   ├── PlagiarismCase.ts  # Plagiarism schema
│   │   ├── ProctoringSession.ts # Proctoring schema
│   │   └── SecurityLog.ts     # Security log schema
│   ├── routes/
│   │   ├── auth.routes.ts     # Authentication routes
│   │   ├── admin.routes.ts    # Admin routes
│   │   └── user.routes.ts     # User routes
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── admin.controller.ts
│   │   └── user.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts  # JWT verification
│   │   └── role.middleware.ts  # Role-based access
│   └── server.ts              # Main server file
├── .env
├── package.json
└── tsconfig.json
```

### 3. Key Backend Routes to Implement

#### Authentication Routes (`/api/auth`)
- `POST /login` - User login
- `POST /admin/login` - Admin login
- `POST /register` - User registration (Admin creates users)
- `POST /logout` - User logout
- `GET /verify` - Verify JWT token
- `GET /me` - Get current user

#### Admin Routes (`/api/admin`)
- **Topics**: CRUD operations for 39 Java topics
- **Tests**: Create, update, delete, and activate tests
- **Submissions**: View and re-evaluate user submissions
- **Users**: Create, update, suspend, ban users
- **Plagiarism**: Get cases, review, and flag submissions
- **Proctoring**: Get sessions, live feeds, flag activities
- **Logs**: Security logs with filters
- **Settings**: Update system settings

#### User Routes (`/api`)
- `GET /topics` - Get all topics with user progress
- `GET /topics/:id` - Get topic details with questions
- `POST /submissions` - Submit answer for evaluation
- `GET /progress` - Get user progress
- `GET /tests` - Get active tests
- `POST /tests/:id/submit` - Submit test answers

### 4. MongoDB Collections Schema

You already have TypeScript interfaces defined in `src/types/database.ts`. Create Mongoose schemas matching these:

- **users** - User accounts, roles, status, sessions
- **topics** - 39 Java topics with 5 questions each
- **questions** - Practice questions with hidden test cases
- **tests** - Admin-generated tests with AI questions
- **submissions** - User answers, scores, timestamps
- **plagiarism_cases** - Similarity detection results
- **proctoring_sessions** - Webcam feeds, activity flags
- **security_logs** - All system activities
- **system_settings** - AI, test, plagiarism, proctoring config

### 5. Initial Database Seeding

Create seed scripts to populate:
1. **Admin User**: Email: admin@javaprep.com, Role: admin
2. **Topics**: Import 39 topics from `src/data/studyDays.ts`
3. **Questions**: Generate 5 questions per topic (4 practice + 1 compulsory)
4. **System Settings**: Default configuration values

### 6. Authentication Flow

1. User enters credentials on login page (`/login` or `/admin/login`)
2. Frontend calls `authAPI.login()` or `authAPI.adminLogin()`
3. Backend verifies credentials against MongoDB
4. Backend generates JWT token with user data
5. Backend tracks session (IP, device, browser, timestamp)
6. Frontend stores token in `localStorage`
7. Frontend sets user in AuthContext
8. All subsequent API calls include JWT in `Authorization` header
9. Backend middleware verifies JWT on protected routes

### 7. Session Tracking

The AuthContext already implements client-side session tracking:
- Detects IP address via ipify.org
- Detects device type (Mobile/Tablet/Desktop)
- Detects browser (Chrome/Firefox/Safari/Edge)
- Logs login, logout, and registration events

Backend should:
- Store session data in MongoDB (sessions collection)
- Track active sessions per user
- Allow session revocation
- Log all activities in security_logs collection

### 8. Running the Backend

Create `backend/package.json` scripts:
```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

Start backend server:
```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

### 9. CORS Configuration

Configure CORS to allow frontend requests:
```typescript
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
```

### 10. Testing the Integration

1. Start MongoDB: `mongod --dbpath /path/to/data`
2. Start Backend: `npm run dev` (in backend folder)
3. Start Frontend: `npm run dev` (in javacode-fortress folder)
4. Open `http://localhost:8080`
5. Click "Get Started" and register a new user
6. Admin can login at `/admin/login`
7. Verify user tracking in MongoDB sessions collection

## Frontend Files Updated

### New Files Created:
- `src/lib/mongodb.ts` - MongoDB connection helper
- `src/types/database.ts` - Complete TypeScript interfaces
- `src/lib/api.ts` - Axios API client with 40+ endpoints
- `src/pages/UserLogin.tsx` - User login/register page
- `.env` - Environment variables

### Modified Files:
- `src/contexts/AuthContext.tsx` - Real API integration, session tracking
- `src/pages/admin/AdminLogin.tsx` - Removed demo credentials
- `src/App.tsx` - Added `/login` route
- `src/pages/Index.tsx` - Added "Get Started" button

### Admin Panel Pages (Already Built):
- AdminDashboard.tsx - Overview with stats
- TopicsManagement.tsx - CRUD for topics
- TestGenerator.tsx - Create and activate tests
- SubmissionsManagement.tsx - Review submissions
- UsersManagement.tsx - User management
- PlagiarismMonitor.tsx - Plagiarism detection
- ProctoringDashboard.tsx - Live proctoring
- SecurityLogs.tsx - Activity logs
- AdminSettings.tsx - System configuration

## Security Considerations

1. **Password Hashing**: Use bcryptjs with salt rounds 10+
2. **JWT Secret**: Use strong random string, store in .env
3. **Token Expiry**: Set reasonable expiration (7 days default)
4. **Rate Limiting**: Implement on auth routes
5. **Input Validation**: Validate all user inputs with express-validator
6. **SQL Injection**: Mongoose handles this automatically
7. **XSS Protection**: Sanitize user inputs
8. **HTTPS**: Use in production

## MongoDB Connection Example

```typescript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
```

## User Model Example

```typescript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
  status: { type: String, enum: ['active', 'suspended', 'banned'], default: 'active' },
  avatar: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
```

## JWT Middleware Example

```typescript
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
```

## Support

For questions or issues during backend setup:
1. Check MongoDB connection string in `.env`
2. Verify JWT_SECRET is set
3. Ensure backend server port matches VITE_API_URL
4. Check CORS configuration allows frontend origin
5. Review browser console and network tab for API errors

---

**Last Updated**: December 2024
**Frontend Version**: Complete with all features
**Status**: Ready for backend implementation
