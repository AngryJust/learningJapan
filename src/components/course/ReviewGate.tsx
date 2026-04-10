"use client";

import { useState } from "react";
import { generateReviewExercises } from "@/lib/srs";
import { reviewSRSItem, addMistakeAPI } from "@/lib/api";
import { useSRSProgress } from "@/lib/use-srs-state";
import { useCourseProgress } from "@/lib/use-course-state";
import ExerciseRunner from "@/components/exercises/ExerciseRunner";

interface Props {
  dayNumber: number;
  children: React.ReactNode;
}

export default function ReviewGate({ dayNumber, children }: Props) {
  const [reviewDone, setReviewDone] = useState(false);
  const srs = useSRSProgress();
  const progress = useCourseProgress();

  const alreadyCompleted = dayNumber in progress.completedDays;

  if (!srs.loaded || alreadyCompleted || srs.dueCount === 0 || reviewDone) {
    return <>{children}</>;
  }

  const dueKeys = srs.dueItems.map((d) => d.key);
  const questions = generateReviewExercises(dueKeys, 8);

  if (questions.length === 0) {
    return <>{children}</>;
  }

  async function handleComplete(correct: number, total: number) {
    const passed = total > 0 ? correct / total >= 0.5 : false;
    for (const key of dueKeys) {
      await reviewSRSItem(key, passed);
    }
    srs.refresh();
    setReviewDone(true);
  }

  async function handleMistake(info: { itemKey: string; puzzleType: string; userAnswer: string; correctAnswer: string; prompt: string }) {
    await addMistakeAPI(info);
  }

  return (
    <div className="py-4 animate-fade-in-up">
      <div className="text-center mb-6">
        <div className="text-4xl jp-char opacity-15 mb-3">復</div>
        <h2 className="font-[var(--font-display)] text-xl font-bold mb-2">Сначала повторение!</h2>
        <p className="text-sm text-muted">
          Повторите {srs.dueCount} {srs.dueCount < 5 ? "элемента" : "элементов"} перед новым уроком
        </p>
        <div className="brush-line w-12 mx-auto mt-4 mb-6" />
      </div>
      <ExerciseRunner questions={questions} onComplete={handleComplete} onMistake={handleMistake} />
    </div>
  );
}
