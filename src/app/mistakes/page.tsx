"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { generateExercisesFromMistakes } from "@/lib/mistakes";
import { useMistakesState } from "@/lib/use-mistakes-state";
import { deleteMistakeAPI, addMistakeAPI } from "@/lib/api";
import { useIsMounted } from "@/lib/use-course-state";
import ExerciseRunner from "@/components/exercises/ExerciseRunner";

const typeLabelsRu: Record<string, string> = {
  hiragana: "Хирагана",
  katakana: "Катакана",
  kanji: "Кандзи",
  vocab: "Словарь",
  grammar: "Грамматика",
  item: "Разное",
  other: "Другое",
};

export default function MistakesPage() {
  const mistakesData = useMistakesState();
  const mounted = useIsMounted();
  const [practicing, setPracticing] = useState(false);
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);
  const [expandedType, setExpandedType] = useState<string | null>(null);

  const allMistakes = mistakesData.mistakes;

  const grouped = useMemo(() => {
    const g: Record<string, typeof allMistakes> = {};
    for (const m of allMistakes) {
      const type = m.itemKey.split(":")[0] || "other";
      if (!g[type]) g[type] = [];
      g[type].push(m);
    }
    return g;
  }, [allMistakes]);

  if (!mounted || !mistakesData.loaded) return null;

  if (result) {
    const pct = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
    return (
      <div className="max-w-md mx-auto text-center py-12 animate-fade-in-up">
        <div className="bg-card border border-card-border rounded-2xl p-8 mb-6">
          <div className={`text-5xl font-bold font-[var(--font-display)] mb-1 ${pct >= 60 ? "text-success" : "text-danger"}`}>{pct}%</div>
          <p className="text-sm text-muted">{result.correct} / {result.total} правильно</p>
        </div>
        <button onClick={() => { setPracticing(false); setResult(null); mistakesData.refresh(); }} className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors">
          Назад к ошибкам
        </button>
      </div>
    );
  }

  if (practicing) {
    const questions = generateExercisesFromMistakes(allMistakes);
    if (questions.length === 0) {
      setPracticing(false);
      return null;
    }

    async function handleMistake(info: { itemKey: string; puzzleType: string; userAnswer: string; correctAnswer: string; prompt: string }) {
      await addMistakeAPI(info);
    }

    return (
      <div className="py-4 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="font-[var(--font-display)] text-xl font-bold">Работа над ошибками</h1>
        </div>
        <ExerciseRunner
          questions={questions}
          onComplete={(c, t) => setResult({ correct: c, total: t })}
          onMistake={handleMistake}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 animate-fade-in-up">
        <h1 className="font-[var(--font-display)] text-3xl font-bold tracking-tight">Мои ошибки</h1>
        <p className="text-muted text-sm mt-2">{allMistakes.length} {allMistakes.length === 1 ? "ошибка" : "ошибок"}</p>
        <div className="brush-line w-16 mt-4" />
      </div>

      {allMistakes.length > 0 && (
        <div className="flex gap-2 mb-6 animate-fade-in-up delay-1">
          <button
            onClick={() => setPracticing(true)}
            className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors"
          >
            Практиковать ошибки
          </button>
          <button
            onClick={async () => {
              if (confirm("Удалить все ошибки?")) {
                await deleteMistakeAPI();
                mistakesData.refresh();
              }
            }}
            className="text-xs text-muted hover:text-danger transition-colors px-3"
          >
            Очистить все
          </button>
        </div>
      )}

      {allMistakes.length === 0 ? (
        <div className="bg-card border border-card-border rounded-2xl p-10 text-center animate-fade-in">
          <div className="text-4xl jp-char opacity-15 mb-3">完</div>
          <p className="text-muted text-sm mb-4">Ошибок нет! Отличная работа!</p>
          <Link href="/course" className="text-accent text-sm font-medium hover:underline">Продолжить курс</Link>
        </div>
      ) : (
        <div className="space-y-3 animate-fade-in-up delay-2">
          {Object.entries(grouped).map(([type, entries]) => (
            <div key={type} className="bg-card border border-card-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedType(expandedType === type ? null : type)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-card-hover transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm">{typeLabelsRu[type] || type}</span>
                  <span className="text-xs bg-danger-light text-danger px-2 py-0.5 rounded-full">{entries.length}</span>
                </div>
                <svg className={`w-4 h-4 text-muted transition-transform ${expandedType === type ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedType === type && (
                <div className="border-t border-card-border px-5 py-3 space-y-2">
                  {entries.slice(0, 20).map((m) => (
                    <div key={m.id} className="flex items-center justify-between text-sm py-1.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-bold jp-char flex-shrink-0">{m.prompt}</span>
                        <span className="text-danger text-xs line-through">{m.userAnswer}</span>
                        <span className="text-success text-xs font-medium">{m.correctAnswer}</span>
                      </div>
                      <button
                        onClick={async () => { await deleteMistakeAPI(m.id); mistakesData.refresh(); }}
                        className="text-muted hover:text-danger transition-colors flex-shrink-0 ml-2"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
