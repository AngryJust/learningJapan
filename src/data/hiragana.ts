export interface KanaChar {
  char: string;
  romaji: string;
  group: string;
  hint?: string;
  contextWords?: { word: string; reading: string; meaning: string }[];
}

export const hiragana: KanaChar[] = [
  // Гласные
  { char: "あ", romaji: "a", group: "vowels", hint: "Похожа на букву «А» с дополнительной чертой", contextWords: [{ word: "あさ", reading: "аса", meaning: "утро" }, { word: "あめ", reading: "амэ", meaning: "дождь" }] },
  { char: "い", romaji: "i", group: "vowels", hint: "Две вертикальные чёрточки — как «ii» (две палочки)", contextWords: [{ word: "いぬ", reading: "ину", meaning: "собака" }, { word: "いえ", reading: "иэ", meaning: "дом" }] },
  { char: "う", romaji: "u", group: "vowels", hint: "Напоминает ухо — «У-хо»", contextWords: [{ word: "うみ", reading: "уми", meaning: "море" }, { word: "うえ", reading: "уэ", meaning: "верх" }] },
  { char: "え", romaji: "e", group: "vowels", hint: "Как энергичный человечек с поднятой рукой", contextWords: [{ word: "えき", reading: "эки", meaning: "станция" }] },
  { char: "お", romaji: "o", group: "vowels", hint: "Человечек несёт мешок — «О, тяжело!»", contextWords: [{ word: "おか", reading: "ока", meaning: "холм" }, { word: "おと", reading: "ото", meaning: "звук" }] },
  // Группа К
  { char: "か", romaji: "ka", group: "k", hint: "Похожа на лезвие катаны", contextWords: [{ word: "かさ", reading: "каса", meaning: "зонт" }, { word: "かお", reading: "као", meaning: "лицо" }] },
  { char: "き", romaji: "ki", group: "k", hint: "Ключ — «ки» (key)", contextWords: [{ word: "きく", reading: "кику", meaning: "слушать" }] },
  { char: "く", romaji: "ku", group: "k", hint: "Клюв птицы — «ку-ку»", contextWords: [{ word: "くち", reading: "кути", meaning: "рот" }] },
  { char: "け", romaji: "ke", group: "k", hint: "Буква «К» повёрнутая — «ке»", contextWords: [{ word: "けさ", reading: "кэса", meaning: "сегодня утром" }] },
  { char: "こ", romaji: "ko", group: "k", hint: "Два горизонтальных штриха — как монеты (coins)", contextWords: [{ word: "こえ", reading: "коэ", meaning: "голос" }, { word: "ここ", reading: "коко", meaning: "здесь" }] },
  // Группа С
  { char: "さ", romaji: "sa", group: "s", hint: "Самурай с мечом наперевес", contextWords: [{ word: "さけ", reading: "сакэ", meaning: "саке" }, { word: "さくら", reading: "сакура", meaning: "сакура" }] },
  { char: "し", romaji: "shi", group: "s", hint: "Рыболовный крючок — «ши-п»", contextWords: [{ word: "しお", reading: "сио", meaning: "соль" }] },
  { char: "す", romaji: "su", group: "s", hint: "Петля — как кольцо на верёвке", contextWords: [{ word: "すし", reading: "суси", meaning: "суши" }] },
  { char: "せ", romaji: "se", group: "s", hint: "Стрелка указывает направление — «сей путь»" },
  { char: "そ", romaji: "so", group: "s", hint: "Зигзаг — как нитка для шитья (sew)", contextWords: [{ word: "そこ", reading: "соко", meaning: "там" }, { word: "そら", reading: "сора", meaning: "небо" }] },
  // Группа Т
  { char: "た", romaji: "ta", group: "t", hint: "Буквы «t» и «a» рядом" },
  { char: "ち", romaji: "chi", group: "t", hint: "Число 5 — «чи-сло»" },
  { char: "つ", romaji: "tsu", group: "t", hint: "Смайлик с улыбкой — «цу» :)" },
  { char: "て", romaji: "te", group: "t", hint: "Рука ладонью вверх — «тэ» (рука)" },
  { char: "と", romaji: "to", group: "t", hint: "Палец ноги — «toe»" },
  // Группа Н
  { char: "な", romaji: "na", group: "n", hint: "Человек завязывает узел — «на» узел" },
  { char: "に", romaji: "ni", group: "n", hint: "Похожа на колени — «knee»" },
  { char: "ぬ", romaji: "nu", group: "n", hint: "Лапша — «noodle»" },
  { char: "ね", romaji: "ne", group: "n", hint: "Кошка (неко) свернулась" },
  { char: "の", romaji: "no", group: "n", hint: "Знак «нет» — перечёркнутый круг" },
  // Группа Х
  { char: "は", romaji: "ha", group: "h", hint: "Смеющийся человек — «Ха-ха!»" },
  { char: "ひ", romaji: "hi", group: "h", hint: "Улыбка — «хи-хи»" },
  { char: "ふ", romaji: "fu", group: "h", hint: "Гора Фудзи — «Фу-дзи»" },
  { char: "へ", romaji: "he", group: "h", hint: "Холм или горка" },
  { char: "ほ", romaji: "ho", group: "h", hint: "Дом Санты — «Ho-ho-ho»" },
  // Группа М
  { char: "ま", romaji: "ma", group: "m", hint: "Мама с ребёнком" },
  { char: "み", romaji: "mi", group: "m", hint: "Число 21 — «ми»" },
  { char: "む", romaji: "mu", group: "m", hint: "Корова — «Му-у»" },
  { char: "め", romaji: "me", group: "m", hint: "Глаз — «мэ» (目 = глаз)" },
  { char: "も", romaji: "mo", group: "m", hint: "Рыболовный крючок с наживкой — «мо-ре»" },
  // Группа Я
  { char: "や", romaji: "ya", group: "y", hint: "Якорь — «яма» (яма = гора)" },
  { char: "ゆ", romaji: "yu", group: "y", hint: "Рыбка плывёт — плавно, как «ю-ла»" },
  { char: "よ", romaji: "yo", group: "y", hint: "Человечек с палкой — «Йо!»" },
  // Группа Р
  { char: "ら", romaji: "ra", group: "r", hint: "Кролик (rabbit) сидит" },
  { char: "り", romaji: "ri", group: "r", hint: "Река (river) — две струи" },
  { char: "る", romaji: "ru", group: "r", hint: "Петля — как «ру-лон»" },
  { char: "れ", romaji: "re", group: "r", hint: "Человек кланяется — «ре-веранс»" },
  { char: "ろ", romaji: "ro", group: "r", hint: "Дорога (road) — цифра 3" },
  // Группа В
  { char: "わ", romaji: "wa", group: "w", hint: "Волна — «ва-ва» (wave)" },
  { char: "を", romaji: "wo", group: "w", hint: "Орёл — «wo-rёл»" },
  // Н
  { char: "ん", romaji: "n", group: "special", hint: "Единственный согласный без гласного — просто «н»" },
];

export const hiraganaGroups = [
  "vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w", "special",
] as const;

export const groupLabels: Record<string, string> = {
  vowels: "Гласные (あ行)",
  k: "Группа К (か行)",
  s: "Группа С (さ行)",
  t: "Группа Т (た行)",
  n: "Группа Н (な行)",
  h: "Группа Х (は行)",
  m: "Группа М (ま行)",
  y: "Группа Я (や行)",
  r: "Группа Р (ら行)",
  w: "Группа В (わ行)",
  special: "Особый (ん)",
};
