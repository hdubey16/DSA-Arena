import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { getTopics, getTopicById, getQuestionsForTopic, submitAnswer, getProgress } from '../controllers/user.controller';
import { getLeaderboard } from '../controllers/leaderboard.controller';

const router = express.Router();

// Public routes
router.get('/topics', getTopics);
router.get('/topics/:id', getTopicById);
// Questions for a topic (returns only questions)
router.get('/topics/:id/questions', getQuestionsForTopic);

// Protected routes
router.post('/submissions', authMiddleware, submitAnswer);
router.get('/progress', authMiddleware, getProgress);
router.get('/leaderboard', getLeaderboard);

export default router;
