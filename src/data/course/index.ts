import { UnitDefinition, DayDefinition } from "./types";
import { unit01 } from "./units/unit-01-hiragana";
import { unit02 } from "./units/unit-02-katakana";
import {
  generateVocabUnit,
  generateKanjiUnit,
  generateGrammarUnit,
  generateMixedReviewUnit,
} from "./generators";
import { vocabulary } from "../vocabulary";
import { kanji } from "../kanji";
import { grammar } from "../grammar";

const unit03 = generateVocabUnit(
  "greetings",
  "Приветствия и основы",
  "Изучите основные приветствия и базовые фразы",
  31,
  vocabulary.filter((v) => v.category === "greetings"),
  "greetings",
  [{ type: "hiragana", groups: ["vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w", "special"] }],
);

const unit04 = generateVocabUnit(
  "numbers",
  "Числа 数字",
  "Научитесь считать по-японски",
  31 + unit03.days.length,
  vocabulary.filter((v) => v.category === "numbers"),
  "numbers",
);

const unit05start = 31 + unit03.days.length + unit04.days.length;
const unit05 = generateVocabUnit(
  "time",
  "Время 時間",
  "Изучите слова, связанные со временем: сегодня, завтра, утро, ночь",
  unit05start,
  vocabulary.filter((v) => v.category === "time"),
  "time",
);

const unit06start = unit05start + unit05.days.length;
const unit06 = generateGrammarUnit(
  "grammar-basics",
  "Основы грамматики 文法基礎",
  "Изучите です, は, が, を — строительные блоки японских предложений",
  unit06start,
  grammar.filter((g) => ["desu", "wa-particle", "ga-particle", "wo-particle"].includes(g.id)),
  { category: "people" },
);

const unit07start = unit06start + unit06.days.length;
const unit07 = generateVocabUnit(
  "people-places",
  "Люди и места 人と場所",
  "Изучите слова для обозначения людей и мест",
  unit07start,
  [...vocabulary.filter((v) => v.category === "people"), ...vocabulary.filter((v) => v.category === "places")],
  "people",
);

const unit08start = unit07start + unit07.days.length;
const unit08 = generateGrammarUnit(
  "grammar-particles",
  "Частицы и вежливая форма 助詞と丁寧語",
  "Изучите частицы に, で и вежливую форму ます",
  unit08start,
  grammar.filter((g) => ["ni-particle", "de-particle", "masu-form"].includes(g.id)),
);

const unit09start = unit08start + unit08.days.length;
const unit09 = generateKanjiUnit(
  "kanji-days-numbers",
  "Кандзи: Дни и числа 漢字",
  "Изучите кандзи для дней недели и основных чисел",
  unit09start,
  kanji.filter((k) => ["日", "月", "火", "水", "木", "金", "土", "一", "二", "三"].includes(k.char)),
);

const unit10start = unit09start + unit09.days.length;
const unit10 = generateVocabUnit(
  "food",
  "Еда и напитки 食べ物と飲み物",
  "Изучите словарный запас по теме еды и напитков",
  unit10start,
  vocabulary.filter((v) => v.category === "food"),
  "food",
);

const unit11start = unit10start + unit10.days.length;
const unit11 = generateVocabUnit(
  "verbs",
  "Глаголы 動詞",
  "Изучите основные глаголы действия",
  unit11start,
  vocabulary.filter((v) => v.category === "verbs"),
  "verbs",
);

const unit12start = unit11start + unit11.days.length;
const unit12 = generateGrammarUnit(
  "grammar-te-adj",
  "て-форма и прилагательные て形と形容詞",
  "Изучите универсальную て-форму и спряжение прилагательных",
  unit12start,
  grammar.filter((g) => ["te-form", "adjective-i", "adjective-na"].includes(g.id)),
);

const unit13start = unit12start + unit12.days.length;
const unit13 = generateVocabUnit(
  "adjectives",
  "Прилагательные 形容詞",
  "Изучите распространённые описательные слова",
  unit13start,
  vocabulary.filter((v) => v.category === "adjectives"),
  "adjectives",
);

const unit14start = unit13start + unit13.days.length;
const unit14 = generateKanjiUnit(
  "kanji-nature-size",
  "Кандзи: Природа и размер 自然と大きさ",
  "Изучите кандзи природы, размера и направления",
  unit14start,
  kanji.filter((k) => ["人", "大", "小", "山", "川", "上", "下", "中", "学", "生"].includes(k.char)),
);

const unit15start = unit14start + unit14.days.length;
const unit15 = generateMixedReviewUnit(
  "grand-review",
  "Большое повторение 総復習",
  "Повторите всё изученное по всем разделам",
  unit15start,
  5,
  [
    { type: "hiragana", groups: ["vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w", "special"] },
    { type: "katakana", groups: ["vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w", "special"] },
    { type: "kanji", chars: kanji.map((k) => k.char) },
    { type: "vocabulary", category: "verbs" },
    { type: "grammar", ids: grammar.map((g) => g.id) },
  ],
);

export const course: UnitDefinition[] = [
  unit01, unit02, unit03, unit04, unit05, unit06, unit07, unit08,
  unit09, unit10, unit11, unit12, unit13, unit14, unit15,
];

const dayMap = new Map<number, { day: DayDefinition; unitId: string }>();
for (const unit of course) {
  for (const day of unit.days) {
    dayMap.set(day.day, { day, unitId: unit.id });
  }
}

export function getDay(dayNumber: number): DayDefinition | undefined {
  return dayMap.get(dayNumber)?.day;
}

export function getDayUnit(dayNumber: number): UnitDefinition | undefined {
  const entry = dayMap.get(dayNumber);
  if (!entry) return undefined;
  return course.find((u) => u.id === entry.unitId);
}

export function getTotalDays(): number {
  return dayMap.size;
}

export function getAllDayNumbers(): number[] {
  return Array.from(dayMap.keys()).sort((a, b) => a - b);
}
