import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [profileRes, completionsRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("day_completions").select("*").eq("user_id", user.id).order("day"),
  ]);

  const profile = profileRes.data;
  const completions = completionsRes.data || [];

  const completedDays: Record<number, { day: number; completedAt: string; score: number; totalQuestions: number; correctAnswers: number }> = {};
  for (const c of completions) {
    completedDays[c.day] = {
      day: c.day,
      completedAt: c.completed_at,
      score: c.score,
      totalQuestions: c.total_questions,
      correctAnswers: c.correct_answers,
    };
  }

  return NextResponse.json({
    currentDay: profile?.current_day || 1,
    completedDays,
    streakDays: profile?.streak_days || 0,
    lastActivityDate: profile?.last_activity_date || "",
  });
}
