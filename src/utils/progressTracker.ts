// Progress tracking utilities
const PROGRESS_KEY = 'javaprep_progress';

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
