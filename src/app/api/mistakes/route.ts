import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: mistakes } = await supabase
    .from("mistakes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(500);

  return NextResponse.json({
    mistakes: (mistakes || []).map((m) => ({
      id: m.id,
      itemKey: m.item_key,
      puzzleType: m.puzzle_type,
      timestamp: m.created_at,
      userAnswer: m.user_answer,
      correctAnswer: m.correct_answer,
      prompt: m.prompt,
    })),
  });
}

export async function POST(request: Request) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { itemKey, puzzleType, userAnswer, correctAnswer, prompt } = body;

  await supabase.from("mistakes").insert({
    user_id: user.id,
    item_key: itemKey,
    puzzle_type: puzzleType,
    user_answer: userAnswer,
    correct_answer: correctAnswer,
    prompt,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    await supabase.from("mistakes").delete().eq("id", id).eq("user_id", user.id);
  } else {
    await supabase.from("mistakes").delete().eq("user_id", user.id);
  }

  return NextResponse.json({ ok: true });
}
