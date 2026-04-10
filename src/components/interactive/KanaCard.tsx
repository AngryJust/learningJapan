"use client";

import { useState } from "react";
import { KanaChar } from "@/data/hiragana";
import { hiragana } from "@/data/hiragana";
import { katakana } from "@/data/katakana";
import AudioButton from "./AudioButton";
import WritingCanvas from "./WritingCanvas";

interface Props {
  char: KanaChar;
  type: "hiragana" | "katakana";
  index?: number;
}

export default function KanaCard({ char, type, index = 0 }: Props) {
  const [expanded, setExpanded] = useState(false);

  // Find counterpart
  const counterpart = type === "hiragana"
    ? katakana.find((k) => k.romaji === char.romaji)
    : hiragana.find((h) => h.romaji === char.romaji);

  const counterpartLabel = type === "hiragana" ? "Катакана" : "Хирагана";

  if (expanded) {
    return (
      <div
        className="col-span-full bg-card border border-accent/30 rounded-2xl p-6 animate-fade-in-up"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Large character with writing animation */}
            <div className="relative">
              <div className="text-5xl sm:text-7xl font-bold jp-char text-accent animate-fade-in">{char.char}</div>
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent/20 rounded-full">
                <div className="h-full bg-accent rounded-full" style={{ animation: "shimmer 1.5s ease-in-out", width: "100%" }} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{char.romaji}</div>
              <div className="text-xs text-muted mt-1 tracking-wide uppercase">
                {type === "hiragana" ? "Хирагана" : "Катакана"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AudioButton text={char.char} size="lg" />
            <button
              onClick={() => setExpanded(false)}
              className="w-9 h-9 rounded-full bg-surface text-muted hover:text-foreground flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mnemonic hint */}
        {char.hint && (
          <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 mb-4">
            <div className="text-[10px] text-accent font-semibold tracking-wide uppercase mb-1">Мнемоника</div>
            <p className="text-sm">{char.hint}</p>
          </div>
        )}

        {/* Context words */}
        {char.contextWords && char.contextWords.length > 0 && (
          <div className="mb-4">
            <div className="text-[10px] text-muted font-semibold tracking-wide uppercase mb-2">Слова с этим символом</div>
            <div className="space-y-1.5">
              {char.contextWords.map((w, i) => (
                <div key={i} className="bg-surface rounded-lg px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold jp-char">{w.word}</span>
                    <span className="text-xs text-muted">({w.reading})</span>
                    <span className="text-xs text-muted">— {w.meaning}</span>
                  </div>
                  <AudioButton text={w.word} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Writing practice */}
        <div className="mb-4">
          <WritingCanvas referenceChar={char.char} size={160} />
        </div>

        {/* Counterpart */}
        {counterpart && (
          <div className="bg-surface rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-muted font-semibold tracking-wide uppercase mb-1">{counterpartLabel}</div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold jp-char">{counterpart.char}</span>
                <span className="text-sm text-muted">{counterpart.romaji}</span>
              </div>
            </div>
            <AudioButton text={counterpart.char} size="md" />
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => setExpanded(true)}
      className="bg-card border border-card-border rounded-xl p-3 text-center card-interactive animate-fade-in-up group"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      <div className="text-3xl font-bold jp-char mb-1 group-hover:text-accent transition-colors">{char.char}</div>
      <div className="text-xs text-accent font-medium">{char.romaji}</div>
      <div className="mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-5 h-5 mx-auto rounded-full bg-accent/10 text-accent flex items-center justify-center">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
