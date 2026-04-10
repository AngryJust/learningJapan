export type ContentRef =
  | { type: "hiragana"; groups: string[] }
  | { type: "katakana"; groups: string[] }
  | { type: "kanji"; chars: string[] }
  | { type: "vocabulary"; category: string; words?: string[] }
  | { type: "grammar"; ids: string[] }
  | { type: "review"; dayRefs: number[] };

export type PuzzleType =
  | "multiple-choice"
  | "matching-pairs"
  | "type-answer"
  | "fill-in-blank"
  | "drag-reorder"
  | "listen-choose"
  | "listen-type"
  | "reverse-choice";

export interface ExerciseSpec {
  puzzleType: PuzzleType;
  contentRef: ContentRef;
  count: number;
}

export interface DayDefinition {
  day: number;
  title: string;
  summary: string;
  lessonContent: ContentRef[];
  exercises: ExerciseSpec[];
}

export interface UnitDefinition {
  id: string;
  title: string;
  description: string;
  days: DayDefinition[];
}
