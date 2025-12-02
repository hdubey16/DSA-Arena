import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  dayId: number;
  questionIndex: number;
  completed: boolean;
  code: string;
  lastAttempt: Date;
  attempts: number;
  testsPassed: number;
  totalTests: number;
  lockedUntil?: Date;
  unlockedByAdmin?: boolean;
}

const userProgressSchema = new Schema<IUserProgress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dayId: { type: Number, required: true },
  questionIndex: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  code: { type: String, default: '' },
  lastAttempt: { type: Date, default: Date.now },
  attempts: { type: Number, default: 0 },
  testsPassed: { type: Number, default: 0 },
  totalTests: { type: Number, default: 0 },
  lockedUntil: Date,
  unlockedByAdmin: { type: Boolean, default: false }
});

// Create compound index for efficient queries
userProgressSchema.index({ userId: 1, dayId: 1, questionIndex: 1 }, { unique: true });

export default mongoose.model<IUserProgress>('UserProgress', userProgressSchema);
