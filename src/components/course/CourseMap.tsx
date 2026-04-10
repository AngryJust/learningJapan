"use client";

import Link from "next/link";
import { course } from "@/data/course";
import { useCourseProgress } from "@/lib/use-course-state";

export default function CourseMap() {
  const progress = useCourseProgress();

  if (!progress.loaded) return null;

  const currentDay = progress.currentDay;

  return (
    <div className="space-y-6">
      {course.map((unit, unitIdx) => {
        const completedCount = unit.days.filter((d) => d.day in progress.completedDays).length;
        const totalCount = unit.days.length;
        const progressPct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

        return (
          <div
            key={unit.id}
            className="bg-card border border-card-border rounded-2xl p-6 animate-fade-in-up"
            style={{ animationDelay: `${unitIdx * 0.04}s` }}
          >
            <div className="flex items-start justify-between mb-1">
              <div>
                <h2 className="font-[var(--font-display)] text-lg font-bold">{unit.title}</h2>
                <p className="text-xs text-muted mt-0.5">{unit.description}</p>
              </div>
              <span className="text-xs text-muted font-medium bg-surface px-2 py-0.5 rounded-full flex-shrink-0 ml-3">
                {completedCount}/{totalCount}
              </span>
            </div>

            <div className="w-full bg-surface rounded-full h-1.5 my-4 overflow-hidden">
              <div
                className="bg-success h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {unit.days.map((day) => {
                const unlocked = day.day <= currentDay;
                const completed = day.day in progress.completedDays;
                const isCurrent = day.day === currentDay;

                let cls =
                  "w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all ";
                if (completed) {
                  cls += "bg-success/15 text-success border border-success/30";
                } else if (isCurrent) {
                  cls += "bg-accent text-white animate-breathe";
                } else if (unlocked) {
                  cls += "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20";
                } else {
                  cls += "bg-surface text-muted/40";
                }

                if (unlocked) {
                  return (
                    <Link key={day.day} href={`/course/day/${day.day}`} className={cls} title={day.title}>
                      {day.day}
                    </Link>
                  );
                }

                return (
                  <div key={day.day} className={cls} title="Закрыт">
                    {day.day}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
