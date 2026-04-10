import { DayDefinition, UnitDefinition } from "../types";

const days: DayDefinition[] = [
  {
    day: 1,
    title: "Хирагана: Гласные あいうえお",
    summary: "Изучите 5 гласных звуков — основу японского языка",
    lessonContent: [{ type: "hiragana", groups: ["vowels"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["vowels"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["vowels"] }, count: 5 },
    ],
  },
  {
    day: 2,
    title: "Хирагана: Практика гласных",
    summary: "Закрепите あいうえお с помощью упражнений на соответствие и ввод",
    lessonContent: [{ type: "hiragana", groups: ["vowels"] }],
    exercises: [
      { puzzleType: "matching-pairs", contentRef: { type: "hiragana", groups: ["vowels"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["vowels"] }, count: 5 },
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["vowels"] }, count: 5 },
    ],
  },
  {
    day: 3,
    title: "Хирагана: Группа К かきくけこ",
    summary: "Изучите 5 символов группы К",
    lessonContent: [{ type: "hiragana", groups: ["k"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["k"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["k"] }, count: 5 },
    ],
  },
  {
    day: 4,
    title: "Хирагана: Повторение гласных + К",
    summary: "Практикуйте あ-ряд и か-ряд вместе",
    lessonContent: [{ type: "hiragana", groups: ["vowels", "k"] }],
    exercises: [
      { puzzleType: "matching-pairs", contentRef: { type: "hiragana", groups: ["vowels", "k"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["vowels", "k"] }, count: 5 },
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["vowels", "k"] }, count: 5 },
    ],
  },
  {
    day: 5,
    title: "Хирагана: Группа С さしすせそ",
    summary: "Изучите 5 символов группы С (внимание: し = shi)",
    lessonContent: [{ type: "hiragana", groups: ["s"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["s"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["s"] }, count: 5 },
    ],
  },
  {
    day: 6,
    title: "Хирагана: Группа Т たちつてと",
    summary: "Изучите 5 символов группы Т (внимание: ち = chi, つ = tsu)",
    lessonContent: [{ type: "hiragana", groups: ["t"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["t"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["t"] }, count: 5 },
    ],
  },
  {
    day: 7,
    title: "Хирагана: Повторение С + Т",
    summary: "Повторите さ-ряд и た-ряд со всеми типами упражнений",
    lessonContent: [{ type: "hiragana", groups: ["s", "t"] }],
    exercises: [
      { puzzleType: "matching-pairs", contentRef: { type: "hiragana", groups: ["vowels", "k", "s", "t"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["s", "t"] }, count: 5 },
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["vowels", "k", "s", "t"] }, count: 5 },
    ],
  },
  {
    day: 8,
    title: "Хирагана: Группа Н なにぬねの",
    summary: "Изучите 5 символов группы Н",
    lessonContent: [{ type: "hiragana", groups: ["n"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["n"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["n"] }, count: 5 },
    ],
  },
  {
    day: 9,
    title: "Хирагана: Группа Х はひふへほ",
    summary: "Изучите 5 символов группы Х (внимание: ふ = fu)",
    lessonContent: [{ type: "hiragana", groups: ["h"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["h"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["h"] }, count: 5 },
    ],
  },
  {
    day: 10,
    title: "Хирагана: Повторение Н + Х",
    summary: "Повторите な-ряд и は-ряд, накопительная практика",
    lessonContent: [{ type: "hiragana", groups: ["n", "h"] }],
    exercises: [
      { puzzleType: "matching-pairs", contentRef: { type: "hiragana", groups: ["n", "h"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["vowels", "k", "s", "t", "n", "h"] }, count: 5 },
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["vowels", "k", "s", "t", "n", "h"] }, count: 5 },
    ],
  },
  {
    day: 11,
    title: "Хирагана: Группа М まみむめも",
    summary: "Изучите 5 символов группы М",
    lessonContent: [{ type: "hiragana", groups: ["m"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["m"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["m"] }, count: 5 },
    ],
  },
  {
    day: 12,
    title: "Хирагана: Группа Я やゆよ + Группа Р らりるれろ",
    summary: "Изучите 3 символа Я и 5 символов Р",
    lessonContent: [{ type: "hiragana", groups: ["y", "r"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["y", "r"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["y", "r"] }, count: 5 },
      { puzzleType: "matching-pairs", contentRef: { type: "hiragana", groups: ["y", "r"] }, count: 5 },
    ],
  },
  {
    day: 13,
    title: "Хирагана: Группа В わを + ん",
    summary: "Изучите последние символы: わ, を и особый ん",
    lessonContent: [{ type: "hiragana", groups: ["w", "special"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["m", "y", "r", "w", "special"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["w", "special"] }, count: 5 },
    ],
  },
  {
    day: 14,
    title: "Хирагана: Полное повторение, часть 1",
    summary: "Повторите все 46 хираган — от гласных до группы Н",
    lessonContent: [{ type: "hiragana", groups: ["vowels", "k", "s", "t", "n", "h"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["vowels", "k", "s", "t", "n", "h"] }, count: 8 },
      { puzzleType: "matching-pairs", contentRef: { type: "hiragana", groups: ["vowels", "k", "s", "t", "n", "h"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["vowels", "k", "s", "t", "n", "h"] }, count: 8 },
    ],
  },
  {
    day: 15,
    title: "Хирагана: Полное повторение, часть 2",
    summary: "Повторите все 46 хираган — от группы М до ん, полное освоение алфавита",
    lessonContent: [{ type: "hiragana", groups: ["vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w", "special"] }],
    exercises: [
      { puzzleType: "multiple-choice", contentRef: { type: "hiragana", groups: ["m", "y", "r", "w", "special"] }, count: 8 },
      { puzzleType: "matching-pairs", contentRef: { type: "hiragana", groups: ["vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w", "special"] }, count: 5 },
      { puzzleType: "type-answer", contentRef: { type: "hiragana", groups: ["vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w", "special"] }, count: 10 },
    ],
  },
];

export const unit01: UnitDefinition = {
  id: "hiragana",
  title: "Хирагана ひらがな",
  description: "Освойте все 46 символов хираганы — основу японской письменности",
  days,
};
