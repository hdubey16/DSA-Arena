import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'moderator' | 'admin';
  status: 'active' | 'suspended' | 'banned';
  avatar?: string;
  unlockedDays: number[]; // Array of day IDs that user has unlocked
  createdAt: Date;
  lastLogin?: Date;
  sessions: Array<{
    ip: string;
    device: string;
    browser: string;
    loginTime: Date;
    logoutTime?: Date;
  }>;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
  status: { type: String, enum: ['active', 'suspended', 'banned'], default: 'active' },
  avatar: String,
  unlockedDays: [{ type: Number }], // Default empty, Day 1 unlocked on first login
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  sessions: [{
    ip: String,
    device: String,
    browser: String,
    loginTime: Date,
    logoutTime: Date
  }]
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
