import { getDay } from "@/data/course";
import { seedItemsFromDay } from "./srs";

const STORAGE_KEY = "learnin-japan-course-v2";

export interface DayCompletion {
  day: number;
  completedAt: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
}

export interface CourseProgress {
  currentDay: number;
  completedDays: Record<number, DayCompletion>;
  streakDays: number;
  lastActivityDate: string;
}

function defaultProgress(): CourseProgress {
  return {
    currentDay: 1,
    completedDays: {},
    streakDays: 0,
    lastActivityDate: "",
  };
}

export function getCourseProgress(): CourseProgress {
  if (typeof window === "undefined") return defaultProgress();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultProgress();
  try {
    return JSON.parse(raw);
  } catch {
    return defaultProgress();
  }
}

function saveProgress(data: CourseProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage quota exceeded — progress won't persist
  }
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function updateStreak(progress: CourseProgress) {
  const today = todayStr();
  if (progress.lastActivityDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  if (progress.lastActivityDate === yesterdayStr) {
    progress.streakDays += 1;
  } else if (progress.lastActivityDate !== today) {
    progress.streakDays = 1;
  }
  progress.lastActivityDate = today;
}

export function isDayUnlocked(day: number): boolean {
  const progress = getCourseProgress();
  return day <= progress.currentDay;
}

export function isDayCompleted(day: number): boolean {
  const progress = getCourseProgress();
  return day in progress.completedDays;
}

export function completeDay(completion: DayCompletion) {
  const progress = getCourseProgress();

  // Skip if already completed with same or better score (dedup)
  const existing = progress.completedDays[completion.day];
  if (existing && existing.score >= completion.score) return;

  progress.completedDays[completion.day] = completion;

  const passingScore = completion.totalQuestions > 0
    ? (completion.correctAnswers / completion.totalQuestions) >= 0.6
    : true;

  if (passingScore && completion.day >= progress.currentDay) {
    progress.currentDay = completion.day + 1;
  }

  updateStreak(progress);
  saveProgress(progress);

  // Seed SRS items from this day's lesson content
  const dayDef = getDay(completion.day);
  if (dayDef) {
    seedItemsFromDay(dayDef);
  }
}

export function getDayCompletion(day: number): DayCompletion | undefined {
  return getCourseProgress().completedDays[day];
}

export function getCompletedDayCount(): number {
  return Object.keys(getCourseProgress().completedDays).length;
}

export function getCurrentDay(): number {
  return getCourseProgress().currentDay;
}

export function getStreak(): number {
  const progress = getCourseProgress();
  // Check if streak is still active
  const today = todayStr();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  if (progress.lastActivityDate !== today && progress.lastActivityDate !== yesterdayStr) {
    return 0;
  }
  return progress.streakDays;
}

export function getHistory(): DayCompletion[] {
  const progress = getCourseProgress();
  return Object.values(progress.completedDays).sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );
}

export function getActivityDates(): Set<string> {
  const progress = getCourseProgress();
  const dates = new Set<string>();
  for (const completion of Object.values(progress.completedDays)) {
    dates.add(completion.completedAt.slice(0, 10));
  }
  return dates;
}

export function resetCourseProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
