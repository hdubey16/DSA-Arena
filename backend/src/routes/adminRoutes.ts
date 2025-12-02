import express from 'express';
import {
  getAllUsers,
  getUserDetails,
  updateUserRole,
  updateUserStatus,
  toggleQuestionLock,
  unlockDayForUser,
  resetUserProgress,
  getAllDaySettings,
  updateDaySettings,
  bulkUnlockDays,
  getDashboardStats,
  deleteUser
} from '../controllers/adminController';
import { authMiddleware } from '../middleware/authMiddleware';
import { adminMiddleware } from '../middleware/adminMiddleware';

const router = express.Router();

// All routes require authentication and admin role
router.use(authMiddleware);
router.use(adminMiddleware);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserDetails);
router.put('/users/:userId/role', updateUserRole);
router.put('/users/:userId/status', updateUserStatus);
router.delete('/users/:userId', deleteUser);

// User progress management
router.put('/users/:userId/days/:dayId/questions/:questionIndex/lock', toggleQuestionLock);
router.post('/users/:userId/days/:dayId/unlock', unlockDayForUser);
router.delete('/users/:userId/days/:dayId/progress', resetUserProgress);

// Day settings management
router.get('/days/settings', getAllDaySettings);
router.put('/days/:dayId/settings', updateDaySettings);
router.post('/days/bulk-unlock', bulkUnlockDays);

export default router;
