import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Topic from '../models/Topic';
import Question from '../models/Question';

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
    // Placeholder for user progress tracking
    res.json({
      completedTopics: [],
      totalScore: 0,
      progress: 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress' });
  }
};
