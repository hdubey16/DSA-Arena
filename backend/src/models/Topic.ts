import mongoose, { Document, Schema } from 'mongoose';

export interface ITopic extends Document {
  id: string;
  title: string;
  description: string;
  week: number;
  day: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number;
  prerequisites: string[];
  compulsoryQuestion: string;
  practiceQuestions: number;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const topicSchema = new Schema<ITopic>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  week: { type: Number, required: true },
  day: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  estimatedTime: { type: Number, required: true },
  prerequisites: [{ type: String }],
  compulsoryQuestion: { type: String, required: true },
  practiceQuestions: { type: Number, default: 5 },
  isLocked: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

topicSchema.index({ week: 1, day: 1 });
topicSchema.index({ id: 1 });

export default mongoose.model<ITopic>('Topic', topicSchema);
