"use client";

import { useState, useCallback, useSyncExternalStore, startTransition } from "react";
import { fetchProgress } from "./api";

export interface CourseProgressData {
  currentDay: number;
  completedDays: Record<number, {
    day: number;
    completedAt: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
  }>;
  streakDays: number;
  lastActivityDate: string;
}

const DEFAULT: CourseProgressData = {
  currentDay: 1,
  completedDays: {},
  streakDays: 0,
  lastActivityDate: "",
};

export function useCourseProgress() {
  const [data, setData] = useState<CourseProgressData>(DEFAULT);
  const [loaded, setLoaded] = useState(false);
  const [fetchStarted, setFetchStarted] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const result = await fetchProgress();
      startTransition(() => {
        setData(result);
        setLoaded(true);
      });
    } catch {
      startTransition(() => setLoaded(true));
    }
  }, []);

  // Trigger fetch on first render without useEffect
  if (!fetchStarted) {
    setFetchStarted(true);
    refresh();
  }

  return { ...data, loaded, refresh };
}

export function notifyCourseUpdate() {}

function subscribeMounted(cb: () => void) {
  cb();
  return () => {};
}

export function useIsMounted(): boolean {
  return useSyncExternalStore(subscribeMounted, () => true, () => false);
}
