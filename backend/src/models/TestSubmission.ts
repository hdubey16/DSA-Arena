import mongoose, { Document, Schema } from 'mongoose';

export interface ITestSubmission extends Document {
  testId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  attemptNumber: number;
  
  // Submission data
  answers: Array<{
    questionId: string;
    code: string;
    submittedAt: Date;
    executionTime: number;
    memoryUsed: number;
    status: string;
    testsPassed: number;
    totalTests: number;
    score: number;
  }>;
  
  // Scores
  totalScore: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  
  // Timing
  startedAt: Date;
  submittedAt: Date;
  timeSpent: number; // in seconds
  
  // Proctoring data
  proctoringData?: {
    webcamRecordings: string[]; // S3 URLs
    screenRecordings: string[]; // S3 URLs
    faceDetectionLogs: Array<{
      timestamp: Date;
      faceDetected: boolean;
      confidence: number;
      multipleFaces: boolean;
    }>;
    soundDetectionLogs: Array<{
      timestamp: Date;
      soundDetected: boolean;
      volume: number;
    }>;
    activityLogs: Array<{
      timestamp: Date;
      type: 'tab_switch' | 'copy' | 'paste' | 'devtools' | 'context_menu' | 'minimize' | 'blur';
      details: string;
    }>;
    ipAddresses: string[];
    deviceFingerprint: string;
  };
  
  // Plagiarism
  plagiarismScore: number;
  plagiarismFlags: Array<{
    type: 'code_similarity' | 'ast_similarity' | 'pattern_match' | 'external_source';
    score: number;
    comparedWith?: mongoose.Types.ObjectId;
    details: string;
    flaggedAt: Date;
  }>;
  
  // Suspicious behavior
  suspiciousActivities: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    timestamp: Date;
    autoFlagged: boolean;
  }>;
  
  // Review
  reviewStatus: 'pending' | 'reviewed' | 'flagged' | 'cleared';
  reviewNotes?: string;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

const testSubmissionSchema = new Schema<ITestSubmission>({
  testId: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  attemptNumber: { type: Number, default: 1 },
  
  answers: [{
    questionId: String,
    code: String,
    submittedAt: Date,
    executionTime: Number,
    memoryUsed: Number,
    status: String,
    testsPassed: Number,
    totalTests: Number,
    score: Number
  }],
  
  totalScore: { type: Number, default: 0 },
  maxScore: { type: Number, required: true },
  percentage: { type: Number, default: 0 },
  passed: { type: Boolean, default: false },
  
  startedAt: { type: Date, required: true },
  submittedAt: Date,
  timeSpent: { type: Number, default: 0 },
  
  proctoringData: {
    webcamRecordings: [String],
    screenRecordings: [String],
    faceDetectionLogs: [{
      timestamp: Date,
      faceDetected: Boolean,
      confidence: Number,
      multipleFaces: Boolean
    }],
    soundDetectionLogs: [{
      timestamp: Date,
      soundDetected: Boolean,
      volume: Number
    }],
    activityLogs: [{
      timestamp: Date,
      type: {
        type: String,
        enum: ['tab_switch', 'copy', 'paste', 'devtools', 'context_menu', 'minimize', 'blur']
      },
      details: String
    }],
    ipAddresses: [String],
    deviceFingerprint: String
  },
  
  plagiarismScore: { type: Number, default: 0 },
  plagiarismFlags: [{
    type: {
      type: String,
      enum: ['code_similarity', 'ast_similarity', 'pattern_match', 'external_source']
    },
    score: Number,
    comparedWith: { type: Schema.Types.ObjectId, ref: 'User' },
    details: String,
    flaggedAt: Date
  }],
  
  suspiciousActivities: [{
    type: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    description: String,
    timestamp: Date,
    autoFlagged: Boolean
  }],
  
  reviewStatus: {
    type: String,
    enum: ['pending', 'reviewed', 'flagged', 'cleared'],
    default: 'pending'
  },
  reviewNotes: String,
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: Date
}, {
  timestamps: true
});

// Create indexes
testSubmissionSchema.index({ testId: 1, userId: 1, attemptNumber: 1 }, { unique: true });
testSubmissionSchema.index({ plagiarismScore: -1 });
testSubmissionSchema.index({ reviewStatus: 1 });

export default mongoose.model<ITestSubmission>('TestSubmission', testSubmissionSchema);
