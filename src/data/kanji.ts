export interface KanjiChar {
  char: string;
  meanings: string[];
  onyomi: string[];
  kunyomi: string[];
  jlpt: "N5" | "N4" | "N3" | "N2" | "N1";
  strokes: number;
  examples: { word: string; reading: string; meaning: string }[];
}

export const kanji: KanjiChar[] = [
  {
    char: "日", meanings: ["день", "солнце"], onyomi: ["ニチ", "ジツ"], kunyomi: ["ひ", "か"],
    jlpt: "N5", strokes: 4,
    examples: [
      { word: "日本", reading: "にほん", meaning: "Япония" },
      { word: "今日", reading: "きょう", meaning: "сегодня" },
      { word: "日曜日", reading: "にちようび", meaning: "воскресенье" },
    ],
  },
  {
    char: "月", meanings: ["месяц", "луна"], onyomi: ["ゲツ", "ガツ"], kunyomi: ["つき"],
    jlpt: "N5", strokes: 4,
    examples: [
      { word: "月曜日", reading: "げつようび", meaning: "понедельник" },
      { word: "一月", reading: "いちがつ", meaning: "январь" },
    ],
  },
  {
    char: "火", meanings: ["огонь"], onyomi: ["カ"], kunyomi: ["ひ"],
    jlpt: "N5", strokes: 4,
    examples: [
      { word: "火曜日", reading: "かようび", meaning: "вторник" },
      { word: "火事", reading: "かじ", meaning: "пожар" },
    ],
  },
  {
    char: "水", meanings: ["вода"], onyomi: ["スイ"], kunyomi: ["みず"],
    jlpt: "N5", strokes: 4,
    examples: [
      { word: "水曜日", reading: "すいようび", meaning: "среда" },
      { word: "水", reading: "みず", meaning: "вода" },
    ],
  },
  {
    char: "木", meanings: ["дерево"], onyomi: ["モク", "ボク"], kunyomi: ["き"],
    jlpt: "N5", strokes: 4,
    examples: [
      { word: "木曜日", reading: "もくようび", meaning: "четверг" },
      { word: "木", reading: "き", meaning: "дерево" },
    ],
  },
  {
    char: "金", meanings: ["золото", "деньги"], onyomi: ["キン", "コン"], kunyomi: ["かね"],
    jlpt: "N5", strokes: 8,
    examples: [
      { word: "金曜日", reading: "きんようび", meaning: "пятница" },
      { word: "お金", reading: "おかね", meaning: "деньги" },
    ],
  },
  {
    char: "土", meanings: ["земля", "почва"], onyomi: ["ド", "ト"], kunyomi: ["つち"],
    jlpt: "N5", strokes: 3,
    examples: [
      { word: "土曜日", reading: "どようび", meaning: "суббота" },
      { word: "土地", reading: "とち", meaning: "земельный участок" },
    ],
  },
  {
    char: "一", meanings: ["один"], onyomi: ["イチ"], kunyomi: ["ひと"],
    jlpt: "N5", strokes: 1,
    examples: [
      { word: "一つ", reading: "ひとつ", meaning: "один (предмет)" },
      { word: "一人", reading: "ひとり", meaning: "один человек" },
    ],
  },
  {
    char: "二", meanings: ["два"], onyomi: ["ニ"], kunyomi: ["ふた"],
    jlpt: "N5", strokes: 2,
    examples: [
      { word: "二つ", reading: "ふたつ", meaning: "два (предмета)" },
      { word: "二人", reading: "ふたり", meaning: "два человека" },
    ],
  },
  {
    char: "三", meanings: ["три"], onyomi: ["サン"], kunyomi: ["み"],
    jlpt: "N5", strokes: 3,
    examples: [
      { word: "三つ", reading: "みっつ", meaning: "три (предмета)" },
      { word: "三月", reading: "さんがつ", meaning: "март" },
    ],
  },
  {
    char: "人", meanings: ["человек"], onyomi: ["ジン", "ニン"], kunyomi: ["ひと"],
    jlpt: "N5", strokes: 2,
    examples: [
      { word: "日本人", reading: "にほんじん", meaning: "японец" },
      { word: "大人", reading: "おとな", meaning: "взрослый" },
    ],
  },
  {
    char: "大", meanings: ["большой"], onyomi: ["ダイ", "タイ"], kunyomi: ["おお"],
    jlpt: "N5", strokes: 3,
    examples: [
      { word: "大きい", reading: "おおきい", meaning: "большой" },
      { word: "大学", reading: "だいがく", meaning: "университет" },
    ],
  },
  {
    char: "小", meanings: ["маленький"], onyomi: ["ショウ"], kunyomi: ["ちい", "こ"],
    jlpt: "N5", strokes: 3,
    examples: [
      { word: "小さい", reading: "ちいさい", meaning: "маленький" },
      { word: "小学校", reading: "しょうがっこう", meaning: "начальная школа" },
    ],
  },
  {
    char: "山", meanings: ["гора"], onyomi: ["サン"], kunyomi: ["やま"],
    jlpt: "N5", strokes: 3,
    examples: [
      { word: "山", reading: "やま", meaning: "гора" },
      { word: "富士山", reading: "ふじさん", meaning: "гора Фудзи" },
    ],
  },
  {
    char: "川", meanings: ["река"], onyomi: ["セン"], kunyomi: ["かわ"],
    jlpt: "N5", strokes: 3,
    examples: [
      { word: "川", reading: "かわ", meaning: "река" },
    ],
  },
  {
    char: "上", meanings: ["верх", "над"], onyomi: ["ジョウ"], kunyomi: ["うえ", "あ"],
    jlpt: "N5", strokes: 3,
    examples: [
      { word: "上", reading: "うえ", meaning: "наверху" },
      { word: "上手", reading: "じょうず", meaning: "умелый" },
    ],
  },
  {
    char: "下", meanings: ["низ", "под"], onyomi: ["カ", "ゲ"], kunyomi: ["した", "さ", "くだ"],
    jlpt: "N5", strokes: 3,
    examples: [
      { word: "下", reading: "した", meaning: "внизу" },
      { word: "下手", reading: "へた", meaning: "неумелый" },
    ],
  },
  {
    char: "中", meanings: ["середина", "внутри"], onyomi: ["チュウ"], kunyomi: ["なか"],
    jlpt: "N5", strokes: 4,
    examples: [
      { word: "中", reading: "なか", meaning: "внутри" },
      { word: "中国", reading: "ちゅうごく", meaning: "Китай" },
    ],
  },
  {
    char: "学", meanings: ["учёба", "наука"], onyomi: ["ガク"], kunyomi: ["まな"],
    jlpt: "N5", strokes: 8,
    examples: [
      { word: "学生", reading: "がくせい", meaning: "студент" },
      { word: "学校", reading: "がっこう", meaning: "школа" },
    ],
  },
  {
    char: "生", meanings: ["жизнь", "рождение"], onyomi: ["セイ", "ショウ"], kunyomi: ["い", "う", "なま"],
    jlpt: "N5", strokes: 5,
    examples: [
      { word: "先生", reading: "せんせい", meaning: "учитель" },
      { word: "学生", reading: "がくせい", meaning: "студент" },
    ],
  },
];

export const jlptLevels = ["N5", "N4", "N3", "N2", "N1"] as const;
