"use client";

import { useState } from "react";
import { VocabWord, categoryLabels } from "@/data/vocabulary";
import AudioButton from "./AudioButton";

interface Props {
  word: VocabWord;
  index?: number;
}

export default function VocabCard({ word: v, index = 0 }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <div className="bg-card border border-accent/30 rounded-2xl p-6 animate-fade-in-up">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-4xl font-bold jp-char mb-1">{v.word}</div>
            <div className="text-sm text-muted">{v.reading}</div>
          </div>
          <div className="flex items-center gap-2">
            <AudioButton text={v.word} size="lg" />
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

        <div className="bg-surface rounded-xl p-4 mb-4">
          <div className="text-[10px] text-muted font-semibold tracking-wide uppercase mb-1">Перевод</div>
          <div className="text-lg font-bold">{v.meaning}</div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-accent/10 text-accent px-2.5 py-1 rounded-full font-medium">{v.jlpt}</span>
          <span className="text-[10px] bg-surface text-muted px-2.5 py-1 rounded-full">
            {categoryLabels[v.category] || v.category}
          </span>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setExpanded(true)}
      className="bg-card border border-card-border rounded-xl px-4 py-3 flex items-center justify-between w-full text-left card-interactive animate-fade-in-up group"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold jp-char group-hover:text-accent transition-colors">{v.word}</span>
        <span className="text-xs text-muted">{v.reading}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted">{v.meaning}</span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5z" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}
