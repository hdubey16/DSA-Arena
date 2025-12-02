import { Request, Response } from 'express';
import User from '../models/User';
import Test from '../models/Test';
import TestSubmission from '../models/TestSubmission';
import Submission from '../models/Submission';
import SecurityLog from '../models/SecurityLog';
import UserProgress from '../models/UserProgress';

// Enhanced Dashboard Stats
export const getEnhancedDashboardStats = async (req: Request, res: Response) => {
  try {
    // User statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const suspendedUsers = await User.countDocuments({ status: 'suspended' });
    const bannedUsers = await User.countDocuments({ status: 'banned' });

    // Test statistics
    const totalTests = await Test.countDocuments();
    const activeTests = await Test.countDocuments({ status: 'live' });
    const scheduledTests = await Test.countDocuments({ status: 'scheduled' });
    const completedTests = await Test.countDocuments({ status: 'completed' });

    // Plagiarism alerts
    const plagiarismAlerts = await TestSubmission.countDocuments({
      plagiarismScore: { $gte: 70 }
    });
    const highRiskPlagiarism = await TestSubmission.countDocuments({
      plagiarismScore: { $gte: 85 }
    });

    // Suspicious activities
    const suspiciousActivities = await TestSubmission.countDocuments({
      'suspiciousActivities.0': { $exists: true }
    });
    const criticalActivities = await TestSubmission.countDocuments({
      'suspiciousActivities': {
        $elemMatch: { severity: 'critical' }
      }
    });

    // Practice submission statistics
    const totalPracticeAttempts = await Submission.countDocuments();
    const acceptedSubmissions = await Submission.countDocuments({ status: 'Accepted' });
    const liveSubmissions = await Submission.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 3600000) } // Last hour
    });

    // Admin count
    const adminCount = await User.countDocuments({ role: 'admin' });

    // Topic completion stats
    const topicCompletion = await UserProgress.aggregate([
      { $match: { completed: true } },
      { $group: { 
          _id: '$dayId', 
          completions: { $sum: 1 },
          uniqueUsers: { $addToSet: '$userId' }
        }
      },
      { $project: {
          dayId: '$_id',
          completions: 1,
          uniqueUsers: { $size: '$uniqueUsers' }
        }
      },
      { $sort: { dayId: 1 } }
    ]);

    // Recent submissions (last 10) - combine test and practice submissions
    const recentTestSubmissions = await TestSubmission.find()
      .populate('userId', 'name email')
      .populate('testId', 'title')
      .sort({ createdAt: -1 })
      .limit(10)
      .select('userId testId totalScore percentage submittedAt plagiarismScore suspiciousActivities');

    // Submission trends (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const submissionTrends = await TestSubmission.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
          avgScore: { $avg: '$percentage' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Active test details
    const activeTestDetails = await Test.find({ status: 'live' })
      .select('title startTime endTime stats.totalParticipants stats.plagiarismAlerts')
      .limit(5);

    // Security alerts (last 24 hours)
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    const securityAlerts = await SecurityLog.countDocuments({
      timestamp: { $gte: oneDayAgo },
      severity: { $in: ['error', 'critical'] }
    });

    // Performance metrics
    const avgSubmissionTime = await TestSubmission.aggregate([
      { $match: { submittedAt: { $exists: true } } },
      { $group: {
          _id: null,
          avgTime: { $avg: '$timeSpent' }
        }
      }
    ]);

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        suspended: suspendedUsers,
        banned: bannedUsers
      },
      tests: {
        total: totalTests,
        active: activeTests,
        scheduled: scheduledTests,
        completed: completedTests
      },
      practice: {
        totalAttempts: totalPracticeAttempts,
        accepted: acceptedSubmissions,
        liveSubmissions: liveSubmissions
      },
      admins: {
        total: adminCount
      },
      plagiarism: {
        totalAlerts: plagiarismAlerts,
        highRisk: highRiskPlagiarism
      },
      suspicious: {
        totalActivities: suspiciousActivities,
        critical: criticalActivities
      },
      topicCompletion,
      recentSubmissions: recentTestSubmissions,
      submissionTrends,
      activeTestDetails,
      securityAlerts,
      performance: {
        avgSubmissionTime: avgSubmissionTime[0]?.avgTime || 0
      }
    });
  } catch (error: any) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: error.message });
  }
};

// Get real-time statistics for live monitoring
export const getRealTimeStats = async (req: Request, res: Response) => {
  try {
    const liveTests = await Test.find({ status: 'live' })
      .populate('createdBy', 'name')
      .select('title stats startTime endTime');

    const activeSubmissions = await TestSubmission.countDocuments({
      submittedAt: { $exists: false },
      createdAt: { $gte: new Date(Date.now() - 3600000) } // Last hour
    });

    const recentAlerts = await SecurityLog.find({
      severity: { $in: ['error', 'critical'] },
      timestamp: { $gte: new Date(Date.now() - 300000) } // Last 5 minutes
    })
    .populate('userId', 'name email')
    .sort({ timestamp: -1 })
    .limit(10);

    res.json({
      liveTests,
      activeSubmissions,
      recentAlerts,
      timestamp: new Date()
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch real-time stats', error: error.message });
  }
};

// Get system health metrics
export const getSystemHealth = async (req: Request, res: Response) => {
  try {
    const dbStats = await User.db.db.stats();
    
    const health = {
      database: {
        connected: true,
        collections: dbStats.collections,
        dataSize: (dbStats.dataSize / 1024 / 1024).toFixed(2) + ' MB',
        indexSize: (dbStats.indexSize / 1024 / 1024).toFixed(2) + ' MB'
      },
      api: {
        uptime: process.uptime(),
        memory: {
          used: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB',
          total: (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2) + ' MB'
        }
      },
      timestamp: new Date()
    };

    res.json(health);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch system health', error: error.message });
  }
};
