import { Request, Response } from 'express';
import mongoose from 'mongoose';
import JavaCodeExecutor from '../services/codeExecutor';
import Question from '../models/Question';
import Submission from '../models/Submission';
import UserProgress from '../models/UserProgress';
import User from '../models/User';
import DaySettings from '../models/DaySettings';

export const submitCode = async (req: Request, res: Response) => {
  try {
    const { code, questionId, topicId } = req.body;
    const userId = (req as any).user?.id || 'anonymous';

    console.log(`🔍 Submission from userId: ${userId}, questionId: ${questionId}, topicId: ${topicId}`);

    // Validate input
    if (!code || !questionId || !topicId) {
      console.error('Missing required fields:', { code: !!code, questionId, topicId });
      return res.status(400).json({
        error: 'Code, questionId, and topicId are required'
      });
    }

    // Get question with test cases
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Execute code with all test cases
    const executor = new JavaCodeExecutor();
    const executionResult = await executor.executeCode(code, question.testCases);

    // Determine status
    let status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compilation Error' | 'Time Limit Exceeded' = 'Wrong Answer';
    
    if (!executionResult.success) {
      if (executionResult.error?.includes('Compilation')) {
        status = 'Compilation Error';
      } else if (executionResult.error?.includes('Time')) {
        status = 'Time Limit Exceeded';
      } else {
        status = 'Runtime Error';
      }
    } else if (executionResult.allTestsPassed) {
      status = 'Accepted';
    }

    // Calculate beats percentages (simulate based on submission count)
    const similarSubmissions = await Submission.find({
      questionId,
      status: 'Accepted'
    });

    let runtimeBeats = 0;
    let memoryBeats = 0;

    if (status === 'Accepted' && similarSubmissions.length > 0) {
      const fasterCount = similarSubmissions.filter(s => s.runtime < executionResult.totalRuntime).length;
      const lessMemoryCount = similarSubmissions.filter(s => s.memory < executionResult.averageMemory).length;
      
      runtimeBeats = Math.round((fasterCount / similarSubmissions.length) * 100);
      memoryBeats = Math.round((lessMemoryCount / similarSubmissions.length) * 100);
    }

    // Create submission record
    const submission = new Submission({
      userId,
      questionId,
      topicId,
      code,
      language: 'java',
      status,
      totalTestCases: executionResult.totalTests,
      passedTestCases: executionResult.passedTests,
      runtime: executionResult.totalRuntime,
      memory: executionResult.averageMemory,
      runtimeBeats,
      memoryBeats,
      testResults: executionResult.results
    });

    await submission.save();

    // Update UserProgress if question is completed (Accepted)
    if (status === 'Accepted' && userId !== 'anonymous') {
      
      // Convert userId string to ObjectId
      const userObjectId = new mongoose.Types.ObjectId(userId);
      console.log(`📊 Processing progress: userId=${userId} (ObjectId: ${userObjectId}), topicId=${topicId}`);
      
      // Extract day number from topicId (e.g., 'day-1' -> 1 or just 1 -> 1)
      const topicIdStr = String(topicId);
      const dayId = topicIdStr.includes('day-') 
        ? parseInt(topicIdStr.replace('day-', '')) 
        : parseInt(topicIdStr);
      
      console.log(`📊 DayId=${dayId}`);
      
      // Get all questions for this day to find the index of current question
      const allDayQuestions = await Question.find({ topicId: topicIdStr }).sort({ createdAt: 1 });
      const questionIndex = allDayQuestions.findIndex(q => q._id.toString() === questionId.toString());
      
      if (questionIndex === -1) {
        console.error(`Question ${questionId} not found in topic ${topicId}`);
        // Still save submission but don't update progress
      } else {
        console.log(`📊 Question index: ${questionIndex}`);
        
        // Find or create user progress for this specific question
        const updatedProgress = await UserProgress.findOneAndUpdate(
          { userId: userObjectId, dayId, questionIndex },
          { 
            completed: true,
            code,
            lastAttempt: new Date(),
            testsPassed: executionResult.passedTests,
            totalTests: executionResult.totalTests,
            $inc: { attempts: 1 }
          },
          { upsert: true, new: true }
        );
        
        console.log(`✅ Progress updated:`, {
          userId: updatedProgress.userId,
          dayId: updatedProgress.dayId,
          questionIndex: updatedProgress.questionIndex,
          completed: updatedProgress.completed
        });

        // Check if user has completed minimum required questions for this day
        const completedCount = await UserProgress.countDocuments({
          userId: userObjectId,
          dayId,
          completed: true
        });

        // Get day settings to check minQuestionsToUnlock
        const currentDaySettings = await DaySettings.findOne({ dayId });
        const minRequired = currentDaySettings?.minQuestionsToUnlock || 3;

        console.log(`📊 Completed ${completedCount}/${minRequired} required questions for Day ${dayId}`);

        // If user completed minimum required questions, unlock next day
        if (completedCount >= minRequired) {
          const nextDayId = dayId + 1;
          
          // Check if next day exists
          const nextDay = await DaySettings.findOne({ dayId: nextDayId });
          if (nextDay) {
            // Update user's unlocked days (userId is already ObjectId)
            await User.findByIdAndUpdate(
              userObjectId,
              { $addToSet: { unlockedDays: nextDayId } }, // addToSet prevents duplicates
              { new: true }
            );
            
            console.log(`✅ User ${userId} unlocked Day ${nextDayId} by completing ${completedCount} questions on Day ${dayId}`);
          }
        }
      }
    }

    // Cleanup temp files
    executor.cleanup();

    // Send response
    res.json({
      success: status === 'Accepted',
      status,
      submission: {
        id: submission._id,
        status: submission.status,
        totalTestCases: submission.totalTestCases,
        passedTestCases: submission.passedTestCases,
        runtime: submission.runtime,
        memory: submission.memory,
        runtimeBeats: submission.runtimeBeats,
        memoryBeats: submission.memoryBeats,
        testResults: submission.testResults.map(tr => ({
          testCaseId: tr.testCaseId,
          input: tr.input,
          expectedOutput: tr.expectedOutput,
          actualOutput: tr.actualOutput,
          passed: tr.passed,
          error: tr.error,
          runtime: tr.runtime,
          memory: tr.memory
        }))
      },
      error: executionResult.error
    });
  } catch (error: any) {
    console.error('❌ Submission error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      error: 'Failed to process submission',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const runCode = async (req: Request, res: Response) => {
  try {
    const { code, questionId } = req.body;

    if (!code || !questionId) {
      return res.status(400).json({
        error: 'Code and questionId are required'
      });
    }

    // Get question with ONLY visible test cases
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Filter only visible test cases for "Run Code" (not for submission)
    const visibleTestCases = question.testCases.filter((tc: any) => !tc.isHidden);

    // Execute code
    const executor = new JavaCodeExecutor();
    const executionResult = await executor.executeCode(code, visibleTestCases);

    // Cleanup temp files
    executor.cleanup();

    res.json({
      success: executionResult.success,
      allTestsPassed: executionResult.allTestsPassed,
      totalTests: executionResult.totalTests,
      passedTests: executionResult.passedTests,
      failedTests: executionResult.failedTests,
      testResults: executionResult.results.map(r => ({
        input: r.input,
        expectedOutput: r.expectedOutput,
        actualOutput: r.actualOutput,
        passed: r.passed,
        error: r.error
      })),
      totalRuntime: executionResult.totalRuntime,
      averageMemory: executionResult.averageMemory,
      error: executionResult.error
    });
  } catch (error: any) {
    console.error('Code execution error:', error);
    res.status(500).json({
      error: 'Failed to execute code',
      message: error.message
    });
  }
};

export const getSubmissionHistory = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.query;
    const userId = (req as any).user?.id || 'anonymous';

    const query: any = { userId };
    if (questionId) {
      query.questionId = questionId;
    }

    const submissions = await Submission.find(query)
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      submissions: submissions.map(s => ({
        id: s._id,
        status: s.status,
        totalTestCases: s.totalTestCases,
        passedTestCases: s.passedTestCases,
        runtime: s.runtime,
        memory: s.memory,
        runtimeBeats: s.runtimeBeats,
        memoryBeats: s.memoryBeats,
        createdAt: s.createdAt
      }))
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to fetch submission history',
      message: error.message
    });
  }
};

export const getSubmissionDetails = async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;

    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json({
      submission: {
        id: submission._id,
        code: submission.code,
        status: submission.status,
        totalTestCases: submission.totalTestCases,
        passedTestCases: submission.passedTestCases,
        runtime: submission.runtime,
        memory: submission.memory,
        runtimeBeats: submission.runtimeBeats,
        memoryBeats: submission.memoryBeats,
        testResults: submission.testResults,
        createdAt: submission.createdAt
      }
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to fetch submission details',
      message: error.message
    });
  }
};
