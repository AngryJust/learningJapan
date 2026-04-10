const STORAGE_KEY = "learnin-japan-progress";

export interface ProgressData {
  // Maps "section:itemId" to mastery count (correct answers)
  mastery: Record<string, number>;
  // Quiz history
  quizHistory: {
    section: string;
    score: number;
    total: number;
    date: string;
  }[];
}

function getProgress(): ProgressData {
  if (typeof window === "undefined") return { mastery: {}, quizHistory: [] };
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { mastery: {}, quizHistory: [] };
  return JSON.parse(raw);
}

function saveProgress(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function recordCorrect(section: string, itemId: string) {
  const data = getProgress();
  const key = `${section}:${itemId}`;
  data.mastery[key] = (data.mastery[key] || 0) + 1;
  saveProgress(data);
}

export function recordQuiz(section: string, score: number, total: number) {
  const data = getProgress();
  data.quizHistory.push({ section, score, total, date: new Date().toISOString() });
  saveProgress(data);
}

export function getMastery(section: string, itemId: string): number {
  return getProgress().mastery[`${section}:${itemId}`] || 0;
}

export function getSectionProgress(section: string, totalItems: number): number {
  const data = getProgress();
  let learned = 0;
  for (const [key, count] of Object.entries(data.mastery)) {
    if (key.startsWith(`${section}:`) && count >= 3) learned++;
  }
  return totalItems > 0 ? Math.round((learned / totalItems) * 100) : 0;
}

export function getQuizHistory() {
  return getProgress().quizHistory;
}

export function getOverallStats() {
  const data = getProgress();
  const totalItems = Object.keys(data.mastery).length;
  const masteredItems = Object.values(data.mastery).filter((c) => c >= 3).length;
  const totalQuizzes = data.quizHistory.length;
  const avgScore =
    totalQuizzes > 0
      ? Math.round(
          data.quizHistory.reduce((sum, q) => sum + (q.score / q.total) * 100, 0) / totalQuizzes
        )
      : 0;
  return { totalItems, masteredItems, totalQuizzes, avgScore };
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
