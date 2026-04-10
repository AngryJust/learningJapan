"use client";

import { useState, useCallback, startTransition } from "react";
import { fetchDueSRS } from "./api";

export interface DueItem {
  key: string;
  state: {
    interval: number;
    nextReview: string;
    reviewCount: number;
    lastReview: string;
  };
}

interface SRSData {
  dueItems: DueItem[];
  dueCount: number;
}

const DEFAULT: SRSData = { dueItems: [], dueCount: 0 };

export function useSRSProgress() {
  const [data, setData] = useState<SRSData>(DEFAULT);
  const [loaded, setLoaded] = useState(false);
  const [fetchStarted, setFetchStarted] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const result = await fetchDueSRS();
      startTransition(() => {
        setData(result);
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

export function notifySRSUpdate() {}
