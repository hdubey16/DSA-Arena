import mongoose, { Document, Schema } from 'mongoose';

export interface ITopicVersion extends Document {
  dayId: number;
  version: number;
  title: string;
  topic: string;
  week: number;
  
  // Questions
  compulsoryQuestion: {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    starterCode: string;
    solution: string;
    examples: Array<{
      input: string;
      output: string;
      explanation?: string;
    }>;
    testCases: Array<{
      input: string;
      expectedOutput: string;
      isHidden: boolean;
      points: number;
    }>;
  };
  
  practiceQuestions: Array<{
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    starterCode: string;
    solution: string;
    examples: Array<{
      input: string;
      output: string;
      explanation?: string;
    }>;
    testCases: Array<{
      input: string;
      expectedOutput: string;
      isHidden: boolean;
      points: number;
    }>;
    aiGenerated: boolean;
    generatedAt?: Date;
  }>;
  
  // Metadata
  isLocked: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  isActive: boolean;
  
  // Stats
  testCaseCoverage: {
    totalCases: number;
    hiddenCases: number;
    visibleCases: number;
    coveragePercentage: number;
  };
}

const topicVersionSchema = new Schema<ITopicVersion>({
  dayId: { type: Number, required: true },
  version: { type: Number, required: true },
  title: { type: String, required: true },
  topic: { type: String, required: true },
  week: { type: Number, required: true },
  
  compulsoryQuestion: {
    id: String,
    title: String,
    description: String,
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    starterCode: String,
    solution: String,
    examples: [{
      input: String,
      output: String,
      explanation: String
    }],
    testCases: [{
      input: String,
      expectedOutput: String,
      isHidden: Boolean,
      points: Number
    }]
  },
  
  practiceQuestions: [{
    id: String,
    title: String,
    description: String,
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    starterCode: String,
    solution: String,
    examples: [{
      input: String,
      output: String,
      explanation: String
    }],
    testCases: [{
      input: String,
      expectedOutput: String,
      isHidden: Boolean,
      points: Number
    }],
    aiGenerated: Boolean,
    generatedAt: Date
  }],
  
  isLocked: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  
  testCaseCoverage: {
    totalCases: Number,
    hiddenCases: Number,
    visibleCases: Number,
    coveragePercentage: Number
  }
});

// Compound index for versioning
topicVersionSchema.index({ dayId: 1, version: -1 });
topicVersionSchema.index({ dayId: 1, isActive: 1 });

export default mongoose.model<ITopicVersion>('TopicVersion', topicVersionSchema);
