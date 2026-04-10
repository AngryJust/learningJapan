"use client";

import { useState } from "react";
import { KanjiChar } from "@/data/kanji";
import AudioButton from "./AudioButton";
import WritingCanvas from "./WritingCanvas";

interface Props {
  kanji: KanjiChar;
  index?: number;
}

export default function KanjiCard({ kanji: k, index = 0 }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <div className="bg-card border border-accent/30 rounded-2xl overflow-hidden animate-fade-in-up">
        {/* Header with large kanji */}
        <div className="bg-accent/5 p-8 text-center relative">
          <button
            onClick={() => setExpanded(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-card/80 text-muted hover:text-foreground flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-8xl font-bold jp-char text-accent/80 mb-3 animate-fade-in">{k.char}</div>
          <AudioButton text={k.char} size="lg" className="mx-auto" />

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full font-medium">{k.jlpt}</span>
            <span className="text-xs bg-surface text-muted px-2.5 py-1 rounded-full">{k.strokes} черт</span>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-5">
          {/* Meanings */}
          <div>
            <div className="text-[10px] text-muted font-semibold tracking-wide uppercase mb-1.5">Значения</div>
            <div className="text-lg font-bold">{k.meanings.join(", ")}</div>
          </div>

          {/* Readings */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface rounded-xl p-3">
              <div className="text-[10px] text-muted font-semibold tracking-wide uppercase mb-1">Онъёми</div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold jp-char">{k.onyomi.join(", ")}</div>
                <AudioButton text={k.onyomi[0]} size="sm" />
              </div>
            </div>
            <div className="bg-surface rounded-xl p-3">
              <div className="text-[10px] text-muted font-semibold tracking-wide uppercase mb-1">Кунъёми</div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold jp-char">{k.kunyomi.join(", ")}</div>
                <AudioButton text={k.kunyomi[0]} size="sm" />
              </div>
            </div>
          </div>

          {/* Writing practice */}
          <div>
            <WritingCanvas referenceChar={k.char} size={180} />
          </div>

          {/* Examples */}
          <div>
            <div className="text-[10px] text-muted font-semibold tracking-wide uppercase mb-2">Примеры</div>
            <div className="space-y-2">
              {k.examples.map((ex, i) => (
                <div key={i} className="bg-surface rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold jp-char">{ex.word}</div>
                    <div className="text-xs text-muted">{ex.reading} — {ex.meaning}</div>
                  </div>
                  <AudioButton text={ex.word} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setExpanded(true)}
      className="bg-card border border-card-border rounded-2xl p-5 text-left card-interactive animate-fade-in-up w-full group"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start gap-5">
        <div className="text-5xl font-bold jp-char text-accent/60 group-hover:text-accent transition-colors">{k.char}</div>
        <div className="flex-1 min-w-0">
          <div className="font-bold mb-0.5">{k.meanings.join(", ")}</div>
          <div className="text-xs text-muted">{k.onyomi.join(", ")} / {k.kunyomi.join(", ")}</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full">{k.jlpt}</span>
            <span className="text-[10px] text-muted">{k.strokes} черт</span>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}
