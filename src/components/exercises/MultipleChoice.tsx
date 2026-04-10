"use client";

import { MultipleChoiceQuestion } from "@/lib/exercises";

interface Props {
  question: MultipleChoiceQuestion;
  onAnswer: (correct: boolean, userAnswer?: string) => void;
  selected: string | null;
  onSelect: (answer: string) => void;
}

export default function MultipleChoice({ question, onAnswer, selected, onSelect }: Props) {
  function handleClick(opt: string) {
    if (selected) return;
    onSelect(opt);
    const correct = opt === question.correct;
    onAnswer(correct, correct ? undefined : opt);
  }

  return (
    <div>
      <div className="bg-card border border-card-border rounded-2xl p-8 text-center mb-5">
        <p className="text-[10px] text-muted tracking-wide uppercase mb-3">Какое чтение/значение?</p>
        <div className="text-5xl font-bold jp-char">{question.prompt}</div>
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
              aria-pressed={selected === opt}
              className={`${cls} rounded-xl p-4 text-sm font-medium transition-all`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
