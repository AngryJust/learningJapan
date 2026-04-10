"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { getDay } from "@/data/course";
import { useCourseProgress, useIsMounted } from "@/lib/use-course-state";
import { generateExercises } from "@/lib/exercises";
import { completeDay as completeDayAPI, addMistakeAPI, seedSRSItems } from "@/lib/api";
import { getSRSKeysForDay } from "@/lib/srs";
import ExerciseRunner from "@/components/exercises/ExerciseRunner";
import DayComplete from "@/components/course/DayComplete";
import ReviewGate from "@/components/course/ReviewGate";

export default function ExercisesPage({ params }: { params: Promise<{ dayNumber: string }> }) {
  const { dayNumber } = use(params);
  const dayNum = parseInt(dayNumber, 10);
  const mounted = useIsMounted();
  const progress = useCourseProgress();
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);

  const day = !isNaN(dayNum) && dayNum > 0 ? getDay(dayNum) : undefined;
  const unlocked = progress.loaded ? dayNum <= progress.currentDay : true;

  const questions = useMemo(() => {
    if (!day) return [];
    return generateExercises(day.exercises);
  }, [day]);

  if (!day) {
    return (
      <div className="text-center py-24 animate-fade-in">
        <div className="text-5xl jp-char opacity-15 mb-4">無</div>
        <h1 className="font-[var(--font-display)] text-2xl font-bold mb-2">День не найден</h1>
        <Link href="/course" className="text-accent text-sm font-medium hover:underline">Назад к карте курса</Link>
      </div>
    );
  }

  if (mounted && progress.loaded && !unlocked) {
    return (
      <div className="text-center py-24 animate-fade-in">
        <div className="text-5xl jp-char opacity-15 mb-4">鍵</div>
        <h1 className="font-[var(--font-display)] text-2xl font-bold mb-2">День {dayNum} закрыт</h1>
        <Link href="/course" className="text-accent text-sm font-medium hover:underline">Назад к карте курса</Link>
      </div>
    );
  }

  async function handleComplete(correct: number, total: number) {
    await completeDayAPI({
      day: dayNum,
      completedAt: new Date().toISOString(),
      score: total > 0 ? Math.round((correct / total) * 100) : 0,
      totalQuestions: total,
      correctAnswers: correct,
    });

    // Seed SRS items for this day
    if (day) {
      const keys = getSRSKeysForDay(day);
      if (keys.length > 0) await seedSRSItems(keys);
    }

    progress.refresh();
    setResult({ correct, total });
  }

  async function handleMistake(info: { itemKey: string; puzzleType: string; userAnswer: string; correctAnswer: string; prompt: string }) {
    await addMistakeAPI(info);
  }

  if (result) {
    const passed = result.total > 0 ? result.correct / result.total >= 0.6 : false;
    return (
      <div className="py-8 animate-fade-in-up">
        <DayComplete day={dayNum} correct={result.correct} total={result.total} passed={passed} />
      </div>
    );
  }

  if (!mounted || questions.length === 0) {
    return (
      <div className="text-center py-24 animate-fade-in">
        <p className="text-muted text-sm">Загрузка упражнений...</p>
      </div>
    );
  }

  return (
    <ReviewGate dayNumber={dayNum}>
      <div className="py-4 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="font-[var(--font-display)] text-xl font-bold">День {dayNum}</h1>
          <p className="text-xs text-muted mt-1">{day.title}</p>
        </div>
        <ExerciseRunner questions={questions} onComplete={handleComplete} onMistake={handleMistake} />
      </div>
    </ReviewGate>
  );
}
