import { Router } from 'express';
import {
  submitCode,
  runCode,
  getSubmissionHistory,
  getSubmissionDetails
} from '../controllers/submissionController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All submission endpoints require authentication
router.post('/run', authMiddleware, runCode);
router.post('/submit', authMiddleware, submitCode);
router.get('/history', authMiddleware, getSubmissionHistory);
router.get('/details/:submissionId', authMiddleware, getSubmissionDetails);

export default router;

