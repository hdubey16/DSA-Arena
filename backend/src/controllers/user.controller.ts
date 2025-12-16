import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';
import Topic from '../models/Topic';
import Question from '../models/Question';
import UserProgress from '../models/UserProgress';

export const getTopics = async (req: AuthRequest, res: Response) => {
  try {
    const topics = await Topic.find().sort({ week: 1, day: 1 });
    res.json({ topics });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topics' });
  }
};

export const getTopicById = async (req: AuthRequest, res: Response) => {
  try {
    const topic = await Topic.findOne({ id: req.params.id });
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    const questions = await Question.find({ topicId: req.params.id });
    res.json({ topic, questions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topic' });
  }
};

export const getQuestionsForTopic = async (req: AuthRequest, res: Response) => {
  try {
    const questions = await Question.find({ topicId: req.params.id });
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions for topic' });
  }
};

export const submitAnswer = async (req: AuthRequest, res: Response) => {
  try {
    // Placeholder for code execution and evaluation
    // In production, this would run code in a sandbox and check against test cases
    res.json({
      success: true,
      score: 100,
      message: 'Code submitted successfully (sandbox execution not implemented yet)'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting answer' });
  }
};

export const getProgress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log('[getProgress] Fetching progress for user:', userId);
    console.log('[getProgress] User ID type:', typeof userId);

    // Convert string userId to ObjectId for MongoDB query
    const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log('[getProgress] Converted to ObjectId:', userObjectId);

    // Get all user progress records
    const progressRecords = await UserProgress.find({ userId: userObjectId });
    
    console.log('[getProgress] Found', progressRecords.length, 'progress records');
    
    if (progressRecords.length > 0) {
      console.log('[getProgress] Sample record:', {
        dayId: progressRecords[0].dayId,
        questionIndex: progressRecords[0].questionIndex,
        completed: progressRecords[0].completed
      });
    }
    
    // Group by day
    const progressByDay: Record<number, any> = {};
    
    progressRecords.forEach(record => {
      if (!progressByDay[record.dayId]) {
        progressByDay[record.dayId] = {
          dayId: record.dayId,
          questions: []
        };
      }
      
      progressByDay[record.dayId].questions.push({
        questionIndex: record.questionIndex,
        completed: record.completed,
        code: record.code,
        lastAttempt: record.lastAttempt,
        attempts: record.attempts,
        testsPassed: record.testsPassed,
        totalTests: record.totalTests
      });
    });

    console.log('[getProgress] Returning progress for', Object.keys(progressByDay).length, 'days');
    
    res.json({
      success: true,
      progress: progressByDay
    });
  } catch (error: any) {
    console.error('[getProgress] Error fetching progress:', error);
    res.status(500).json({ message: 'Error fetching progress', error: error.message });
  }
};
