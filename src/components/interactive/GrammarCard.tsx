"use client";

import { useState } from "react";
import { GrammarPoint } from "@/data/grammar";
import AudioButton from "./AudioButton";

interface Props {
  point: GrammarPoint;
  index?: number;
}

export default function GrammarCard({ point: g, index = 0 }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <div className="bg-card border border-accent/30 rounded-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-lg">{g.title}</h3>
              <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">{g.jlpt}</span>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="w-9 h-9 rounded-full bg-surface text-muted hover:text-foreground flex items-center justify-center transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Structure */}
          <div className="bg-accent/5 border border-accent/10 rounded-xl p-3 mb-4">
            <div className="text-[10px] text-accent font-semibold tracking-wide uppercase mb-1">Структура</div>
            <p className="text-sm font-mono font-medium">{g.structure}</p>
          </div>

          {/* Explanation */}
          <div className="mb-4">
            <div className="text-[10px] text-muted font-semibold tracking-wide uppercase mb-1.5">Объяснение</div>
            <p className="text-sm text-muted leading-relaxed">{g.explanation}</p>
          </div>
        </div>

        {/* Examples */}
        <div className="p-6 pt-0">
          <div className="text-[10px] text-muted font-semibold tracking-wide uppercase mb-2">Примеры</div>
          <div className="space-y-2">
            {g.examples.map((ex, i) => (
              <div key={i} className="bg-surface rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-base font-bold jp-char">{ex.japanese}</div>
                    <div className="text-xs text-muted mt-0.5">{ex.reading}</div>
                    <div className="text-xs mt-1.5">{ex.english}</div>
                  </div>
                  <AudioButton text={ex.japanese} size="md" className="flex-shrink-0 ml-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setExpanded(true)}
      className="bg-card border border-card-border rounded-2xl p-6 text-left card-interactive animate-fade-in-up w-full group"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold group-hover:text-accent transition-colors">{g.title}</h3>
          <p className="text-xs text-accent font-mono mt-1">{g.structure}</p>
          <p className="text-xs text-muted mt-2 line-clamp-2">{g.explanation}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">{g.jlpt}</span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
