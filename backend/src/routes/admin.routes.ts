import express from 'express';
import { authMiddleware, requireAdmin } from '../middleware/auth';
import {
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getDashboardStats
} from '../controllers/admin.controller';

// Import new admin controllers
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
  getDashboardStats as getNewDashboardStats
} from '../controllers/adminController';

// Import dashboard controllers
import {
  getEnhancedDashboardStats,
  getRealTimeStats,
  getSystemHealth
} from '../controllers/dashboardController';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authMiddleware, requireAdmin);

// Dashboard
router.get('/stats', getDashboardStats);
router.get('/dashboard/stats', getNewDashboardStats);
router.get('/dashboard/enhanced', getEnhancedDashboardStats);
router.get('/dashboard/realtime', getRealTimeStats);
router.get('/dashboard/health', getSystemHealth);

// Topics
router.get('/topics', getTopics);
router.post('/topics', createTopic);
router.put('/topics/:id', updateTopic);
router.delete('/topics/:id', deleteTopic);

// Users (original)
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// User Management (enhanced)
router.get('/users/list', getAllUsers);
router.get('/users/:userId/details', getUserDetails);
router.put('/users/:userId/role', updateUserRole);
router.put('/users/:userId/status', updateUserStatus);

// User Progress Management
router.put('/users/:userId/days/:dayId/questions/:questionIndex/lock', toggleQuestionLock);
router.post('/users/:userId/days/:dayId/unlock', unlockDayForUser);
router.delete('/users/:userId/days/:dayId/progress', resetUserProgress);

// Day Settings Management
router.get('/days/settings', getAllDaySettings);
router.put('/days/:dayId/settings', updateDaySettings);
router.post('/days/bulk-unlock', bulkUnlockDays);

// Test Management
import {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest,
  goLiveTest,
  endTest,
  duplicateTest,
  getTestStatistics
} from '../controllers/testController';

router.post('/tests', createTest);
router.get('/tests', getAllTests);
router.get('/tests/:testId', getTestById);
router.put('/tests/:testId', updateTest);
router.delete('/tests/:testId', deleteTest);
router.post('/tests/:testId/go-live', goLiveTest);
router.post('/tests/:testId/end', endTest);
router.post('/tests/:testId/duplicate', duplicateTest);
router.get('/tests/:testId/statistics', getTestStatistics);

// Submission Management
import {
  getAllSubmissions,
  getSubmissionDetails as getAdminSubmissionDetails,
  reevaluateSubmission,
  deleteSubmission,
  getSubmissionStats
} from '../controllers/adminSubmissionController';

router.get('/submissions', getAllSubmissions);
router.get('/submissions/stats', getSubmissionStats);
router.get('/submissions/:submissionId', getAdminSubmissionDetails);
router.post('/submissions/:submissionId/reevaluate', reevaluateSubmission);
router.delete('/submissions/:submissionId', deleteSubmission);

export default router;
