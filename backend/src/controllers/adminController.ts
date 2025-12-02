import { Request, Response } from 'express';
import User from '../models/User';
import UserProgress from '../models/UserProgress';
import DaySettings from '../models/DaySettings';

// Get all users with pagination
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string || '';
    const role = req.query.role as string;
    const status = req.query.status as string;

    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) query.role = role;
    if (status) query.status = status;

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      users,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user details with progress
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const progress = await UserProgress.find({ userId });
    const completedDays = [...new Set(progress.filter(p => p.completed).map(p => p.dayId))];
    const totalQuestions = progress.length;
    const completedQuestions = progress.filter(p => p.completed).length;

    res.json({
      user,
      progress,
      stats: {
        completedDays: completedDays.length,
        totalDays: 39,
        completedQuestions,
        totalQuestions: 195,
        percentage: Math.round((completedQuestions / 195) * 100)
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user role
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['user', 'moderator', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    res.json({ message: 'Role updated successfully', user });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user status
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!['active', 'suspended', 'banned'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    ).select('-password');

    res.json({ message: 'Status updated successfully', user });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Unlock/Lock specific question for user
export const toggleQuestionLock = async (req: Request, res: Response) => {
  try {
    const { userId, dayId, questionIndex } = req.params;
    const { unlock } = req.body;

    let progress = await UserProgress.findOne({ userId, dayId: parseInt(dayId), questionIndex: parseInt(questionIndex) });

    if (!progress) {
      progress = new UserProgress({
        userId,
        dayId: parseInt(dayId),
        questionIndex: parseInt(questionIndex),
        unlockedByAdmin: unlock
      });
    } else {
      progress.unlockedByAdmin = unlock;
      if (unlock) {
        progress.lockedUntil = undefined;
      }
    }

    await progress.save();
    res.json({ message: `Question ${unlock ? 'unlocked' : 'locked'} successfully`, progress });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Unlock entire day for user
export const unlockDayForUser = async (req: Request, res: Response) => {
  try {
    const { userId, dayId } = req.params;

    // Unlock all 5 questions for the day
    const updates = [];
    for (let i = 0; i < 5; i++) {
      updates.push(
        UserProgress.findOneAndUpdate(
          { userId, dayId: parseInt(dayId), questionIndex: i },
          { 
            unlockedByAdmin: true,
            lockedUntil: undefined
          },
          { upsert: true, new: true }
        )
      );
    }

    await Promise.all(updates);
    res.json({ message: `Day ${dayId} unlocked for user` });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reset user progress for specific day
export const resetUserProgress = async (req: Request, res: Response) => {
  try {
    const { userId, dayId } = req.params;

    await UserProgress.updateMany(
      { userId, dayId: parseInt(dayId) },
      { 
        completed: false,
        code: '',
        attempts: 0,
        testsPassed: 0,
        totalTests: 0
      }
    );

    res.json({ message: `Progress reset for day ${dayId}` });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all day settings
export const getAllDaySettings = async (req: Request, res: Response) => {
  try {
    const settings = await DaySettings.find().sort({ dayId: 1 });
    res.json({ settings });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update day settings
export const updateDaySettings = async (req: Request, res: Response) => {
  try {
    const { dayId } = req.params;
    const updates = req.body;

    let settings = await DaySettings.findOne({ dayId: parseInt(dayId) });
    
    if (!settings) {
      settings = new DaySettings({ dayId: parseInt(dayId), ...updates });
    } else {
      Object.assign(settings, updates);
    }

    await settings.save();
    res.json({ message: 'Day settings updated', settings });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Bulk unlock days for all users
export const bulkUnlockDays = async (req: Request, res: Response) => {
  try {
    const { dayIds } = req.body; // Array of day IDs

    await DaySettings.updateMany(
      { dayId: { $in: dayIds } },
      { isLocked: false },
      { upsert: true }
    );

    res.json({ message: `${dayIds.length} days unlocked for all users` });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get admin dashboard stats
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const admins = await User.countDocuments({ role: 'admin' });
    
    const allProgress = await UserProgress.find();
    const totalAttempts = allProgress.reduce((sum, p) => sum + p.attempts, 0);
    const completedQuestions = allProgress.filter(p => p.completed).length;

    // Get recent users
    const recentUsers = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get day completion stats
    const dayStats = await UserProgress.aggregate([
      { $match: { completed: true } },
      { $group: { _id: '$dayId', completions: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        admins
      },
      progress: {
        totalAttempts,
        completedQuestions,
        totalQuestions: 195 * totalUsers
      },
      recentUsers,
      dayStats
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId);
    await UserProgress.deleteMany({ userId });

    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
