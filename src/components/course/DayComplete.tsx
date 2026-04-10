"use client";

import Link from "next/link";
import { getTotalDays } from "@/data/course";

interface Props {
  day: number;
  correct: number;
  total: number;
  passed: boolean;
}

export default function DayComplete({ day, correct, total, passed }: Props) {
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const hasNext = day < getTotalDays();

  return (
    <div className="max-w-sm mx-auto text-center">
      <div className="text-5xl jp-char opacity-15 mb-4 select-none" aria-hidden="true">
        {passed ? "合" : "再"}
      </div>

      <div className="bg-card border border-card-border rounded-2xl p-8 mb-6">
        <div className={`text-5xl font-bold font-[var(--font-display)] mb-1 ${passed ? "text-success" : "text-danger"}`}>
          {percent}%
        </div>
        <p className="text-sm text-muted">
          {correct} / {total} правильно
        </p>

        <div className="brush-line w-12 mx-auto my-5" />

        {passed ? (
          <div className="bg-success-light rounded-xl p-4">
            <p className="text-success font-semibold text-sm">День {day} пройден!</p>
            {hasNext && (
              <p className="text-xs text-muted mt-1">День {day + 1} теперь открыт</p>
            )}
          </div>
        ) : (
          <div className="bg-danger-light rounded-xl p-4">
            <p className="text-danger font-semibold text-sm">Нужно 60% для прохождения</p>
            <p className="text-xs text-muted mt-1">Повторите урок и попробуйте снова</p>
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        {!passed && (
          <Link
            href={`/course/day/${day}`}
            className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors"
          >
            Попробовать снова
          </Link>
        )}
        {passed && hasNext && (
          <Link
            href={`/course/day/${day + 1}`}
            className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors"
          >
            Следующий день
          </Link>
        )}
        <Link
          href="/course"
          className="px-5 py-2.5 bg-card border border-card-border rounded-xl text-sm font-medium hover:border-accent/50 transition-colors"
        >
          Карта курса
        </Link>
      </div>
    </div>
  );
}
