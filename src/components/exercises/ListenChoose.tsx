"use client";

import { useEffect } from "react";
import { ListenChooseQuestion } from "@/lib/exercises";
import { speak } from "@/lib/audio";

interface Props {
  question: ListenChooseQuestion;
  onAnswer: (correct: boolean, userAnswer?: string) => void;
  selected: string | null;
  onSelect: (answer: string) => void;
}

export default function ListenChoose({ question, onAnswer, selected, onSelect }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => speak(question.audioText), 300);
    return () => clearTimeout(timer);
  }, [question.audioText]);

  function handleClick(opt: string) {
    if (selected) return;
    onSelect(opt);
    const correct = opt === question.correct;
    onAnswer(correct, correct ? undefined : opt);
  }

  function handleReplay(e: React.MouseEvent) {
    e.stopPropagation();
    speak(question.audioText);
  }

  return (
    <div>
      <div className="bg-card border border-card-border rounded-2xl p-8 text-center mb-5">
        <p className="text-[10px] text-muted tracking-wide uppercase mb-4">Прослушайте и выберите</p>
        <button
          onClick={handleReplay}
          className="w-16 h-16 rounded-full bg-accent/10 text-accent hover:bg-accent/20 flex items-center justify-center mx-auto transition-all hover:scale-105"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5zM14 3.23v2.06a6.5 6.5 0 010 13.42v2.06A8.5 8.5 0 0014 3.23z" />
          </svg>
        </button>
        <p className="text-xs text-muted mt-3">Нажмите, чтобы прослушать ещё раз</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {question.options.map((opt) => {
          let cls = "bg-card border border-card-border hover:border-accent/50 hover:bg-card-hover";
          if (selected) {
            if (opt === question.correct) cls = "bg-success-light border-success text-success";
            else if (opt === selected) cls = "bg-danger-light border-danger text-danger";
            else cls = "bg-card border border-card-border opacity-40";
          }
          return (
            <button
              key={opt}
              onClick={() => handleClick(opt)}
              disabled={!!selected}
              className={`${cls} rounded-xl p-4 text-2xl font-bold jp-char transition-all`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
