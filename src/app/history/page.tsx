"use client";

import Link from "next/link";
import { getTotalDays, getDay } from "@/data/course";
import { useCourseProgress, useIsMounted } from "@/lib/use-course-state";

function ActivityCalendar({ activityDates }: { activityDates: Set<string> }) {
  const today = new Date();
  const weeks: Date[][] = [];

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const daysBack = isMobile ? 42 : 83;
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - daysBack);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const cursor = new Date(startDate);
  while (cursor <= today) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 animate-fade-in-up delay-2">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-muted mb-4">Календарь активности</h2>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((date, di) => {
              const dateStr = date.toISOString().slice(0, 10);
              const isActive = activityDates.has(dateStr);
              const isFuture = date > today;
              const isToday = dateStr === today.toISOString().slice(0, 10);

              return (
                <div
                  key={di}
                  className={`w-3.5 h-3.5 rounded-[3px] transition-colors ${
                    isFuture ? "bg-transparent" : isActive ? "bg-success" : isToday ? "bg-accent/30" : "bg-surface"
                  }`}
                  title={isFuture ? "" : `${dateStr}${isActive ? " — занимались" : ""}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-3 text-[10px] text-muted uppercase tracking-wide">
        <span>Мало</span>
        <div className="w-2.5 h-2.5 rounded-[2px] bg-surface" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-success/40" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-success" />
        <span>Много</span>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const progress = useCourseProgress();
  const mounted = useIsMounted();

  if (!mounted || !progress.loaded) return null;

  const completedDays = progress.completedDays;
  const history = Object.values(completedDays).sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );
  const activityDates = new Set(history.map((h) => h.completedAt.slice(0, 10)));
  const completedCount = history.length;
  const total = getTotalDays();

  return (
    <div>
      <div className="mb-8 animate-fade-in-up">
        <h1 className="font-[var(--font-display)] text-3xl font-bold tracking-tight">История занятий</h1>
        <p className="text-muted text-sm mt-2">Ваш путь к владению японским</p>
        <div className="brush-line w-16 mt-4" />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6 animate-fade-in-up delay-1">
        {[
          { value: completedCount, label: "Пройдено", color: "text-success" },
          { value: total, label: "Всего дней", color: "text-foreground" },
          { value: progress.streakDays, label: "Подряд", color: "text-accent" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-card-border rounded-2xl p-4 text-center">
            <div className={`text-2xl font-bold font-[var(--font-display)] ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-muted mt-1 tracking-wide uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <ActivityCalendar activityDates={activityDates} />
      </div>

      <div className="animate-fade-in-up delay-3">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted mb-3">Последняя активность</h2>
        {history.length === 0 ? (
          <div className="bg-card border border-card-border rounded-2xl p-10 text-center">
            <div className="text-4xl jp-char opacity-20 mb-3">空</div>
            <p className="text-muted text-sm mb-4">Пока нет завершённых уроков</p>
            <Link href="/course" className="text-accent text-sm font-medium hover:underline">Начните первый урок</Link>
          </div>
        ) : (
          <div className="space-y-1.5">
            {history.slice(0, 30).map((entry, i) => {
              const dayDef = getDay(entry.day);
              const pct = entry.totalQuestions > 0
                ? Math.round((entry.correctAnswers / entry.totalQuestions) * 100) : 0;

              return (
                <Link
                  key={`${entry.day}-${entry.completedAt}`}
                  href={`/course/day/${entry.day}`}
                  className="flex items-center justify-between bg-card border border-card-border rounded-xl px-4 py-3 card-interactive"
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${pct >= 60 ? "bg-success/15 text-success" : "bg-danger-light text-danger"}`}>
                      {entry.day}
                    </div>
                    <div>
                      <span className="text-sm font-medium">День {entry.day}</span>
                      {dayDef && <span className="text-xs text-muted ml-2 hidden sm:inline">{dayDef.title}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className={`font-bold ${pct >= 60 ? "text-success" : "text-danger"}`}>{pct}%</span>
                    <span className="text-muted">{new Date(entry.completedAt).toLocaleDateString("ru-RU")}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
