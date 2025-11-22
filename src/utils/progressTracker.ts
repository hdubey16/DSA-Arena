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
  // Day 1 is always unlocked
  if (dayId === 1) return true;
  
  // Check if previous day is completed
  const previousDay = getDayProgress(dayId - 1);
  return previousDay.allCompleted;
};

export const getCompletionStats = () => {
  const progress = getProgress();
  const completedQuestions = progress.filter(p => p.completed).length;
  const totalQuestions = 39 * 5; // 39 days × 5 questions
  const completedDays = Array.from({ length: 39 }, (_, i) => getDayProgress(i + 1))
    .filter(d => d.allCompleted).length;
  
  return {
    completedQuestions,
    totalQuestions,
    completedDays,
    totalDays: 39,
    percentage: Math.round((completedQuestions / totalQuestions) * 100),
  };
};
