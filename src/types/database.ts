export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'moderator' | 'admin';
  status: 'active' | 'suspended' | 'banned';
  avatar?: string;
  progress: {
    topicsCompleted: number[];
    questionsSolved: number[];
    testsTaken: string[];
    suspiciousAttempts: number;
  };
  sessions: UserSession[];
  deviceFingerprints: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  sessionId: string;
  ip: string;
  device: string;
  browser: string;
  loginAt: Date;
  logoutAt?: Date;
  isActive: boolean;
}

export interface Topic {
  _id?: string;
  day: number;
  week: number;
  topic: string;
  compulsoryQuestion: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description?: string;
  locked: boolean;
  aiQuestionsGenerated: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  _id?: string;
  topicId: string;
  day: number;
  questionIndex: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: Array<{ input: string; output: string }>;
  starterCode: string;
  hiddenTestCases: Array<{ input: string; expectedOutput: string }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Test {
  _id?: string;
  name: string;
  description?: string;
  status: 'upcoming' | 'live' | 'closed';
  topics: string[];
  questionCount: number;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  settings: {
    proctoring: boolean;
    cameraVerification: boolean;
    screenRecording: boolean;
    plagiarismCheck: boolean;
    multipleAttempts: boolean;
    hiddenTestCases: number;
  };
  participants: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Submission {
  _id?: string;
  userId: string;
  testId: string;
  questionId: string;
  code: string;
  language: string;
  status: 'passed' | 'failed' | 'partial';
  score: number;
  maxScore: number;
  executionTime: number;
  memoryUsed: number;
  testCaseResults: Array<{
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
  }>;
  plagiarismScore: number;
  suspicious: boolean;
  submittedAt: Date;
}

export interface PlagiarismCase {
  _id?: string;
  user1Id: string;
  user2Id: string;
  testId: string;
  similarityScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  detectionMethod: 'AST' | 'Hash' | 'Similarity' | 'External';
  codeSnippet1: string;
  codeSnippet2: string;
  reviewed: boolean;
  reviewedBy?: string;
  falsePositive: boolean;
  notes?: string;
  detectedAt: Date;
  reviewedAt?: Date;
}

export interface ProctoringSession {
  _id?: string;
  userId: string;
  testId: string;
  status: 'active' | 'completed' | 'terminated' | 'flagged';
  startedAt: Date;
  endedAt?: Date;
  flags: {
    tabSwitches: number;
    faceNotDetected: number;
    multiplePersons: number;
    noiseDetected: number;
    ipChange: boolean;
    devToolsOpened: number;
    clipboardAccess: number;
  };
  recordings: {
    webcam?: string;
    screen?: string;
    audio?: string;
  };
  snapshots: Array<{
    timestamp: Date;
    imageUrl: string;
  }>;
  ipAddresses: string[];
  deviceFingerprint: string;
}

export interface SecurityLog {
  _id?: string;
  type: 'auth' | 'admin' | 'security' | 'cheating';
  severity: 'info' | 'warning' | 'critical';
  userId?: string;
  action: string;
  ip: string;
  device: string;
  browser: string;
  details: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export interface SystemSettings {
  _id?: string;
  ai: {
    temperature: number;
    maxTokens: number;
    modelVersion: string;
  };
  test: {
    defaultHiddenTestCases: number;
    passingScore: number;
    hintPenalty: number;
    allowCompilationErrors: boolean;
    timeLimitPerQuestion: boolean;
  };
  plagiarism: {
    autoFlagThreshold: number;
    enableASTMatching: boolean;
    crossTestComparison: boolean;
  };
  proctoring: {
    requireByDefault: boolean;
    faceDetectionRequired: boolean;
    screenRecording: boolean;
    tabSwitchDetection: boolean;
  };
  system: {
    sessionTimeout: number;
    maxFailedLoginAttempts: number;
    maintenanceMode: boolean;
    emailNotifications: boolean;
  };
  updatedBy: string;
  updatedAt: Date;
}
