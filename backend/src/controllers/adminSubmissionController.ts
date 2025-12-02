import { Request, Response } from 'express';
import Submission from '../models/Submission';
import TestSubmission from '../models/TestSubmission';
import User from '../models/User';
import Question from '../models/Question';

// Get all submissions (practice + test) with filters
export const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const { 
      type = 'all', // 'practice' | 'test' | 'all'
      status, 
      userId, 
      page = 1, 
      limit = 50,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    // Build query for practice submissions
    let practiceSubmissions: any[] = [];
    let testSubmissions: any[] = [];

    if (type === 'all' || type === 'practice') {
      const practiceQuery: any = {};
      if (status) practiceQuery.status = status;
      if (userId) practiceQuery.userId = userId;

      practiceSubmissions = await Submission.find(practiceQuery)
        .populate({
          path: 'userId',
          select: 'name email'
        })
        .populate({
          path: 'questionId',
          select: 'title difficulty topicId'
        })
        .sort({ [sortBy as string]: sortOrder === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(Number(limit))
        .lean();
    }

    if (type === 'all' || type === 'test') {
      const testQuery: any = {};
      if (status) testQuery.status = status;
      if (userId) testQuery.userId = userId;

      testSubmissions = await TestSubmission.find(testQuery)
        .populate({
          path: 'userId',
          select: 'name email'
        })
        .populate({
          path: 'testId',
          select: 'title'
        })
        .sort({ [sortBy as string]: sortOrder === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(Number(limit))
        .lean();
    }

    // Combine and format submissions
    const allSubmissions = [
      ...practiceSubmissions.map(s => ({
        id: s._id,
        type: 'practice',
        user: {
          id: s.userId?._id,
          name: s.userId?.name || 'Unknown',
          email: s.userId?.email
        },
        question: {
          id: s.questionId?._id,
          title: s.questionId?.title || 'Unknown',
          difficulty: s.questionId?.difficulty,
          topicId: s.questionId?.topicId
        },
        status: s.status,
        totalTestCases: s.totalTestCases,
        passedTestCases: s.passedTestCases,
        runtime: s.runtime,
        memory: s.memory,
        runtimeBeats: s.runtimeBeats,
        memoryBeats: s.memoryBeats,
        submittedAt: s.createdAt
      })),
      ...testSubmissions.map(s => ({
        id: s._id,
        type: 'test',
        user: {
          id: s.userId?._id,
          name: s.userId?.name || 'Unknown',
          email: s.userId?.email
        },
        test: {
          id: s.testId?._id,
          title: s.testId?.title || 'Unknown'
        },
        score: s.percentage,
        totalQuestions: s.answers?.length || 0,
        correctAnswers: s.answers?.filter((a: any) => a.correct).length || 0,
        plagiarismScore: s.plagiarismScore || 0,
        suspicious: (s.plagiarismScore || 0) > 70,
        submittedAt: s.submittedAt
      }))
    ];

    // Sort combined results
    allSubmissions.sort((a, b) => {
      const aDate = new Date(a.submittedAt).getTime();
      const bDate = new Date(b.submittedAt).getTime();
      return sortOrder === 'desc' ? bDate - aDate : aDate - bDate;
    });

    const total = type === 'all' 
      ? await Submission.countDocuments() + await TestSubmission.countDocuments()
      : type === 'practice' 
        ? await Submission.countDocuments()
        : await TestSubmission.countDocuments();

    res.json({
      submissions: allSubmissions,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Failed to fetch submissions', error: error.message });
  }
};

// Get submission details
export const getSubmissionDetails = async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    const { type = 'practice' } = req.query;

    let submission;
    if (type === 'test') {
      submission = await TestSubmission.findById(submissionId)
        .populate('userId', 'name email')
        .populate('testId', 'title questions');
    } else {
      submission = await Submission.findById(submissionId)
        .populate('userId', 'name email')
        .populate('questionId', 'title description difficulty testCases');
    }

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json({ submission });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch submission details', error: error.message });
  }
};

// Re-evaluate submission
export const reevaluateSubmission = async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;

    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // TODO: Implement re-evaluation logic
    // This would involve re-running the code against test cases

    res.json({ message: 'Re-evaluation queued', submissionId });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to re-evaluate submission', error: error.message });
  }
};

// Delete submission
export const deleteSubmission = async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    const { type = 'practice' } = req.query;

    if (type === 'test') {
      await TestSubmission.findByIdAndDelete(submissionId);
    } else {
      await Submission.findByIdAndDelete(submissionId);
    }

    res.json({ message: 'Submission deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete submission', error: error.message });
  }
};

// Get submission statistics
export const getSubmissionStats = async (req: Request, res: Response) => {
  try {
    const practiceTotal = await Submission.countDocuments();
    const practiceAccepted = await Submission.countDocuments({ status: 'Accepted' });
    
    const testTotal = await TestSubmission.countDocuments();
    const testHighScore = await TestSubmission.find().sort({ percentage: -1 }).limit(1);

    res.json({
      practice: {
        total: practiceTotal,
        accepted: practiceAccepted,
        acceptanceRate: practiceTotal > 0 ? ((practiceAccepted / practiceTotal) * 100).toFixed(1) : 0
      },
      test: {
        total: testTotal,
        highestScore: testHighScore[0]?.percentage || 0
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch statistics', error: error.message });
  }
};
