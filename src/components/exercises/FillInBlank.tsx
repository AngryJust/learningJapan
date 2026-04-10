"use client";

import { FillInBlankQuestion } from "@/lib/exercises";

interface Props {
  question: FillInBlankQuestion;
  onAnswer: (correct: boolean, userAnswer?: string) => void;
  selected: string | null;
  onSelect: (answer: string) => void;
}

export default function FillInBlank({ question, onAnswer, selected, onSelect }: Props) {
  function handleClick(opt: string) {
    if (selected) return;
    onSelect(opt);
    const correct = opt === question.correct;
    onAnswer(correct, correct ? undefined : opt);
  }

  return (
    <div>
      <div className="bg-card border border-card-border rounded-2xl p-8 text-center mb-5">
        <p className="text-[10px] text-muted tracking-wide uppercase mb-4">Заполните пропуск</p>
        <div className="text-xl font-bold jp-char">
          {question.before}
          <span
            className={`inline-block min-w-[3rem] mx-1 px-3 py-1 rounded-lg border-b-2 transition-all ${
              selected
                ? selected === question.correct
                  ? "border-success bg-success-light text-success"
                  : "border-danger bg-danger-light text-danger"
                : "border-accent/40 border-dashed bg-accent/5"
            }`}
          >
            {selected || "___"}
          </span>
          {question.after}
        </div>
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
              className={`${cls} rounded-xl p-3 text-sm font-medium transition-all`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
