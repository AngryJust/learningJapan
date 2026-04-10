"use client";

import { useState } from "react";
import Link from "next/link";
import { generateReviewExercises } from "@/lib/srs";
import { reviewSRSItem, addMistakeAPI } from "@/lib/api";
import { useSRSProgress } from "@/lib/use-srs-state";
import { useIsMounted } from "@/lib/use-course-state";
import ExerciseRunner from "@/components/exercises/ExerciseRunner";

export default function ReviewPage() {
  const srs = useSRSProgress();
  const mounted = useIsMounted();
  const [sessionStarted, setSessionStarted] = useState(false);
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);

  if (!mounted || !srs.loaded) return null;

  if (result) {
    const pct = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
    return (
      <div className="max-w-md mx-auto text-center py-12 animate-fade-in-up">
        <div className="text-5xl jp-char opacity-15 mb-4 select-none">復</div>
        <div className="bg-card border border-card-border rounded-2xl p-8 mb-6">
          <div className={`text-5xl font-bold font-[var(--font-display)] mb-1 ${pct >= 60 ? "text-success" : "text-danger"}`}>{pct}%</div>
          <p className="text-sm text-muted">{result.correct} / {result.total} правильно</p>
          <div className="brush-line w-12 mx-auto my-4" />
          <p className="text-sm text-muted">Повторение завершено!</p>
        </div>
        <div className="flex gap-2 justify-center">
          <button onClick={() => { setSessionStarted(false); setResult(null); srs.refresh(); }} className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors">
            Ещё раз
          </button>
          <Link href="/" className="px-5 py-2.5 bg-card border border-card-border rounded-xl text-sm font-medium hover:border-accent/50 transition-colors">
            На главную
          </Link>
        </div>
      </div>
    );
  }

  if (srs.dueCount === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 animate-fade-in">
        <div className="text-5xl jp-char opacity-15 mb-4 select-none">完</div>
        <h1 className="font-[var(--font-display)] text-2xl font-bold mb-2">Всё повторено!</h1>
        <p className="text-muted text-sm mb-6">Нет элементов для повторения. Возвращайтесь позже!</p>
        <Link href="/course" className="text-accent text-sm font-medium hover:underline">Продолжить курс</Link>
      </div>
    );
  }

  if (!sessionStarted) {
    return (
      <div className="max-w-md mx-auto text-center py-12 animate-fade-in-up">
        <div className="text-5xl jp-char opacity-15 mb-4 select-none">復</div>
        <h1 className="font-[var(--font-display)] text-2xl font-bold mb-2">Повторение</h1>
        <p className="text-muted text-sm mb-6">
          {srs.dueCount} {srs.dueCount === 1 ? "элемент" : srs.dueCount < 5 ? "элемента" : "элементов"} для повторения
        </p>
        <button
          onClick={() => setSessionStarted(true)}
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent-hover transition-colors"
        >
          Начать повторение
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    );
  }

  const dueKeys = srs.dueItems.map((d) => d.key);
  const questions = generateReviewExercises(dueKeys);

  async function handleComplete(correct: number, total: number) {
    const passed = total > 0 ? correct / total >= 0.6 : false;
    for (const key of dueKeys) {
      await reviewSRSItem(key, passed);
    }
    srs.refresh();
    setResult({ correct, total });
  }

  async function handleMistake(info: { itemKey: string; puzzleType: string; userAnswer: string; correctAnswer: string; prompt: string }) {
    await addMistakeAPI(info);
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted text-sm">Не удалось создать упражнения.</p>
        <Link href="/" className="text-accent text-sm font-medium hover:underline mt-4 inline-block">На главную</Link>
      </div>
    );
  }

  return (
    <div className="py-4 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="font-[var(--font-display)] text-xl font-bold">Повторение</h1>
        <p className="text-xs text-muted mt-1">{srs.dueCount} элементов</p>
      </div>
      <ExerciseRunner questions={questions} onComplete={handleComplete} onMistake={handleMistake} />
    </div>
  );
}
