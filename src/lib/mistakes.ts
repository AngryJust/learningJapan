import { generateExercises, ExerciseQuestion } from "./exercises";
import { hiragana } from "@/data/hiragana";
import { katakana } from "@/data/katakana";
import { vocabulary } from "@/data/vocabulary";
import { ContentRef } from "@/data/course/types";

const MISTAKES_KEY = "learnin-japan-mistakes";
const MAX_MISTAKES = 500;

export interface MistakeEntry {
  id: string;
  itemKey: string;
  puzzleType: string;
  timestamp: string;
  userAnswer: string;
  correctAnswer: string;
  prompt: string;
}

export function getMistakes(): MistakeEntry[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(MISTAKES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveMistakes(entries: MistakeEntry[]) {
  try {
    localStorage.setItem(MISTAKES_KEY, JSON.stringify(entries));
  } catch {
    // localStorage quota exceeded
  }
}

export function addMistake(entry: Omit<MistakeEntry, "id">) {
  const mistakes = getMistakes();
  const newEntry: MistakeEntry = {
    ...entry,
    id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  };
  mistakes.unshift(newEntry);
  saveMistakes(mistakes.slice(0, MAX_MISTAKES));
}

export function deleteMistake(id: string) {
  const mistakes = getMistakes().filter((m) => m.id !== id);
  saveMistakes(mistakes);
}

export function clearAllMistakes() {
  localStorage.removeItem(MISTAKES_KEY);
}

export function getMistakesByType(): Record<string, MistakeEntry[]> {
  const mistakes = getMistakes();
  const grouped: Record<string, MistakeEntry[]> = {};
  for (const m of mistakes) {
    const type = m.itemKey.split(":")[0] || "other";
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(m);
  }
  return grouped;
}

export function generateExercisesFromMistakes(entries: MistakeEntry[]): ExerciseQuestion[] {
  // Extract unique item keys and group by type
  const uniqueKeys = [...new Set(entries.map((e) => e.itemKey))];
  const grouped: Record<string, string[]> = {};
  for (const key of uniqueKeys) {
    const [type] = key.split(":");
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(key.split(":").slice(1).join(":"));
  }

  const specs = [];

  for (const [type, identifiers] of Object.entries(grouped)) {
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
        ref = { type: "vocabulary", category: categories[0] || "greetings", words: identifiers };
        break;
      }
      case "grammar":
        ref = { type: "grammar", ids: identifiers };
        break;
      default:
        continue;
    }

    const count = Math.min(identifiers.length, 5);
    specs.push(
      { puzzleType: "multiple-choice" as const, contentRef: ref, count },
      { puzzleType: "type-answer" as const, contentRef: ref, count },
    );
  }

  return generateExercises(specs).slice(0, 15);
}

export function getMistakeCount(): number {
  return getMistakes().length;
}
