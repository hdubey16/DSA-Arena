import mongoose, { Document, Schema } from 'mongoose';

export interface ITest extends Document {
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  topics: number[]; // Day IDs
  questions: mongoose.Types.ObjectId[]; // Selected question IDs
  questionsPerTopic: number;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  duration: number; // in minutes
  startTime: Date;
  endTime: Date;
  status: 'draft' | 'scheduled' | 'live' | 'completed' | 'archived';
  
  // Proctoring settings
  proctoring: {
    enabled: boolean;
    cameraRequired: boolean;
    screenRecording: boolean;
    faceDetection: boolean;
    soundDetection: boolean;
    tabSwitchLimit: number;
    ipChangeAllowed: boolean;
  };
  
  // Test settings
  settings: {
    allowMultipleAttempts: boolean;
    maxAttempts: number;
    showResults: boolean;
    showSolutions: boolean;
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
    passingScore: number;
    penaltyForHints: number;
  };
  
  // Hidden test cases
  hiddenTestCases: boolean;
  testCaseCount: number;
  
  // Statistics
  stats: {
    totalParticipants: number;
    completedAttempts: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    plagiarismAlerts: number;
    suspiciousActivities: number;
  };
  
  createdAt: Date;
  updatedAt: Date;
  goLiveAt?: Date;
  goLiveBy?: mongoose.Types.ObjectId;
}

const testSchema = new Schema<ITest>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  topics: [{ type: Number, required: true }],
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  questionsPerTopic: { type: Number, default: 5 },
  difficultyDistribution: {
    easy: { type: Number, default: 2 },
    medium: { type: Number, default: 2 },
    hard: { type: Number, default: 1 }
  },
  duration: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['draft', 'scheduled', 'live', 'completed', 'archived'],
    default: 'draft'
  },
  
  proctoring: {
    enabled: { type: Boolean, default: false },
    cameraRequired: { type: Boolean, default: false },
    screenRecording: { type: Boolean, default: false },
    faceDetection: { type: Boolean, default: false },
    soundDetection: { type: Boolean, default: false },
    tabSwitchLimit: { type: Number, default: 3 },
    ipChangeAllowed: { type: Boolean, default: false }
  },
  
  settings: {
    allowMultipleAttempts: { type: Boolean, default: false },
    maxAttempts: { type: Number, default: 1 },
    showResults: { type: Boolean, default: true },
    showSolutions: { type: Boolean, default: false },
    shuffleQuestions: { type: Boolean, default: true },
    shuffleOptions: { type: Boolean, default: true },
    passingScore: { type: Number, default: 60 },
    penaltyForHints: { type: Number, default: 5 }
  },
  
  hiddenTestCases: { type: Boolean, default: true },
  testCaseCount: { type: Number, default: 10 },
  
  stats: {
    totalParticipants: { type: Number, default: 0 },
    completedAttempts: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
    lowestScore: { type: Number, default: 0 },
    plagiarismAlerts: { type: Number, default: 0 },
    suspiciousActivities: { type: Number, default: 0 }
  },
  
  goLiveAt: Date,
  goLiveBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

export default mongoose.model<ITest>('Test', testSchema);
