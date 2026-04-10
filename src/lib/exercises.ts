import { ExerciseSpec, ContentRef } from "@/data/course/types";
import { hiragana } from "@/data/hiragana";
import { katakana } from "@/data/katakana";
import { kanji } from "@/data/kanji";
import { vocabulary } from "@/data/vocabulary";
import { grammar } from "@/data/grammar";

export interface MultipleChoiceQuestion {
  type: "multiple-choice";
  id: string;
  prompt: string;
  correct: string;
  options: string[];
}

export interface MatchingPairsQuestion {
  type: "matching-pairs";
  id: string;
  pairs: [string, string][];
}

export interface TypeAnswerQuestion {
  type: "type-answer";
  id: string;
  prompt: string;
  acceptedAnswers: string[];
  hint?: string;
}

export interface FillInBlankQuestion {
  type: "fill-in-blank";
  id: string;
  before: string;
  after: string;
  correct: string;
  options: string[];
}

export interface DragReorderQuestion {
  type: "drag-reorder";
  id: string;
  instruction: string;
  correctOrder: string[];
  scrambled: string[];
}

export interface ListenChooseQuestion {
  type: "listen-choose";
  id: string;
  audioText: string;
  correct: string;
  options: string[];
}

export interface ListenTypeQuestion {
  type: "listen-type";
  id: string;
  audioText: string;
  acceptedAnswers: string[];
  hint?: string;
}

export interface ReverseChoiceQuestion {
  type: "reverse-choice";
  id: string;
  prompt: string;
  correct: string;
  options: string[];
}

export type ExerciseQuestion =
  | MultipleChoiceQuestion
  | MatchingPairsQuestion
  | TypeAnswerQuestion
  | FillInBlankQuestion
  | DragReorderQuestion
  | ListenChooseQuestion
  | ListenTypeQuestion
  | ReverseChoiceQuestion;

interface ResolvedItem {
  question: string;
  answer: string;
  distractors: string[];
  hint?: string;
  alternateAnswers?: string[];
}

interface ResolvedSentence {
  japanese: string;
  reading: string;
  english: string;
  words: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function resolveItems(ref: ContentRef): ResolvedItem[] {
  switch (ref.type) {
    case "hiragana": {
      const chars = hiragana.filter((c) => ref.groups.includes(c.group));
      const allRomaji = hiragana.map((c) => c.romaji);
      return chars.map((c) => ({
        question: c.char,
        answer: c.romaji,
        distractors: shuffle(allRomaji.filter((r) => r !== c.romaji)).slice(0, 3),
      }));
    }
    case "katakana": {
      const chars = katakana.filter((c) => ref.groups.includes(c.group));
      const allRomaji = katakana.map((c) => c.romaji);
      return chars.map((c) => ({
        question: c.char,
        answer: c.romaji,
        distractors: shuffle(allRomaji.filter((r) => r !== c.romaji)).slice(0, 3),
      }));
    }
    case "kanji": {
      const chars = kanji.filter((k) => ref.chars.includes(k.char));
      const allMeanings = kanji.map((k) => k.meanings[0]);
      return chars.map((k) => ({
        question: k.char,
        answer: k.meanings[0],
        distractors: shuffle(allMeanings.filter((m) => m !== k.meanings[0])).slice(0, 3),
        hint: k.onyomi[0],
        alternateAnswers: k.meanings,
      }));
    }
    case "vocabulary": {
      let words = vocabulary.filter((v) => v.category === ref.category);
      if (ref.words) {
        words = words.filter((v) => ref.words!.includes(v.word));
      }
      const allMeanings = vocabulary.map((v) => v.meaning);
      return words.map((v) => ({
        question: v.word,
        answer: v.meaning,
        distractors: shuffle(allMeanings.filter((m) => m !== v.meaning)).slice(0, 3),
        hint: v.reading,
        alternateAnswers: [v.meaning],
      }));
    }
    case "grammar": {
      const points = grammar.filter((g) => ref.ids.includes(g.id));
      const allStructures = grammar.map((g) => g.structure);
      return points.map((g) => ({
        question: g.title,
        answer: g.structure,
        distractors: shuffle(allStructures.filter((s) => s !== g.structure)).slice(0, 3),
      }));
    }
    case "review":
      return [];
    default:
      return [];
  }
}

function resolveSentences(ref: ContentRef): ResolvedSentence[] {
  if (ref.type === "grammar") {
    const points = grammar.filter((g) => ref.ids.includes(g.id));
    return points.flatMap((g) =>
      g.examples.map((ex) => ({
        japanese: ex.japanese,
        reading: ex.reading,
        english: ex.english,
        words: ex.japanese.replace(/[。、？！]/g, "").split(/(?<=[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+)/g).filter(Boolean),
      }))
    );
  }
  return [];
}

function generateMultipleChoice(items: ResolvedItem[], count: number): MultipleChoiceQuestion[] {
  return shuffle(items)
    .slice(0, count)
    .map((item, i) => ({
      type: "multiple-choice" as const,
      id: `mc-${i}-${item.question}`,
      prompt: item.question,
      correct: item.answer,
      options: shuffle([item.answer, ...item.distractors.slice(0, 3)]),
    }));
}

function generateMatchingPairs(items: ResolvedItem[], count: number): MatchingPairsQuestion[] {
  const pairCount = Math.min(count, items.length);
  const selected = shuffle(items).slice(0, pairCount);
  return [
    {
      type: "matching-pairs" as const,
      id: `mp-${selected.map((s) => s.question).join("")}`,
      pairs: selected.map((item) => [item.question, item.answer] as [string, string]),
    },
  ];
}

function generateTypeAnswer(items: ResolvedItem[], count: number): TypeAnswerQuestion[] {
  return shuffle(items)
    .slice(0, count)
    .map((item, i) => ({
      type: "type-answer" as const,
      id: `ta-${i}-${item.question}`,
      prompt: item.question,
      acceptedAnswers: item.alternateAnswers
        ? [...new Set([item.answer, ...item.alternateAnswers])]
        : [item.answer],
      hint: item.hint,
    }));
}

function generateFillInBlank(ref: ContentRef, count: number): FillInBlankQuestion[] {
  if (ref.type === "grammar") {
    const points = grammar.filter((g) => ref.ids.includes(g.id));
    const questions: FillInBlankQuestion[] = [];

    for (const point of points) {
      for (const ex of point.examples) {
        if (questions.length >= count) break;
        // Find a particle or key word to blank out
        const particles = ["は", "が", "を", "に", "で", "です", "ます", "ません", "ました"];
        const foundParticle = particles.find((p) => ex.japanese.includes(p));
        if (foundParticle) {
          const idx = ex.japanese.indexOf(foundParticle);
          questions.push({
            type: "fill-in-blank",
            id: `fib-${questions.length}-${point.id}`,
            before: ex.japanese.slice(0, idx),
            after: ex.japanese.slice(idx + foundParticle.length),
            correct: foundParticle,
            options: shuffle(particles.filter((p) => p !== foundParticle).slice(0, 3).concat(foundParticle)),
          });
        }
      }
    }
    return questions.slice(0, count);
  }

  // For vocab: blank out the word in a simple sentence
  const items = resolveItems(ref);
  return shuffle(items)
    .slice(0, count)
    .map((item, i) => ({
      type: "fill-in-blank" as const,
      id: `fib-${i}-${item.question}`,
      before: "",
      after: ` — «${item.answer}»`,
      correct: item.question,
      options: shuffle([item.question, ...items.filter((x) => x.question !== item.question).slice(0, 3).map((x) => x.question)]),
    }));
}

function generateDragReorder(ref: ContentRef, count: number): DragReorderQuestion[] {
  const sentences = resolveSentences(ref);
  if (sentences.length === 0) return [];

  return shuffle(sentences)
    .slice(0, count)
    .map((s, i) => {
      // Split sentence into meaningful chunks for reordering
      const parts = s.reading.split(/\s+/).filter(Boolean);
      return {
        type: "drag-reorder" as const,
        id: `dr-${i}`,
        instruction: s.english,
        correctOrder: parts,
        scrambled: shuffle(parts),
      };
    });
}

function generateListenChoose(items: ResolvedItem[], count: number): ListenChooseQuestion[] {
  return shuffle(items)
    .slice(0, count)
    .map((item, i) => ({
      type: "listen-choose" as const,
      id: `lc-${i}-${item.question}`,
      audioText: item.question,
      correct: item.question,
      options: shuffle([item.question, ...shuffle(items.filter((x) => x.question !== item.question)).slice(0, 3).map((x) => x.question)]),
    }));
}

function generateListenType(items: ResolvedItem[], count: number): ListenTypeQuestion[] {
  return shuffle(items)
    .slice(0, count)
    .map((item, i) => ({
      type: "listen-type" as const,
      id: `lt-${i}-${item.question}`,
      audioText: item.question,
      acceptedAnswers: item.alternateAnswers
        ? [item.answer, ...item.alternateAnswers]
        : [item.answer],
      hint: item.hint,
    }));
}

function generateReverseChoice(items: ResolvedItem[], count: number): ReverseChoiceQuestion[] {
  return shuffle(items)
    .slice(0, count)
    .map((item, i) => ({
      type: "reverse-choice" as const,
      id: `rc-${i}-${item.answer}`,
      prompt: item.answer,
      correct: item.question,
      options: shuffle([item.question, ...shuffle(items.filter((x) => x.question !== item.question)).slice(0, 3).map((x) => x.question)]),
    }));
}

export function generateExercises(specs: ExerciseSpec[]): ExerciseQuestion[] {
  const questions: ExerciseQuestion[] = [];

  for (const spec of specs) {
    const items = resolveItems(spec.contentRef);

    switch (spec.puzzleType) {
      case "multiple-choice":
        questions.push(...generateMultipleChoice(items, spec.count));
        break;
      case "matching-pairs":
        questions.push(...generateMatchingPairs(items, spec.count));
        break;
      case "type-answer":
        questions.push(...generateTypeAnswer(items, spec.count));
        break;
      case "fill-in-blank":
        questions.push(...generateFillInBlank(spec.contentRef, spec.count));
        break;
      case "drag-reorder":
        questions.push(...generateDragReorder(spec.contentRef, spec.count));
        break;
      case "listen-choose":
        questions.push(...generateListenChoose(items, spec.count));
        break;
      case "listen-type":
        questions.push(...generateListenType(items, spec.count));
        break;
      case "reverse-choice":
        questions.push(...generateReverseChoice(items, spec.count));
        break;
    }
  }

  return questions;
}
