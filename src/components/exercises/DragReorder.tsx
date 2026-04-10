"use client";

import { useState } from "react";
import { DragReorderQuestion } from "@/lib/exercises";

interface Props {
  question: DragReorderQuestion;
  onAnswer: (correct: boolean, userAnswer?: string) => void;
}

export default function DragReorder({ question, onAnswer }: Props) {
  const [items, setItems] = useState<string[]>(question.scrambled);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  function handleDragStart(idx: number) {
    setDragIdx(idx);
  }

  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const newItems = [...items];
    const [dragged] = newItems.splice(dragIdx, 1);
    newItems.splice(idx, 0, dragged);
    setItems(newItems);
    setDragIdx(idx);
  }

  function handleDragEnd() {
    setDragIdx(null);
  }

  function handleTap(idx: number) {
    if (submitted) return;
    if (selectedIdx === null) {
      setSelectedIdx(idx);
    } else {
      const newItems = [...items];
      [newItems[selectedIdx], newItems[idx]] = [newItems[idx], newItems[selectedIdx]];
      setItems(newItems);
      setSelectedIdx(null);
    }
  }

  function handleSubmit() {
    const correct = items.every((item, i) => item === question.correctOrder[i]);
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct, correct ? undefined : items.join(" "));
  }

  return (
    <div>
      <div className="bg-card border border-card-border rounded-2xl p-6 text-center mb-5">
        <p className="text-[10px] text-muted tracking-wide uppercase mb-2">Расположите слова в правильном порядке</p>
        <p className="text-base font-medium">{question.instruction}</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-5 min-h-[56px]" role="list" aria-label="Перетаскиваемые слова">
        {items.map((item, idx) => {
          let cls = "bg-card border border-card-border cursor-grab active:cursor-grabbing";
          if (submitted) {
            cls = item === question.correctOrder[idx]
              ? "bg-success-light border-success/30 text-success"
              : "bg-danger-light border-danger/30 text-danger";
          } else if (selectedIdx === idx) {
            cls = "bg-accent-light border-accent/40 text-accent";
          }

          return (
            <div
              key={`${item}-${idx}`}
              role="listitem"
              tabIndex={submitted ? -1 : 0}
              draggable={!submitted}
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              onClick={() => handleTap(idx)}
              onKeyDown={(e) => {
                if (submitted) return;
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleTap(idx); }
                else if (e.key === "ArrowRight" && idx < items.length - 1) {
                  e.preventDefault();
                  const newItems = [...items];
                  [newItems[idx], newItems[idx + 1]] = [newItems[idx + 1], newItems[idx]];
                  setItems(newItems);
                } else if (e.key === "ArrowLeft" && idx > 0) {
                  e.preventDefault();
                  const newItems = [...items];
                  [newItems[idx], newItems[idx - 1]] = [newItems[idx - 1], newItems[idx]];
                  setItems(newItems);
                }
              }}
              className={`${cls} rounded-lg px-4 py-2 text-base font-medium transition-all select-none focus:outline-none focus:ring-2 focus:ring-accent/50`}
            >
              {item}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full bg-accent text-white rounded-xl py-3 font-semibold hover:bg-accent-hover transition-colors"
        >
          Проверить порядок
        </button>
      )}

      {submitted && (
        <div className={`p-4 rounded-xl animate-fade-in-up ${isCorrect ? "bg-success-light border border-success/20" : "bg-danger-light border border-danger/20"}`}>
          {isCorrect ? (
            <p className="text-success font-semibold text-sm text-center">Правильно!</p>
          ) : (
            <div className="text-center">
              <p className="text-danger font-semibold text-sm">Не совсем!</p>
              <p className="text-xs text-muted mt-1">
                Правильный порядок: <span className="font-bold text-foreground">{question.correctOrder.join(" ")}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
