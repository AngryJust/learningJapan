"use client";

import { useState, useEffect } from "react";
import { ListenTypeQuestion } from "@/lib/exercises";
import { speak } from "@/lib/audio";

interface Props {
  question: ListenTypeQuestion;
  onAnswer: (correct: boolean, userAnswer?: string) => void;
}

export default function ListenType({ question, onAnswer }: Props) {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => speak(question.audioText), 300);
    return () => clearTimeout(timer);
  }, [question.audioText]);

  function handleReplay(e: React.MouseEvent) {
    e.stopPropagation();
    speak(question.audioText);
  }

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
        <p className="text-[10px] text-muted tracking-wide uppercase mb-4">Введите то, что слышите</p>
        <button
          onClick={handleReplay}
          className="w-16 h-16 rounded-full bg-accent/10 text-accent hover:bg-accent/20 flex items-center justify-center mx-auto transition-all hover:scale-105"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5zM14 3.23v2.06a6.5 6.5 0 010 13.42v2.06A8.5 8.5 0 0014 3.23z" />
          </svg>
        </button>
        <p className="text-xs text-muted mt-3">Нажмите, чтобы прослушать ещё раз</p>
        {question.hint && (
          <p className="text-xs text-muted mt-1 opacity-60">Подсказка: {question.hint}</p>
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
