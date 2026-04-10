"use client";

import { useState } from "react";
import { TypeAnswerQuestion } from "@/lib/exercises";

interface Props {
  question: TypeAnswerQuestion;
  onAnswer: (correct: boolean, userAnswer?: string) => void;
}

export default function TypeAnswer({ question, onAnswer }: Props) {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitted || !input.trim()) return;
    const normalized = input.trim().toLowerCase();
    const correct = question.acceptedAnswers.some((ans) => ans.toLowerCase() === normalized);
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct, correct ? undefined : normalized);
  }

  return (
    <div>
      <div className="bg-card border border-card-border rounded-2xl p-8 text-center mb-5">
        <p className="text-[10px] text-muted tracking-wide uppercase mb-3">Введите чтение/значение</p>
        <div className="text-5xl font-bold jp-char mb-2">{question.prompt}</div>
        {question.hint && (
          <p className="text-xs text-muted opacity-60">Подсказка: {question.hint}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={submitted}
          autoFocus
          placeholder="Введите ответ..."
          className="w-full bg-card border border-card-border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
        />
        {!submitted && (
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-full bg-accent text-white rounded-xl py-3 font-semibold hover:bg-accent-hover disabled:opacity-40 transition-all"
          >
            Проверить
          </button>
        )}
      </form>

      {submitted && (
        <div className={`mt-4 p-4 rounded-xl animate-fade-in-up ${isCorrect ? "bg-success-light border border-success/20" : "bg-danger-light border border-danger/20"}`}>
          {isCorrect ? (
            <p className="text-success font-semibold text-sm">Правильно!</p>
          ) : (
            <div>
              <p className="text-danger font-semibold text-sm">Не совсем!</p>
              <p className="text-xs text-muted mt-1">
                Правильный ответ: <span className="font-bold text-foreground">{question.acceptedAnswers[0]}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
