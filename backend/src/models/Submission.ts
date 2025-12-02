import mongoose, { Document, Schema } from 'mongoose';

export interface ISubmission extends Document {
  userId: string;
  questionId: string;
  topicId: string;
  code: string;
  language: string;
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compilation Error' | 'Time Limit Exceeded';
  totalTestCases: number;
  passedTestCases: number;
  runtime: number;
  memory: number;
  runtimeBeats: number; // Percentage of submissions faster
  memoryBeats: number; // Percentage of submissions with less memory
  testResults: Array<{
    testCaseId: string;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
    error?: string;
    runtime: number;
    memory: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const submissionSchema = new Schema<ISubmission>({
  userId: { type: String, required: true, index: true },
  questionId: { type: String, required: true, index: true },
  topicId: { type: String, required: true, index: true },
  code: { type: String, required: true },
  language: { type: String, default: 'java' },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Compilation Error', 'Time Limit Exceeded'],
    required: true
  },
  totalTestCases: { type: Number, required: true },
  passedTestCases: { type: Number, required: true },
  runtime: { type: Number, required: true },
  memory: { type: Number, required: true },
  runtimeBeats: { type: Number, default: 0 },
  memoryBeats: { type: Number, default: 0 },
  testResults: [{
    testCaseId: String,
    input: String,
    expectedOutput: String,
    actualOutput: String,
    passed: Boolean,
    error: String,
    runtime: Number,
    memory: Number
  }],
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<ISubmission>('Submission', submissionSchema);
