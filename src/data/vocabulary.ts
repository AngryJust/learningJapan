export interface VocabWord {
  word: string;
  reading: string;
  meaning: string;
  category: string;
  jlpt: "N5" | "N4" | "N3" | "N2" | "N1";
}

export const vocabulary: VocabWord[] = [
  // Приветствия
  { word: "こんにちは", reading: "konnichiwa", meaning: "Здравствуйте", category: "greetings", jlpt: "N5" },
  { word: "おはようございます", reading: "ohayou gozaimasu", meaning: "Доброе утро (вежл.)", category: "greetings", jlpt: "N5" },
  { word: "こんばんは", reading: "konbanwa", meaning: "Добрый вечер", category: "greetings", jlpt: "N5" },
  { word: "さようなら", reading: "sayounara", meaning: "До свидания", category: "greetings", jlpt: "N5" },
  { word: "ありがとうございます", reading: "arigatou gozaimasu", meaning: "Спасибо (вежл.)", category: "greetings", jlpt: "N5" },
  { word: "すみません", reading: "sumimasen", meaning: "Извините / Простите", category: "greetings", jlpt: "N5" },
  { word: "はじめまして", reading: "hajimemashite", meaning: "Приятно познакомиться", category: "greetings", jlpt: "N5" },
  { word: "よろしくお願いします", reading: "yoroshiku onegaishimasu", meaning: "Прошу вас (о помощи/знакомстве)", category: "greetings", jlpt: "N5" },

  // Числа
  { word: "一", reading: "いち", meaning: "Один", category: "numbers", jlpt: "N5" },
  { word: "二", reading: "に", meaning: "Два", category: "numbers", jlpt: "N5" },
  { word: "三", reading: "さん", meaning: "Три", category: "numbers", jlpt: "N5" },
  { word: "四", reading: "し / よん", meaning: "Четыре", category: "numbers", jlpt: "N5" },
  { word: "五", reading: "ご", meaning: "Пять", category: "numbers", jlpt: "N5" },
  { word: "六", reading: "ろく", meaning: "Шесть", category: "numbers", jlpt: "N5" },
  { word: "七", reading: "しち / なな", meaning: "Семь", category: "numbers", jlpt: "N5" },
  { word: "八", reading: "はち", meaning: "Восемь", category: "numbers", jlpt: "N5" },
  { word: "九", reading: "きゅう / く", meaning: "Девять", category: "numbers", jlpt: "N5" },
  { word: "十", reading: "じゅう", meaning: "Десять", category: "numbers", jlpt: "N5" },

  // Время
  { word: "今日", reading: "きょう", meaning: "Сегодня", category: "time", jlpt: "N5" },
  { word: "明日", reading: "あした", meaning: "Завтра", category: "time", jlpt: "N5" },
  { word: "昨日", reading: "きのう", meaning: "Вчера", category: "time", jlpt: "N5" },
  { word: "今", reading: "いま", meaning: "Сейчас", category: "time", jlpt: "N5" },
  { word: "朝", reading: "あさ", meaning: "Утро", category: "time", jlpt: "N5" },
  { word: "昼", reading: "ひる", meaning: "Полдень / День", category: "time", jlpt: "N5" },
  { word: "夜", reading: "よる", meaning: "Ночь", category: "time", jlpt: "N5" },

  // Люди
  { word: "私", reading: "わたし", meaning: "Я", category: "people", jlpt: "N5" },
  { word: "友達", reading: "ともだち", meaning: "Друг", category: "people", jlpt: "N5" },
  { word: "先生", reading: "せんせい", meaning: "Учитель", category: "people", jlpt: "N5" },
  { word: "学生", reading: "がくせい", meaning: "Студент", category: "people", jlpt: "N5" },
  { word: "家族", reading: "かぞく", meaning: "Семья", category: "people", jlpt: "N5" },
  { word: "子供", reading: "こども", meaning: "Ребёнок", category: "people", jlpt: "N5" },

  // Места
  { word: "学校", reading: "がっこう", meaning: "Школа", category: "places", jlpt: "N5" },
  { word: "駅", reading: "えき", meaning: "Станция", category: "places", jlpt: "N5" },
  { word: "病院", reading: "びょういん", meaning: "Больница", category: "places", jlpt: "N5" },
  { word: "家", reading: "いえ / うち", meaning: "Дом", category: "places", jlpt: "N5" },
  { word: "会社", reading: "かいしゃ", meaning: "Компания", category: "places", jlpt: "N5" },

  // Еда
  { word: "食べ物", reading: "たべもの", meaning: "Еда", category: "food", jlpt: "N5" },
  { word: "飲み物", reading: "のみもの", meaning: "Напиток", category: "food", jlpt: "N5" },
  { word: "水", reading: "みず", meaning: "Вода", category: "food", jlpt: "N5" },
  { word: "お茶", reading: "おちゃ", meaning: "Чай", category: "food", jlpt: "N5" },
  { word: "ご飯", reading: "ごはん", meaning: "Рис / Еда", category: "food", jlpt: "N5" },

  // Глаголы
  { word: "食べる", reading: "たべる", meaning: "Есть (кушать)", category: "verbs", jlpt: "N5" },
  { word: "飲む", reading: "のむ", meaning: "Пить", category: "verbs", jlpt: "N5" },
  { word: "行く", reading: "いく", meaning: "Идти / Ехать", category: "verbs", jlpt: "N5" },
  { word: "来る", reading: "くる", meaning: "Приходить", category: "verbs", jlpt: "N5" },
  { word: "見る", reading: "みる", meaning: "Смотреть", category: "verbs", jlpt: "N5" },
  { word: "聞く", reading: "きく", meaning: "Слушать / Спрашивать", category: "verbs", jlpt: "N5" },
  { word: "読む", reading: "よむ", meaning: "Читать", category: "verbs", jlpt: "N5" },
  { word: "書く", reading: "かく", meaning: "Писать", category: "verbs", jlpt: "N5" },
  { word: "話す", reading: "はなす", meaning: "Говорить", category: "verbs", jlpt: "N5" },
  { word: "買う", reading: "かう", meaning: "Покупать", category: "verbs", jlpt: "N5" },

  // Прилагательные
  { word: "大きい", reading: "おおきい", meaning: "Большой", category: "adjectives", jlpt: "N5" },
  { word: "小さい", reading: "ちいさい", meaning: "Маленький", category: "adjectives", jlpt: "N5" },
  { word: "新しい", reading: "あたらしい", meaning: "Новый", category: "adjectives", jlpt: "N5" },
  { word: "古い", reading: "ふるい", meaning: "Старый", category: "adjectives", jlpt: "N5" },
  { word: "良い", reading: "よい / いい", meaning: "Хороший", category: "adjectives", jlpt: "N5" },
  { word: "高い", reading: "たかい", meaning: "Дорогой / Высокий", category: "adjectives", jlpt: "N5" },
  { word: "安い", reading: "やすい", meaning: "Дешёвый", category: "adjectives", jlpt: "N5" },
  { word: "楽しい", reading: "たのしい", meaning: "Весёлый / Приятный", category: "adjectives", jlpt: "N5" },
];

export const vocabCategories = [
  "greetings", "numbers", "time", "people", "places", "food", "verbs", "adjectives",
] as const;

export const categoryLabels: Record<string, string> = {
  greetings: "Приветствия",
  numbers: "Числа",
  time: "Время",
  people: "Люди",
  places: "Места",
  food: "Еда и напитки",
  verbs: "Глаголы",
  adjectives: "Прилагательные",
};
