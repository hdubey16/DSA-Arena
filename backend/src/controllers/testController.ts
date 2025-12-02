import { Request, Response } from 'express';
import Test from '../models/Test';
import Question from '../models/Question';
import SecurityLog from '../models/SecurityLog';

// Create new test with questions from practice pool
export const createTest = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      topics, // Array of day numbers (e.g., [1, 2, 3])
      questionsPerTopic,
      difficultyDistribution, // { easy: 2, medium: 2, hard: 1 }
      duration,
      startTime,
      endTime,
      settings,
      hiddenTestCases,
      testCaseCount
    } = req.body;

    // Validate input
    if (!title || !topics || topics.length === 0) {
      return res.status(400).json({ message: 'Title and topics are required' });
    }

    // Fetch questions from practice pool based on topics and difficulty
    const selectedQuestions: any[] = [];
    
    for (const topicId of topics) {
      const topicQuestions = {
        easy: [] as any[],
        medium: [] as any[],
        hard: [] as any[]
      };

      // Convert day number to topicId format (e.g., 1 -> 'day-1')
      const formattedTopicId = `day-${topicId}`;

      // Fetch questions for this topic by difficulty
      const easyQuestions = await Question.find({ 
        topicId: formattedTopicId, 
        difficulty: 'Easy',
        type: 'practice'
      });
      
      const mediumQuestions = await Question.find({ 
        topicId: formattedTopicId, 
        difficulty: 'Medium',
        type: 'practice'
      });
      
      const hardQuestions = await Question.find({ 
        topicId: formattedTopicId, 
        difficulty: 'Hard',
        type: 'practice'
      });

      topicQuestions.easy = easyQuestions;
      topicQuestions.medium = mediumQuestions;
      topicQuestions.hard = hardQuestions;

      // Select random questions based on difficulty distribution
      const selectRandomQuestions = (questions: any[], count: number) => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, questions.length));
      };

      if (difficultyDistribution) {
        selectedQuestions.push(
          ...selectRandomQuestions(topicQuestions.easy, difficultyDistribution.easy || 0),
          ...selectRandomQuestions(topicQuestions.medium, difficultyDistribution.medium || 0),
          ...selectRandomQuestions(topicQuestions.hard, difficultyDistribution.hard || 0)
        );
      } else {
        // Default: select questionsPerTopic random questions
        const allTopicQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
        selectedQuestions.push(...selectRandomQuestions(allTopicQuestions, questionsPerTopic || 5));
      }
    }

    if (selectedQuestions.length === 0) {
      return res.status(400).json({ 
        message: 'No questions found for selected topics',
        topics,
        hint: 'Make sure the topics have practice questions available'
      });
    }

    // Create test with selected questions
    const test = new Test({
      title,
      description: description || `Test for Days ${topics.join(', ')}`,
      createdBy: (req as any).user.id,
      topics,
      questionsPerTopic: questionsPerTopic || 5,
      difficultyDistribution: difficultyDistribution || { easy: 2, medium: 2, hard: 1 },
      duration: duration || 60,
      startTime: startTime || new Date(),
      endTime: endTime || new Date(Date.now() + (duration || 60) * 60 * 1000),
      status: 'draft',
      questions: selectedQuestions.map(q => q._id),
      hiddenTestCases: hiddenTestCases !== undefined ? hiddenTestCases : true,
      testCaseCount: testCaseCount || 5,
    });

    await test.save();

    // Log admin action
    await SecurityLog.create({
      userId: (req as any).user.id,
      type: 'admin_action',
      action: 'test_created',
      details: { 
        testId: test._id, 
        title: test.title,
        questionsCount: selectedQuestions.length,
        topics
      },
      ipAddress: req.ip || '',
      userAgent: req.get('user-agent') || '',
      severity: 'info'
    });

    res.status(201).json({ 
      message: 'Test created successfully', 
      test,
      questionsCount: selectedQuestions.length 
    });
  } catch (error: any) {
    console.error('Error creating test:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      message: 'Failed to create test', 
      error: error.message,
      details: error.toString()
    });
  }
};

// Get all tests
export const getAllTests = async (req: Request, res: Response) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query: any = {};
    if (status) query.status = status;

    const tests = await Test.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Test.countDocuments(query);

    res.json({
      tests,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch tests', error: error.message });
  }
};

// Get test by ID
export const getTestById = async (req: Request, res: Response) => {
  try {
    const test = await Test.findById(req.params.testId)
      .populate('createdBy', 'name email')
      .populate('goLiveBy', 'name email');

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.json({ test });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch test', error: error.message });
  }
};

// Update test
export const updateTest = async (req: Request, res: Response) => {
  try {
    const test = await Test.findByIdAndUpdate(
      req.params.testId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Log admin action
    await SecurityLog.create({
      userId: (req as any).user.id,
      type: 'admin_action',
      action: 'test_updated',
      details: { testId: test._id, updates: Object.keys(req.body) },
      ipAddress: req.ip || '',
      userAgent: req.get('user-agent') || '',
      severity: 'info'
    });

    res.json({ message: 'Test updated successfully', test });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update test', error: error.message });
  }
};

// Delete test
export const deleteTest = async (req: Request, res: Response) => {
  try {
    const test = await Test.findById(req.params.testId);

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Don't allow deletion of live tests
    if (test.status === 'live') {
      return res.status(400).json({ message: 'Cannot delete live test' });
    }

    await Test.findByIdAndDelete(req.params.testId);

    // Log admin action
    await SecurityLog.create({
      userId: (req as any).user.id,
      type: 'admin_action',
      action: 'test_deleted',
      details: { testId: test._id, title: test.title },
      ipAddress: req.ip || '',
      userAgent: req.get('user-agent') || '',
      severity: 'warning'
    });

    res.json({ message: 'Test deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete test', error: error.message });
  }
};

// GO LIVE - Make test accessible to students
export const goLiveTest = async (req: Request, res: Response) => {
  try {
    const test = await Test.findById(req.params.testId);

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    if (test.status === 'live') {
      return res.status(400).json({ message: 'Test is already live' });
    }

    // Validate test is ready to go live
    if (!test.topics || test.topics.length === 0) {
      return res.status(400).json({ message: 'Test must have at least one topic' });
    }

    if (new Date() < test.startTime) {
      return res.status(400).json({ message: 'Test start time has not arrived yet' });
    }

    test.status = 'live';
    test.goLiveAt = new Date();
    test.goLiveBy = (req as any).user.id;
    await test.save();

    // Log admin action
    await SecurityLog.create({
      userId: (req as any).user.id,
      type: 'admin_action',
      action: 'test_go_live',
      details: { testId: test._id, title: test.title },
      ipAddress: req.ip || '',
      userAgent: req.get('user-agent') || '',
      severity: 'info'
    });

    res.json({ message: 'Test is now LIVE! Students can access it.', test });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to make test live', error: error.message });
  }
};

// End test
export const endTest = async (req: Request, res: Response) => {
  try {
    const test = await Test.findById(req.params.testId);

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    if (test.status !== 'live') {
      return res.status(400).json({ message: 'Only live tests can be ended' });
    }

    test.status = 'completed';
    await test.save();

    // Log admin action
    await SecurityLog.create({
      userId: (req as any).user.id,
      type: 'admin_action',
      action: 'test_ended',
      details: { testId: test._id, title: test.title },
      ipAddress: req.ip || '',
      userAgent: req.get('user-agent') || '',
      severity: 'info'
    });

    res.json({ message: 'Test ended successfully', test });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to end test', error: error.message });
  }
};

// Duplicate test
export const duplicateTest = async (req: Request, res: Response) => {
  try {
    const originalTest = await Test.findById(req.params.testId);

    if (!originalTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    const duplicateTest = new Test({
      ...originalTest.toObject(),
      _id: undefined,
      title: `${originalTest.title} (Copy)`,
      status: 'draft',
      createdBy: (req as any).user.id,
      stats: {
        totalParticipants: 0,
        completedAttempts: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        plagiarismAlerts: 0,
        suspiciousActivities: 0
      },
      goLiveAt: undefined,
      goLiveBy: undefined
    });

    await duplicateTest.save();

    res.status(201).json({ message: 'Test duplicated successfully', test: duplicateTest });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to duplicate test', error: error.message });
  }
};

// Get test statistics
export const getTestStatistics = async (req: Request, res: Response) => {
  try {
    const test = await Test.findById(req.params.testId);

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Additional stats can be computed here if needed
    res.json({ stats: test.stats });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch test statistics', error: error.message });
  }
};
