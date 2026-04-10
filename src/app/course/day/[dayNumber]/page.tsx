"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getDay, getDayUnit } from "@/data/course";
import { useCourseProgress, useIsMounted } from "@/lib/use-course-state";
import LessonRenderer from "@/components/course/LessonRenderer";

export default function DayPage({ params }: { params: Promise<{ dayNumber: string }> }) {
  const { dayNumber } = use(params);
  const dayNum = parseInt(dayNumber, 10);
  const router = useRouter();
  const mounted = useIsMounted();
  const progress = useCourseProgress();

  const day = !isNaN(dayNum) && dayNum > 0 ? getDay(dayNum) : undefined;
  const unit = !isNaN(dayNum) && dayNum > 0 ? getDayUnit(dayNum) : undefined;

  const unlocked = progress.loaded ? dayNum <= progress.currentDay : true;
  const completed = progress.loaded ? dayNum in progress.completedDays : false;
  const prev = completed ? progress.completedDays[dayNum] : undefined;
  const prevScore = prev ? { correct: prev.correctAnswers, total: prev.totalQuestions } : null;

  if (!day) {
    return (
      <div className="text-center py-24 animate-fade-in">
        <div className="text-5xl jp-char opacity-15 mb-4">無</div>
        <h1 className="font-[var(--font-display)] text-2xl font-bold mb-2">День не найден</h1>
        <p className="text-muted text-sm mb-6">Этот день ещё не создан</p>
        <Link href="/course" className="text-accent text-sm font-medium hover:underline">Назад к карте курса</Link>
      </div>
    );
  }

  if (mounted && progress.loaded && !unlocked) {
    return (
      <div className="text-center py-24 animate-fade-in">
        <div className="text-5xl jp-char opacity-15 mb-4">鍵</div>
        <h1 className="font-[var(--font-display)] text-2xl font-bold mb-2">День {dayNum} закрыт</h1>
        <p className="text-muted text-sm mb-6">Завершите предыдущий день, чтобы открыть этот</p>
        <Link href="/course" className="text-accent text-sm font-medium hover:underline">Назад к карте курса</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-muted mb-6 animate-fade-in">
        <Link href="/course" className="hover:text-accent transition-colors">Курс</Link>
        <span className="opacity-30">/</span>
        {unit && <span className="opacity-60">{unit.title}</span>}
        <span className="opacity-30">/</span>
        <span className="text-foreground font-medium">День {dayNum}</span>
      </div>

      <div className="mb-8 animate-fade-in-up">
        <h1 className="font-[var(--font-display)] text-2xl font-bold tracking-tight">{day.title}</h1>
        <p className="text-muted text-sm mt-1.5">{day.summary}</p>

        {completed && prevScore && (
          <div className="mt-3 inline-flex items-center gap-2 bg-success-light border border-success/20 rounded-full px-3 py-1 text-xs text-success font-medium">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {prevScore.correct}/{prevScore.total} правильно ({Math.round((prevScore.correct / prevScore.total) * 100)}%)
          </div>
        )}

        <div className="brush-line w-12 mt-5" />
      </div>

      <div className="mb-10 animate-fade-in-up delay-1">
        <h2 className="text-xs font-semibold tracking-wide uppercase text-muted mb-4">Урок</h2>
        <LessonRenderer contentRefs={day.lessonContent} />
      </div>

      <div className="text-center py-8 border-t border-card-border animate-fade-in-up delay-2">
        <p className="text-muted text-sm mb-5">
          {completed ? "Пройдите упражнения снова, чтобы улучшить результат" : "Выполните упражнения, чтобы открыть следующий день"}
        </p>
        <button
          onClick={() => router.push(`/course/day/${dayNum}/exercises`)}
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent-hover transition-colors"
        >
          Начать упражнения
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
