"use client";

import { ContentRef } from "@/data/course/types";
import { hiragana, groupLabels } from "@/data/hiragana";
import { katakana } from "@/data/katakana";
import { kanji } from "@/data/kanji";
import { vocabulary } from "@/data/vocabulary";
import { grammar } from "@/data/grammar";
import KanaCard from "@/components/interactive/KanaCard";
import KanjiCard from "@/components/interactive/KanjiCard";
import VocabCard from "@/components/interactive/VocabCard";
import GrammarCard from "@/components/interactive/GrammarCard";

interface Props {
  contentRefs: ContentRef[];
}

function KanaLesson({ groups, type }: { groups: string[]; type: "hiragana" | "katakana" }) {
  const chars = (type === "hiragana" ? hiragana : katakana).filter((c) =>
    groups.includes(c.group)
  );

  const groupedChars = groups.map((g) => ({
    group: g,
    label: groupLabels[g] || g,
    chars: chars.filter((c) => c.group === g),
  }));

  return (
    <div className="space-y-6">
      {groupedChars.map((gc) => (
        <div key={gc.group}>
          <h3 className="text-xs font-semibold tracking-wide uppercase text-muted mb-3">{gc.label}</h3>
          <div className="grid grid-cols-5 gap-2">
            {gc.chars.map((c, i) => (
              <KanaCard key={c.char} char={c} type={type} index={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function KanjiLesson({ chars }: { chars: string[] }) {
  const kanjiList = kanji.filter((k) => chars.includes(k.char));

  return (
    <div className="space-y-3">
      {kanjiList.map((k, i) => (
        <KanjiCard key={k.char} kanji={k} index={i} />
      ))}
    </div>
  );
}

function VocabLesson({ category, words }: { category: string; words?: string[] }) {
  let vocabList = vocabulary.filter((v) => v.category === category);
  if (words) vocabList = vocabList.filter((v) => words.includes(v.word));

  return (
    <div className="space-y-1.5">
      {vocabList.map((v, i) => (
        <VocabCard key={`${v.word}-${i}`} word={v} index={i} />
      ))}
    </div>
  );
}

function GrammarLesson({ ids }: { ids: string[] }) {
  const points = grammar.filter((g) => ids.includes(g.id));

  return (
    <div className="space-y-4">
      {points.map((g, i) => (
        <GrammarCard key={g.id} point={g} index={i} />
      ))}
    </div>
  );
}

export default function LessonRenderer({ contentRefs }: Props) {
  return (
    <div className="space-y-8">
      {contentRefs.map((ref, i) => {
        switch (ref.type) {
          case "hiragana":
            return <KanaLesson key={i} groups={ref.groups} type="hiragana" />;
          case "katakana":
            return <KanaLesson key={i} groups={ref.groups} type="katakana" />;
          case "kanji":
            return <KanjiLesson key={i} chars={ref.chars} />;
          case "vocabulary":
            return <VocabLesson key={i} category={ref.category} words={ref.words} />;
          case "grammar":
            return <GrammarLesson key={i} ids={ref.ids} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
