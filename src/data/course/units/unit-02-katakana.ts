import { DayDefinition, UnitDefinition } from "../types";

const days: DayDefinition[] = [
  {
    day: 16,
    title: "Катакана: Гласные アイウエオ",
    summary: "Изучите 5 гласных катаканы — сравните с хираганой",
    lessonContent: [{ type: "katakana", groups: ["vowels"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["vowels"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["vowels"] }, count: 5 },
    ],
  },
  {
    day: 17,
    title: "Катакана: Практика гласных",
    summary: "Закрепите アイウエオ упражнениями",
    lessonContent: [{ type: "katakana", groups: ["vowels"] }],
    exercises: [
      { puzzleType: "matching-pairs", contentRef: { type: "katakana", groups: ["vowels"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["vowels"] }, count: 5 },
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["vowels"] }, count: 5 },
    ],
  },
  {
    day: 18,
    title: "Катакана: Группа К カキクケコ",
    summary: "Изучите 5 символов группы К катаканы",
    lessonContent: [{ type: "katakana", groups: ["k"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["k"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["k"] }, count: 5 },
    ],
  },
  {
    day: 19,
    title: "Катакана: Повторение гласных + К",
    summary: "Практикуйте ア-ряд и カ-ряд вместе",
    lessonContent: [{ type: "katakana", groups: ["vowels", "k"] }],
    exercises: [
      { puzzleType: "matching-pairs", contentRef: { type: "katakana", groups: ["vowels", "k"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["vowels", "k"] }, count: 5 },
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["vowels", "k"] }, count: 5 },
    ],
  },
  {
    day: 20,
    title: "Катакана: Группа С サシスセソ",
    summary: "Изучите 5 символов группы С (внимание: シ = shi)",
    lessonContent: [{ type: "katakana", groups: ["s"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["s"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["s"] }, count: 5 },
    ],
  },
  {
    day: 21,
    title: "Катакана: Группа Т タチツテト",
    summary: "Изучите 5 символов группы Т (внимание: チ = chi, ツ = tsu)",
    lessonContent: [{ type: "katakana", groups: ["t"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["t"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["t"] }, count: 5 },
    ],
  },
  {
    day: 22,
    title: "Катакана: Повторение С + Т",
    summary: "Повторите サ-ряд и タ-ряд вместе",
    lessonContent: [{ type: "katakana", groups: ["s", "t"] }],
    exercises: [
      { puzzleType: "matching-pairs", contentRef: { type: "katakana", groups: ["vowels", "k", "s", "t"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["s", "t"] }, count: 5 },
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["vowels", "k", "s", "t"] }, count: 5 },
    ],
  },
  {
    day: 23,
    title: "Катакана: Группа Н ナニヌネノ",
    summary: "Изучите 5 символов группы Н катаканы",
    lessonContent: [{ type: "katakana", groups: ["n"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["n"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["n"] }, count: 5 },
    ],
  },
  {
    day: 24,
    title: "Катакана: Группа Х ハヒフヘホ",
    summary: "Изучите 5 символов группы Х (внимание: フ = fu)",
    lessonContent: [{ type: "katakana", groups: ["h"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["h"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["h"] }, count: 5 },
    ],
  },
  {
    day: 25,
    title: "Катакана: Повторение Н + Х",
    summary: "Повторите ナ-ряд и ハ-ряд, накопительная практика",
    lessonContent: [{ type: "katakana", groups: ["n", "h"] }],
    exercises: [
      { puzzleType: "matching-pairs", contentRef: { type: "katakana", groups: ["n", "h"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["vowels", "k", "s", "t", "n", "h"] }, count: 5 },
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["vowels", "k", "s", "t", "n", "h"] }, count: 5 },
    ],
  },
  {
    day: 26,
    title: "Катакана: Группа М マミムメモ",
    summary: "Изучите 5 символов группы М катаканы",
    lessonContent: [{ type: "katakana", groups: ["m"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["m"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["m"] }, count: 5 },
    ],
  },
  {
    day: 27,
    title: "Катакана: Группа Я ヤユヨ + Группа Р ラリルレロ",
    summary: "Изучите 3 символа Я и 5 символов Р",
    lessonContent: [{ type: "katakana", groups: ["y", "r"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["y", "r"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["y", "r"] }, count: 5 },
      { puzzleType: "matching-pairs", contentRef: { type: "katakana", groups: ["y", "r"] }, count: 5 },
    ],
  },
  {
    day: 28,
    title: "Катакана: Группа В ワヲ + ン",
    summary: "Изучите последние катаканы: ワ, ヲ и ン",
    lessonContent: [{ type: "katakana", groups: ["w", "special"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["m", "y", "r", "w", "special"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["w", "special"] }, count: 5 },
    ],
  },
  {
    day: 29,
    title: "Катакана: Полное повторение, часть 1",
    summary: "Повторите все катаканы — от гласных до группы Х",
    lessonContent: [{ type: "katakana", groups: ["vowels", "k", "s", "t", "n", "h"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["vowels", "k", "s", "t", "n", "h"] }, count: 8 },
      { puzzleType: "matching-pairs", contentRef: { type: "katakana", groups: ["vowels", "k", "s", "t", "n", "h"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["vowels", "k", "s", "t", "n", "h"] }, count: 8 },
    ],
  },
  {
    day: 30,
    title: "Катакана: Полное повторение, часть 2",
    summary: "Полное освоение катаканы — все 46 символов",
    lessonContent: [{ type: "katakana", groups: ["vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w", "special"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "katakana", groups: ["m", "y", "r", "w", "special"] }, count: 8 },
      { puzzleType: "matching-pairs", contentRef: { type: "katakana", groups: ["vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w", "special"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "katakana", groups: ["vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w", "special"] }, count: 10 },
    ],
  },
];

export const unit02: UnitDefinition = {
  id: "katakana",
  title: "Катакана カタカナ",
  description: "Освойте все 46 символов катаканы — используется для иностранных слов и акцента",
  days,
};
