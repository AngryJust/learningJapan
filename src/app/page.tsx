"use client";

import Link from "next/link";
import { getTotalDays, getDay } from "@/data/course";
import { useCourseProgress } from "@/lib/use-course-state";
import { useSRSProgress } from "@/lib/use-srs-state";
import { useMistakesState } from "@/lib/use-mistakes-state";

export default function Home() {
  const progress = useCourseProgress();
  const srs = useSRSProgress();
  const mistakes = useMistakesState();

  const total = getTotalDays();
  const currentDayDef = getDay(progress.currentDay);
  const progressPct = total > 0 ? (Object.keys(progress.completedDays).length / total) * 100 : 0;
  const completedCount = Object.keys(progress.completedDays).length;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-14 animate-fade-in-up">
        <div className="text-7xl mb-4 jp-char opacity-20 select-none" aria-hidden="true">道</div>
        <h1 className="font-[var(--font-display)] text-4xl font-bold mb-3 tracking-tight">
          <span className="text-gradient">日本語</span> を学ぼう
        </h1>
        <p className="text-muted text-sm tracking-wide">
          365 дней до свободного владения японским
        </p>
        <div className="brush-line w-24 mx-auto mt-5" />
      </div>

      {progress.loaded && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-8 animate-fade-in-up delay-1">
            {[
              { value: progress.currentDay, label: "Текущий день", color: "text-foreground" },
              { value: progress.streakDays, label: "Дней подряд", color: "text-accent" },
              { value: completedCount, label: "Пройдено", color: "text-success" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-card-border rounded-2xl p-4 text-center">
                <div className={`text-3xl font-bold font-[var(--font-display)] ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-muted mt-1 tracking-wide uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="mb-8 animate-fade-in-up delay-2">
            <div className="flex justify-between text-xs mb-2 text-muted tracking-wide uppercase">
              <span>Общий прогресс</span>
              <span className="text-foreground font-medium">{Math.round(progressPct)}%</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
              <div className="bg-accent h-2 rounded-full transition-all duration-700 relative" style={{ width: `${progressPct}%` }}>
                <div className="absolute inset-0 progress-shimmer rounded-full" />
              </div>
            </div>
          </div>

          {/* SRS alert */}
          {srs.loaded && srs.dueCount > 0 && (
            <Link
              href="/review"
              className="block bg-accent/5 border border-accent/20 rounded-2xl p-4 mb-4 hover:bg-accent/10 transition-colors animate-fade-in-up delay-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center text-lg jp-char">復</div>
                  <div>
                    <div className="text-sm font-semibold">Пора повторить!</div>
                    <div className="text-xs text-muted">{srs.dueCount} {srs.dueCount < 5 ? "элемента" : "элементов"} ждут повторения</div>
                  </div>
                </div>
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          )}

          {/* Continue */}
          {currentDayDef && (
            <Link
              href={`/course/day/${progress.currentDay}`}
              className="block bg-card border border-card-border rounded-2xl p-6 mb-4 card-interactive animate-fade-in-up delay-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-accent font-medium tracking-wide uppercase mb-1">Продолжить — День {progress.currentDay}</div>
                  <div className="text-lg font-bold">{currentDayDef.title}</div>
                  <div className="text-sm text-muted mt-1">{currentDayDef.summary}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 ml-4">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          )}
        </>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-3 animate-fade-in-up delay-4">
        {[
          { href: "/course", icon: "本", title: "Курс", desc: "Все разделы" },
          { href: "/review", icon: "復", title: "Повторение", desc: srs.loaded && srs.dueCount > 0 ? `${srs.dueCount} к повторению` : "Всё повторено" },
          { href: "/mistakes", icon: "誤", title: "Ошибки", desc: mistakes.loaded && mistakes.count > 0 ? `${mistakes.count} ошибок` : "Нет ошибок" },
        ].map((link) => (
          <Link key={link.href} href={link.href} className="bg-card border border-card-border rounded-2xl p-4 card-interactive text-center">
            <div className="text-2xl mb-2 jp-char opacity-40">{link.icon}</div>
            <div className="font-semibold text-xs">{link.title}</div>
            <div className="text-[10px] text-muted mt-0.5">{link.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
