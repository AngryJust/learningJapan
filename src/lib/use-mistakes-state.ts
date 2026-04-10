"use client";

import { useState, useCallback, startTransition } from "react";
import { fetchMistakes } from "./api";
import type { MistakeEntry } from "./mistakes";

interface MistakesData {
  mistakes: MistakeEntry[];
  count: number;
}

const DEFAULT: MistakesData = { mistakes: [], count: 0 };

export function useMistakesState() {
  const [data, setData] = useState<MistakesData>(DEFAULT);
  const [loaded, setLoaded] = useState(false);
  const [fetchStarted, setFetchStarted] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const result = await fetchMistakes();
      startTransition(() => {
        setData({ mistakes: result.mistakes, count: result.mistakes.length });
        setLoaded(true);
      });
    } catch {
      startTransition(() => setLoaded(true));
    }
  }, []);

  if (!fetchStarted) {
    setFetchStarted(true);
    refresh();
  }

  return { ...data, loaded, refresh };
}

export function notifyMistakesUpdate() {}
