import mongoose, { Document, Schema } from 'mongoose';

export interface IAdminSettings extends Document {
  // Theme
  theme: {
    primaryColor: string;
    accentColor: string;
    neonGlowIntensity: number;
  };
  
  // AI Settings
  aiSettings: {
    temperature: number;
    model: string;
    maxTokens: number;
    questionGenerationPrompt: string;
  };
  
  // Test Settings
  testSettings: {
    defaultHiddenTestCases: number;
    defaultDuration: number;
    defaultPassingScore: number;
    allowMultipleAttempts: boolean;
  };
  
  // Scoring
  scoringRules: {
    hintPenalty: number;
    timeBonusEnabled: boolean;
    partialCreditEnabled: boolean;
    negativeMarking: boolean;
    negativeMarkingValue: number;
  };
  
  // Plagiarism
  plagiarismSettings: {
    threshold: number;
    autoFlagEnabled: boolean;
    comparisonDepth: 'basic' | 'moderate' | 'deep';
    externalCheckEnabled: boolean;
  };
  
  // Proctoring
  proctoringSettings: {
    requireByDefault: boolean;
    faceDetectionInterval: number; // seconds
    soundDetectionSensitivity: number;
    maxTabSwitches: number;
    recordingQuality: 'low' | 'medium' | 'high';
  };
  
  // Website
  website: {
    footerLinks: Array<{
      label: string;
      url: string;
    }>;
    maintenanceMode: boolean;
    announcementBanner?: string;
  };
  
  // Security
  security: {
    maxLoginAttempts: number;
    lockoutDuration: number; // minutes
    sessionTimeout: number; // minutes
    ipWhitelist: string[];
    twoFactorRequired: boolean;
  };
  
  updatedBy: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const adminSettingsSchema = new Schema<IAdminSettings>({
  theme: {
    primaryColor: { type: String, default: '#00ff00' },
    accentColor: { type: String, default: '#00ffff' },
    neonGlowIntensity: { type: Number, default: 0.8 }
  },
  
  aiSettings: {
    temperature: { type: Number, default: 0.7 },
    model: { type: String, default: 'gpt-4' },
    maxTokens: { type: Number, default: 2000 },
    questionGenerationPrompt: { type: String, default: 'Generate a Java coding question...' }
  },
  
  testSettings: {
    defaultHiddenTestCases: { type: Number, default: 8 },
    defaultDuration: { type: Number, default: 120 },
    defaultPassingScore: { type: Number, default: 60 },
    allowMultipleAttempts: { type: Boolean, default: false }
  },
  
  scoringRules: {
    hintPenalty: { type: Number, default: 5 },
    timeBonusEnabled: { type: Boolean, default: true },
    partialCreditEnabled: { type: Boolean, default: true },
    negativeMarking: { type: Boolean, default: false },
    negativeMarkingValue: { type: Number, default: 25 }
  },
  
  plagiarismSettings: {
    threshold: { type: Number, default: 70 },
    autoFlagEnabled: { type: Boolean, default: true },
    comparisonDepth: { type: String, enum: ['basic', 'moderate', 'deep'], default: 'moderate' },
    externalCheckEnabled: { type: Boolean, default: false }
  },
  
  proctoringSettings: {
    requireByDefault: { type: Boolean, default: false },
    faceDetectionInterval: { type: Number, default: 30 },
    soundDetectionSensitivity: { type: Number, default: 0.5 },
    maxTabSwitches: { type: Number, default: 3 },
    recordingQuality: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
  },
  
  website: {
    footerLinks: [{
      label: String,
      url: String
    }],
    maintenanceMode: { type: Boolean, default: false },
    announcementBanner: String
  },
  
  security: {
    maxLoginAttempts: { type: Number, default: 5 },
    lockoutDuration: { type: Number, default: 30 },
    sessionTimeout: { type: Number, default: 480 },
    ipWhitelist: [String],
    twoFactorRequired: { type: Boolean, default: false }
  },
  
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IAdminSettings>('AdminSettings', adminSettingsSchema);
