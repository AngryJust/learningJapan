import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { day, completedAt, score, totalQuestions, correctAnswers } = body;

  // Upsert day completion (keep better score)
  const { data: existing } = await supabase
    .from("day_completions")
    .select("score")
    .eq("user_id", user.id)
    .eq("day", day)
    .single();

  if (existing && existing.score >= score) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  await supabase.from("day_completions").upsert({
    user_id: user.id,
    day,
    completed_at: completedAt,
    score,
    total_questions: totalQuestions,
    correct_answers: correctAnswers,
  }, { onConflict: "user_id,day" });

  // Update profile
  const passingScore = totalQuestions > 0 ? (correctAnswers / totalQuestions) >= 0.6 : true;
  const today = new Date().toISOString().slice(0, 10);

  const { data: profile } = await supabase
    .from("profiles")
    .select("current_day, streak_days, last_activity_date")
    .eq("id", user.id)
    .single();

  if (profile) {
    const updates: Record<string, unknown> = { last_activity_date: today };

    if (passingScore && day >= profile.current_day) {
      updates.current_day = day + 1;
    }

    // Streak logic
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    if (profile.last_activity_date === yesterdayStr) {
      updates.streak_days = profile.streak_days + 1;
    } else if (profile.last_activity_date !== today) {
      updates.streak_days = 1;
    }

    await supabase.from("profiles").update(updates).eq("id", user.id);
  }

  return NextResponse.json({ ok: true });
}
