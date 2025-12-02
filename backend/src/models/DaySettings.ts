import mongoose, { Document, Schema } from 'mongoose';

export interface IDaySettings extends Document {
  dayId: number;
  title: string;
  topic: string;
  week: number;
  isLocked: boolean;
  unlockDate?: Date;
  prerequisites: number[]; // Array of day IDs that must be completed
  questionsPerDay: number;
  minQuestionsToUnlock: number; // Minimum questions to complete to unlock next day
  timeLimit?: number; // in minutes
  allowedAttempts?: number;
  passingScore?: number;
  customSettings: {
    allowHints: boolean;
    allowReset: boolean;
    showSolutions: boolean;
    solutionUnlockAfter?: number; // hours
  };
}

const daySettingsSchema = new Schema<IDaySettings>({
  dayId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  topic: { type: String, required: true },
  week: { type: Number, required: true },
  isLocked: { type: Boolean, default: false },
  unlockDate: Date,
  prerequisites: [{ type: Number }],
  questionsPerDay: { type: Number, default: 5 },
  minQuestionsToUnlock: { type: Number, default: 3 }, // Default: 3 questions to unlock next day
  timeLimit: Number,
  allowedAttempts: Number,
  passingScore: Number,
  customSettings: {
    allowHints: { type: Boolean, default: true },
    allowReset: { type: Boolean, default: true },
    showSolutions: { type: Boolean, default: true },
    solutionUnlockAfter: Number
  }
});

export default mongoose.model<IDaySettings>('DaySettings', daySettingsSchema);
