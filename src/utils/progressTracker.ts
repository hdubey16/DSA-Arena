// Progress tracking utilities
import { userAPI } from '@/lib/api';

const PROGRESS_KEY = 'javaprep_progress';
const PROGRESS_SYNCED_KEY = 'javaprep_progress_synced';

export interface QuestionProgress {
  dayId: number;
  questionIndex: number;
  completed: boolean;
  code: string;
  timestamp: number;
}

export interface DayProgress {
  dayId: number;
  questionsCompleted: number[];
  allCompleted: boolean;
}

export const getProgress = (): QuestionProgress[] => {
  const stored = localStorage.getItem(PROGRESS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveQuestionProgress = (dayId: number, questionIndex: number, code: string, completed: boolean) => {
  const progress = getProgress();
  const existingIndex = progress.findIndex(
    p => p.dayId === dayId && p.questionIndex === questionIndex
  );

  const newProgress: QuestionProgress = {
    dayId,
    questionIndex,
    completed,
    code,
    timestamp: Date.now(),
  };

  if (existingIndex >= 0) {
    progress[existingIndex] = newProgress;
  } else {
    progress.push(newProgress);
  }

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  
  // Update streak when a question is completed
  if (completed) {
    updateStreak();
  }
};

export const getDayProgress = (dayId: number): DayProgress => {
  const progress = getProgress();
  const dayProgress = progress.filter(p => p.dayId === dayId && p.completed);
  const questionsCompleted = dayProgress.map(p => p.questionIndex);
  
  return {
    dayId,
    questionsCompleted,
    allCompleted: questionsCompleted.length >= 5,
  };
};

export const isQuestionCompleted = (dayId: number, questionIndex: number): boolean => {
  const progress = getProgress();
  return progress.some(p => p.dayId === dayId && p.questionIndex === questionIndex && p.completed);
};

export const getSavedCode = (dayId: number, questionIndex: number): string | null => {
  const progress = getProgress();
  const saved = progress.find(p => p.dayId === dayId && p.questionIndex === questionIndex);
  return saved?.code || null;
};

export const isDayUnlocked = (dayId: number): boolean => {
  // Get user's unlocked days from localStorage (set during login)
  const userDataStr = localStorage.getItem('user');
  if (!userDataStr) {
    // If not logged in, only Day 1 is unlocked
    return dayId === 1;
  }

  try {
    const userData = JSON.parse(userDataStr);
    const unlockedDays = userData.unlockedDays || [1];
    
    // Day is unlocked if it's in the user's unlockedDays array
    return unlockedDays.includes(dayId);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return dayId === 1; // Fallback to only Day 1
  }
};

export const getCompletionStats = () => {
  const progress = getProgress();
  const completedQuestions = progress.filter(p => p.completed).length;
  const totalQuestions = 112 * 5; // 112 days × 5 questions
  const completedDays = Array.from({ length: 112 }, (_, i) => getDayProgress(i + 1))
    .filter(d => d.allCompleted).length;
  
  return {
    completedQuestions,
    totalQuestions,
    completedDays,
    totalDays: 112,
    percentage: Math.round((completedQuestions / totalQuestions) * 100),
  };
};

// Streak management functions
const STREAK_KEY = 'streakCount';
const LAST_ACTIVITY_KEY = 'lastActivityDate';

export const updateStreak = () => {
  const today = new Date().toDateString();
  const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
  
  if (!lastActivity) {
    // First activity
    localStorage.setItem(STREAK_KEY, '1');
    localStorage.setItem(LAST_ACTIVITY_KEY, today);
    return 1;
  }
  
  const lastDate = new Date(lastActivity);
  const todayDate = new Date(today);
  const diffTime = todayDate.getTime() - lastDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    // Same day - no change
    return parseInt(localStorage.getItem(STREAK_KEY) || '1');
  } else if (diffDays === 1) {
    // Consecutive day - increment streak
    const currentStreak = parseInt(localStorage.getItem(STREAK_KEY) || '0');
    const newStreak = currentStreak + 1;
    localStorage.setItem(STREAK_KEY, String(newStreak));
    localStorage.setItem(LAST_ACTIVITY_KEY, today);
    return newStreak;
  } else {
    // Streak broken - reset to 1
    localStorage.setItem(STREAK_KEY, '1');
    localStorage.setItem(LAST_ACTIVITY_KEY, today);
    return 1;
  }
};

export const getStreak = (): number => {
  const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
  const streakCount = parseInt(localStorage.getItem(STREAK_KEY) || '0');
  
  if (!lastActivity) return 0;
  
  const lastDate = new Date(lastActivity);
  const today = new Date();
  const diffTime = today.getTime() - lastDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // If last activity was today or yesterday, streak is still valid
  if (diffDays <= 1) {
    return streakCount;
  }
  
  // Streak broken - return 0
  return 0;
};

// Sync progress from backend to localStorage
export const syncProgressFromBackend = async () => {
  try {
    const response = await userAPI.getProgress();
    const backendProgress = response.data.progress;
    
    if (!backendProgress) return;
    
    // Convert backend format to localStorage format
    const localProgress: QuestionProgress[] = [];
    
    Object.values(backendProgress).forEach((dayData: any) => {
      dayData.questions.forEach((q: any) => {
        localProgress.push({
          dayId: dayData.dayId,
          questionIndex: q.questionIndex,
          completed: q.completed,
          code: q.code || '',
          timestamp: new Date(q.lastAttempt).getTime()
        });
      });
    });
    
    // Merge with existing localStorage data (keep the most recent)
    const existingProgress = getProgress();
    const mergedProgress = [...localProgress];
    
    existingProgress.forEach(existing => {
      const backendMatch = mergedProgress.find(
        p => p.dayId === existing.dayId && p.questionIndex === existing.questionIndex
      );
      
      if (!backendMatch) {
        mergedProgress.push(existing);
      } else if (existing.timestamp > backendMatch.timestamp) {
        // Local is newer, replace backend data
        const index = mergedProgress.indexOf(backendMatch);
        mergedProgress[index] = existing;
      }
    });
    
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(mergedProgress));
    localStorage.setItem(PROGRESS_SYNCED_KEY, new Date().toISOString());
    
    console.log('Progress synced from backend:', mergedProgress.length, 'records');
    return mergedProgress;
  } catch (error) {
    console.error('Failed to sync progress from backend:', error);
    return getProgress(); // Return local progress as fallback
  }
};
