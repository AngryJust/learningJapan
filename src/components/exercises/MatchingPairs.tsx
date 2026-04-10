"use client";

import { useState, useMemo } from "react";
import { MatchingPairsQuestion } from "@/lib/exercises";

interface Props {
  question: MatchingPairsQuestion;
  onAnswer: (correct: boolean) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchingPairs({ question, onAnswer }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);

  const pairMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const [left, right] of question.pairs) m.set(left, right);
    return m;
  }, [question.pairs]);

  const leftItems = useMemo(() => question.pairs.map((p) => p[0]), [question.pairs]);
  const rightItems = useMemo(() => shuffle(question.pairs.map((p) => p[1])), [question.pairs]);

  function handleLeftClick(item: string) {
    if (matched.has(item)) return;
    setSelectedLeft(item);
    setWrong(null);
  }

  function handleRightClick(item: string) {
    if (!selectedLeft || matched.has(item)) return;
    if (pairMap.get(selectedLeft) === item) {
      const newMatched = new Set(matched);
      newMatched.add(selectedLeft);
      setMatched(newMatched);
      setSelectedLeft(null);
      setWrong(null);
      if (newMatched.size === question.pairs.length) onAnswer(true);
    } else {
      setWrong(item);
      setTimeout(() => setWrong(null), 500);
    }
  }

  return (
    <div>
      <p className="text-[10px] text-muted text-center mb-4 tracking-wide uppercase">Нажмите на символ, затем на его пару</p>
      <div className="grid grid-cols-2 gap-4" role="group" aria-label="Найди пару">
        <div className="space-y-2" role="listbox" aria-label="Символы">
          {leftItems.map((item) => {
            const isMatched = matched.has(item);
            const isSelected = selectedLeft === item;
            let cls = "bg-card border border-card-border";
            if (isMatched) cls = "bg-success-light border-success/30 text-success";
            else if (isSelected) cls = "bg-accent-light border-accent/40 text-accent";

            return (
              <button
                key={item}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleLeftClick(item)}
                disabled={isMatched}
                className={`${cls} w-full rounded-xl p-4 text-2xl font-bold jp-char transition-all`}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="space-y-2" role="listbox" aria-label="Значения">
          {rightItems.map((item) => {
            const isMatched = [...matched].some((left) => pairMap.get(left) === item);
            const isWrong = wrong === item;
            let cls = "bg-card border border-card-border";
            if (isMatched) cls = "bg-success-light border-success/30 text-success";
            else if (isWrong) cls = "bg-danger-light border-danger/30";

            return (
              <button
                key={item}
                role="option"
                aria-selected={false}
                onClick={() => handleRightClick(item)}
                disabled={isMatched}
                className={`${cls} w-full rounded-xl p-4 text-sm font-medium transition-all`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
