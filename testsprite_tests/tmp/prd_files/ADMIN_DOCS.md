# Admin Panel Documentation

## 🎯 Overview
The JavaPrep Arena Admin Panel provides comprehensive control over users, content, and platform settings.

## 🔐 Access

**Admin Login:** `http://localhost:8080/admin/login`

Default admin credentials (create manually in database):
- Role: `admin`
- You need to manually set `role: 'admin'` for a user in MongoDB

## 📊 Features

### 1. Dashboard
- **Statistics Overview**
  - Total users count
  - Active users tracking
  - Total code attempts
  - Completed questions
  - Admin accounts count
- **Recent Users** - View newly registered users
- **Day Completion Stats** - Progress across all 39 days

### 2. User Management
**Features:**
- Search users by name/email
- Filter by role (user/moderator/admin)
- Filter by status (active/suspended/banned)
- View detailed user progress
- Update user roles
- Change user status
- Unlock/lock specific questions
- Unlock entire days
- Reset day progress

**Actions:**
- **View Details** - See complete user progress with day-by-day breakdown
- **Unlock Day** - Grant access to all 5 questions in a day
- **Reset Progress** - Clear user's attempts and completion for a day
- **Change Role** - Promote to moderator/admin
- **Update Status** - Suspend or ban users

### 3. Day Settings Management
**Configure each of 39 days:**

**Basic Settings:**
- Day title and topic name
- Week assignment
- Lock/unlock status
- Questions per day (default: 5)
- Time limit (optional)
- Allowed attempts
- Passing score

**Custom Settings:**
- **Allow Hints** - Enable/disable hint system
- **Allow Reset** - Let users reset their code
- **Show Solutions** - Display solutions after completion
- **Solution Unlock After** - Delay solution access (hours)

**Bulk Actions:**
- Unlock multiple days at once (comma-separated: 1,2,3)
- Currently Days 1-16 unlocked by default
- Days 17-39 locked (progressive system)

## 🚀 Setup Instructions

### 1. Initialize Database
```bash
cd backend
npx ts-node src/scripts/init-day-settings.ts
```

### 2. Create Admin User
In MongoDB:
```javascript
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

### 3. Start Services
```bash
# Backend
cd backend
npm run dev

# Frontend
cd ..
npm run dev
```

## 📋 API Endpoints

### Dashboard
- `GET /api/admin/dashboard/stats` - Dashboard statistics

### Users
- `GET /api/admin/users/list` - Get all users (paginated)
- `GET /api/admin/users/:userId/details` - User details with progress
- `PUT /api/admin/users/:userId/role` - Update user role
- `PUT /api/admin/users/:userId/status` - Update user status
- `DELETE /api/admin/users/:userId` - Delete user

### User Progress
- `PUT /api/admin/users/:userId/days/:dayId/questions/:questionIndex/lock` - Lock/unlock question
- `POST /api/admin/users/:userId/days/:dayId/unlock` - Unlock entire day
- `DELETE /api/admin/users/:userId/days/:dayId/progress` - Reset day progress

### Day Settings
- `GET /api/admin/days/settings` - Get all day settings
- `PUT /api/admin/days/:dayId/settings` - Update day settings
- `POST /api/admin/days/bulk-unlock` - Bulk unlock days

## 🎮 Usage Examples

### Unlock Days 1-20 for All Users
1. Go to **Day Settings** tab
2. Enter `1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20` in bulk unlock
3. Click **Unlock Days**

### Unlock Specific Day for One User
1. Go to **Users** tab
2. Click eye icon to view user details
3. Find the day in the grid
4. Click unlock icon for that day

### Reset User Progress
1. Go to **Users** tab
2. View user details
3. Click trash icon on the day you want to reset
4. User's code and completion status will be cleared

### Change Day Settings
1. Go to **Day Settings** tab
2. Select day number (1-39)
3. Modify settings as needed
4. Click **Save Settings**

## 🔧 Configuration

### Days 1-16 (Unlocked by Default)
- No completion required to progress
- Students can navigate freely
- Ideal for learning phase

### Days 17-39 (Progressive System)
- Must complete current question to proceed
- LeetCode-style progression
- Encourages mastery before advancing

## 🛡️ Security

**Admin Routes Protected:**
- Authentication required
- Admin role verification
- JWT token validation
- Unauthorized access returns 403

**Middleware:**
- `authMiddleware` - Validates JWT token
- `adminMiddleware` - Checks admin role
