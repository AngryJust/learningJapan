import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { keys } = body as { keys: string[] };

  if (!keys || keys.length === 0) return NextResponse.json({ ok: true });

  const today = new Date().toISOString().slice(0, 10);

  // Get existing keys to avoid duplicates
  const { data: existing } = await supabase
    .from("srs_items")
    .select("item_key")
    .eq("user_id", user.id)
    .in("item_key", keys);

  const existingKeys = new Set((existing || []).map((e) => e.item_key));
  const newItems = keys
    .filter((key) => !existingKeys.has(key))
    .map((key) => ({
      user_id: user.id,
      item_key: key,
      interval_days: 1,
      next_review: today,
      review_count: 0,
    }));

  if (newItems.length > 0) {
    await supabase.from("srs_items").insert(newItems);
  }

  return NextResponse.json({ ok: true, seeded: newItems.length });
}
