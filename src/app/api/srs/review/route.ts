import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { itemKey, correct } = body;

  const today = new Date().toISOString().slice(0, 10);

  const { data: item } = await supabase
    .from("srs_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("item_key", itemKey)
    .single();

  if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  const newInterval = correct
    ? Math.min(item.interval_days * 2, 30)
    : 1;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + newInterval);

  await supabase.from("srs_items").update({
    interval_days: newInterval,
    next_review: nextDate.toISOString().slice(0, 10),
    review_count: item.review_count + 1,
    last_review: today,
  }).eq("id", item.id);

  return NextResponse.json({ ok: true });
}
