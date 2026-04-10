import { DayDefinition, UnitDefinition, ExerciseSpec, ContentRef } from "./types";
import { KanjiChar } from "../kanji";
import { VocabWord } from "../vocabulary";
import { GrammarPoint } from "../grammar";

export function generateVocabUnit(
  id: string,
  title: string,
  description: string,
  startDay: number,
  words: VocabWord[],
  category: string,
  extraReviewContent?: ContentRef[],
): UnitDefinition {
  const days: DayDefinition[] = [];
  const batchSize = 5;

  for (let i = 0; i < words.length; i += batchSize) {
    const batch = words.slice(i, i + batchSize);
    const batchWords = batch.map((w) => w.word);
    const dayNum = startDay + days.length;

    // Teach day
    days.push({
      day: dayNum,
      title: `Словарь: ${batch.map((w) => w.word).join(", ")}`,
      summary: batch.map((w) => `${w.word} (${w.meaning})`).join(", "),
      lessonContent: [{ type: "vocabulary", category, words: batchWords }],
      exercises: [
        { puzzleType: "multiple-choice", contentRef: { type: "vocabulary", category, words: batchWords }, count: 3 },
        { puzzleType: "type-answer", contentRef: { type: "vocabulary", category, words: batchWords }, count: 3 },
        { puzzleType: "matching-pairs", contentRef: { type: "vocabulary", category, words: batchWords }, count: 5 },
        { puzzleType: "listen-choose", contentRef: { type: "vocabulary", category, words: batchWords }, count: 2 },
        { puzzleType: "reverse-choice", contentRef: { type: "vocabulary", category, words: batchWords }, count: 2 },
      ],
    });

    // Review day every 2 batches
    if ((days.length) % 3 === 0) {
      const reviewDay = startDay + days.length;
      const reviewExercises: ExerciseSpec[] = [
        { puzzleType: "multiple-choice", contentRef: { type: "vocabulary", category }, count: 5 },
        { puzzleType: "type-answer", contentRef: { type: "vocabulary", category }, count: 5 },
        { puzzleType: "matching-pairs", contentRef: { type: "vocabulary", category }, count: 5 },
      ];
      if (extraReviewContent) {
        reviewExercises.push(
          { puzzleType: "multiple-choice", contentRef: extraReviewContent[0], count: 5 },
        );
      }
      days.push({
        day: reviewDay,
        title: `Повторение: ${title}`,
        summary: `Повторите весь изученный словарь по теме «${category}»`,
        lessonContent: [{ type: "vocabulary", category }],
        exercises: reviewExercises,
      });
    }
  }

  return { id, title, description, days };
}

export function generateKanjiUnit(
  id: string,
  title: string,
  description: string,
  startDay: number,
  kanjiList: KanjiChar[],
): UnitDefinition {
  const days: DayDefinition[] = [];
  const batchSize = 3;

  for (let i = 0; i < kanjiList.length; i += batchSize) {
    const batch = kanjiList.slice(i, i + batchSize);
    const chars = batch.map((k) => k.char);
    const dayNum = startDay + days.length;

    days.push({
      day: dayNum,
      title: `Кандзи: ${chars.join(" ")}`,
      summary: batch.map((k) => `${k.char} (${k.meanings[0]})`).join(", "),
      lessonContent: [{ type: "kanji", chars }],
      exercises: [
        { puzzleType: "multiple-choice", contentRef: { type: "kanji", chars }, count: 3 },
        { puzzleType: "type-answer", contentRef: { type: "kanji", chars }, count: 3 },
        { puzzleType: "matching-pairs", contentRef: { type: "kanji", chars }, count: 3 },
        { puzzleType: "listen-choose", contentRef: { type: "kanji", chars }, count: 2 },
        { puzzleType: "reverse-choice", contentRef: { type: "kanji", chars }, count: 2 },
      ],
    });

    // Review day every 3 batches
    if ((days.length) % 4 === 0) {
      const allChars = kanjiList.slice(0, i + batchSize).map((k) => k.char);
      days.push({
        day: startDay + days.length,
        title: `Повторение кандзи: ${allChars.slice(-9).join(" ")}`,
        summary: "Повторите недавно изученные кандзи",
        lessonContent: [{ type: "kanji", chars: allChars }],
        exercises: [
          { puzzleType: "multiple-choice", contentRef: { type: "kanji", chars: allChars }, count: 6 },
          { puzzleType: "type-answer", contentRef: { type: "kanji", chars: allChars }, count: 6 },
          { puzzleType: "matching-pairs", contentRef: { type: "kanji", chars: allChars }, count: 5 },
        ],
      });
    }
  }

  return { id, title, description, days };
}

export function generateGrammarUnit(
  id: string,
  title: string,
  description: string,
  startDay: number,
  grammarPoints: GrammarPoint[],
  relatedVocab?: { category: string },
): UnitDefinition {
  const days: DayDefinition[] = [];

  for (const point of grammarPoints) {
    const dayNum = startDay + days.length;
    const exercises: ExerciseSpec[] = [
      { puzzleType: "multiple-choice", contentRef: { type: "grammar", ids: [point.id] }, count: 4 },
      { puzzleType: "fill-in-blank", contentRef: { type: "grammar", ids: [point.id] }, count: 3 },
    ];

    if (point.examples.length >= 2) {
      exercises.push({
        puzzleType: "drag-reorder",
        contentRef: { type: "grammar", ids: [point.id] },
        count: 2,
      });
    }

    const lessonContent: ContentRef[] = [{ type: "grammar", ids: [point.id] }];
    if (relatedVocab) {
      lessonContent.push({ type: "vocabulary", category: relatedVocab.category });
    }

    days.push({
      day: dayNum,
      title: point.title,
      summary: point.structure,
      lessonContent,
      exercises,
    });

    // Practice day after every 2 grammar points
    if (days.length % 3 === 0) {
      const recentIds = grammarPoints
        .slice(0, grammarPoints.indexOf(point) + 1)
        .map((g) => g.id);
      days.push({
        day: startDay + days.length,
        title: `Практика грамматики`,
        summary: `Повторение: ${recentIds.slice(-4).join(", ")}`,
        lessonContent: [{ type: "grammar", ids: recentIds }],
        exercises: [
          { puzzleType: "fill-in-blank", contentRef: { type: "grammar", ids: recentIds }, count: 5 },
          { puzzleType: "drag-reorder", contentRef: { type: "grammar", ids: recentIds }, count: 3 },
          { puzzleType: "multiple-choice", contentRef: { type: "grammar", ids: recentIds }, count: 5 },
        ],
      });
    }
  }

  return { id, title, description, days };
}

export function generateMixedReviewUnit(
  id: string,
  title: string,
  description: string,
  startDay: number,
  dayCount: number,
  contentRefs: ContentRef[],
): UnitDefinition {
  const days: DayDefinition[] = [];

  for (let i = 0; i < dayCount; i++) {
    const ref = contentRefs[i % contentRefs.length];
    days.push({
      day: startDay + i,
      title: `${title} — День ${i + 1}`,
      summary: `Смешанное повторение и практика`,
      lessonContent: [ref],
      exercises: [
        { puzzleType: "multiple-choice", contentRef: ref, count: 5 },
        { puzzleType: "type-answer", contentRef: ref, count: 5 },
        { puzzleType: "matching-pairs", contentRef: ref, count: 5 },
      ],
    });
  }

  return { id, title, description, days };
}
