import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  topicId: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'practice' | 'test';
  isCompulsory: boolean;
  points: number;
  timeLimit: number;
  starterCode: string;
  solution: string;
  examples: Array<{
    input: string;
    output: string;
  }>;
  testCases: Array<{
    input: string;
    expectedOutput: string;
    isHidden: boolean;
    points: number;
  }>;
  hints: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>({
  topicId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  type: { type: String, enum: ['practice', 'test'], default: 'practice' },
  isCompulsory: { type: Boolean, default: false },
  points: { type: Number, required: true },
  timeLimit: { type: Number, required: true },
  starterCode: { type: String, required: true },
  solution: { type: String, required: true },
  examples: [{
    input: String,
    output: String
  }],
  testCases: [{
    input: String,
    expectedOutput: String,
    isHidden: Boolean,
    points: Number
  }],
  hints: [String],
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IQuestion>('Question', questionSchema);
