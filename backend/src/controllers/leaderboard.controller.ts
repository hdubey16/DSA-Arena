import { Request, Response } from 'express';
import Submission from '../models/Submission';
import User from '../models/User';

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    // Get all users
    const users = await User.find({ role: 'user' }).select('_id name email avatar');
    
    // Calculate stats for each user
    const leaderboardData = await Promise.all(
      users.map(async (user) => {
        const userId = user._id.toString();
        
        // Get all accepted submissions for this user
        const acceptedSubmissions = await Submission.find({
          userId,
          status: 'Accepted'
        });

        // Get unique questions solved
        const uniqueQuestions = new Set(acceptedSubmissions.map(s => s.questionId));
        const questionsSolved = uniqueQuestions.size;

        // Calculate average runtime and memory
        let totalRuntime = 0;
        let totalMemory = 0;
        let submissionCount = acceptedSubmissions.length;

        acceptedSubmissions.forEach(submission => {
          totalRuntime += submission.runtime || 0;
          totalMemory += submission.memory || 0;
        });

        const avgRuntime = submissionCount > 0 ? Math.round(totalRuntime / submissionCount) : 0;
        const avgMemory = submissionCount > 0 ? Math.round(totalMemory / submissionCount) : 0;

        return {
          userId: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          questionsSolved,
          totalSubmissions: submissionCount,
          avgRuntime,
          avgMemory
        };
      })
    );

    // Sort by questions solved (primary), then by average runtime (secondary - lower is better)
    leaderboardData.sort((a, b) => {
      // First, sort by questions solved (descending)
      if (b.questionsSolved !== a.questionsSolved) {
        return b.questionsSolved - a.questionsSolved;
      }
      // If same questions solved, sort by runtime (ascending - faster is better)
      if (a.avgRuntime !== b.avgRuntime) {
        return a.avgRuntime - b.avgRuntime;
      }
      // If still tied, sort by memory (ascending - less is better)
      return a.avgMemory - b.avgMemory;
    });

    // Add ranks
    const rankedData = leaderboardData.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    res.json({
      success: true,
      leaderboard: rankedData
    });
  } catch (error: any) {
    console.error('Leaderboard error:', error);
    res.status(500).json({
      error: 'Failed to fetch leaderboard',
      message: error.message
    });
  }
};
