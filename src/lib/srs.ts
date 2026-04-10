import { DayDefinition, ContentRef } from "@/data/course/types";
import { hiragana } from "@/data/hiragana";
import { katakana } from "@/data/katakana";
import { kanji } from "@/data/kanji";
import { vocabulary } from "@/data/vocabulary";
import { grammar } from "@/data/grammar";
import { generateExercises, ExerciseQuestion } from "./exercises";

const SRS_KEY = "learnin-japan-srs";

export interface SRSItemState {
  interval: number;
  nextReview: string;
  reviewCount: number;
  lastReview: string;
}

export type SRSStore = Record<string, SRSItemState>;

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getSRSStore(): SRSStore {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(SRS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveSRSStore(store: SRSStore) {
  try {
    localStorage.setItem(SRS_KEY, JSON.stringify(store));
  } catch {
    // localStorage quota exceeded
  }
}

export function getSRSKey(contentType: string, identifier: string): string {
  return `${contentType}:${identifier}`;
}

function resolveKeysFromRef(ref: ContentRef): string[] {
  switch (ref.type) {
    case "hiragana":
      return hiragana.filter((c) => ref.groups.includes(c.group)).map((c) => getSRSKey("hiragana", c.char));
    case "katakana":
      return katakana.filter((c) => ref.groups.includes(c.group)).map((c) => getSRSKey("katakana", c.char));
    case "kanji":
      return kanji.filter((k) => ref.chars.includes(k.char)).map((k) => getSRSKey("kanji", k.char));
    case "vocabulary": {
      let words = vocabulary.filter((v) => v.category === ref.category);
      if (ref.words) words = words.filter((v) => ref.words!.includes(v.word));
      return words.map((v) => getSRSKey("vocab", v.word));
    }
    case "grammar":
      return grammar.filter((g) => ref.ids.includes(g.id)).map((g) => getSRSKey("grammar", g.id));
    default:
      return [];
  }
}

export function seedItemsFromDay(day: DayDefinition) {
  const store = getSRSStore();
  const today = todayStr();

  for (const ref of day.lessonContent) {
    const keys = resolveKeysFromRef(ref);
    for (const key of keys) {
      if (!(key in store)) {
        store[key] = {
          interval: 1,
          nextReview: today,
          reviewCount: 0,
          lastReview: "",
        };
      }
    }
  }

  saveSRSStore(store);
}

export function getDueItems(): { key: string; state: SRSItemState }[] {
  const store = getSRSStore();
  const today = todayStr();
  return Object.entries(store)
    .filter(([, state]) => state.nextReview <= today)
    .map(([key, state]) => ({ key, state }));
}

export function getDueCount(): number {
  return getDueItems().length;
}

export function reviewItem(key: string, correct: boolean) {
  const store = getSRSStore();
  const item = store[key];
  if (!item) return;

  const today = todayStr();
  if (correct) {
    item.interval = Math.min(item.interval * 2, 30);
  } else {
    item.interval = 1;
  }
  item.reviewCount += 1;
  item.lastReview = today;

  const next = new Date();
  next.setDate(next.getDate() + item.interval);
  item.nextReview = next.toISOString().slice(0, 10);

  saveSRSStore(store);
}

export function generateReviewExercises(dueKeys: string[], maxCount: number = 15): ExerciseQuestion[] {
  // Group keys by content type
  const grouped: Record<string, string[]> = {};
  for (const key of dueKeys) {
    const [type] = key.split(":");
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(key);
  }

  const specs = [];

  // Build exercise specs from grouped keys
  for (const [type, keys] of Object.entries(grouped)) {
    const identifiers = keys.map((k) => k.split(":").slice(1).join(":"));
    const count = Math.min(keys.length, Math.ceil(maxCount / Object.keys(grouped).length));

    let ref: ContentRef;
    switch (type) {
      case "hiragana":
        ref = { type: "hiragana", groups: [...new Set(hiragana.filter((c) => identifiers.includes(c.char)).map((c) => c.group))] };
        break;
      case "katakana":
        ref = { type: "katakana", groups: [...new Set(katakana.filter((c) => identifiers.includes(c.char)).map((c) => c.group))] };
        break;
      case "kanji":
        ref = { type: "kanji", chars: identifiers };
        break;
      case "vocab": {
        const categories = [...new Set(vocabulary.filter((v) => identifiers.includes(v.word)).map((v) => v.category))];
        const category = categories[0] || "greetings";
        ref = { type: "vocabulary", category, words: identifiers };
        break;
      }
      case "grammar":
        ref = { type: "grammar", ids: identifiers };
        break;
      default:
        continue;
    }

    // Mix of exercise types for review
    const halfCount = Math.ceil(count / 2);
    specs.push(
      { puzzleType: "multiple-choice" as const, contentRef: ref, count: halfCount },
      { puzzleType: "reverse-choice" as const, contentRef: ref, count: count - halfCount },
    );
  }

  return generateExercises(specs).slice(0, maxCount);
}

export function getSRSKeysForDay(day: DayDefinition): string[] {
  const keys: string[] = [];
  for (const ref of day.lessonContent) {
    keys.push(...resolveKeysFromRef(ref));
  }
  return keys;
}

export function resetSRS() {
  localStorage.removeItem(SRS_KEY);
}
