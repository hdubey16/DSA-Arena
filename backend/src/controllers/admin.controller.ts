import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Topic from '../models/Topic';
import Question from '../models/Question';
import User from '../models/User';

export const getTopics = async (req: AuthRequest, res: Response) => {
  try {
    const topics = await Topic.find().sort({ week: 1, day: 1 });
    res.json({ topics });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topics' });
  }
};

export const createTopic = async (req: AuthRequest, res: Response) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).json({ topic });
  } catch (error) {
    res.status(500).json({ message: 'Error creating topic' });
  }
};

export const updateTopic = async (req: AuthRequest, res: Response) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ topic });
  } catch (error) {
    res.status(500).json({ message: 'Error updating topic' });
  }
};

export const deleteTopic = async (req: AuthRequest, res: Response) => {
  try {
    await Topic.findByIdAndDelete(req.params.id);
    res.json({ message: 'Topic deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting topic' });
  }
};

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || 'user',
    });
    
    await user.save();
    
    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({ user: userResponse, message: 'User created successfully' });
  } catch (error: any) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: error.message || 'Error creating user' });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTopics = await Topic.countDocuments();
    const totalQuestions = await Question.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });

    res.json({
      stats: {
        totalUsers,
        totalTopics,
        totalQuestions,
        activeUsers
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
};
