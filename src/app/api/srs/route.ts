import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const today = new Date().toISOString().slice(0, 10);

  const { data: dueItems } = await supabase
    .from("srs_items")
    .select("*")
    .eq("user_id", user.id)
    .lte("next_review", today);

  return NextResponse.json({
    dueItems: (dueItems || []).map((item) => ({
      key: item.item_key,
      state: {
        interval: item.interval_days,
        nextReview: item.next_review,
        reviewCount: item.review_count,
        lastReview: item.last_review,
      },
    })),
    dueCount: dueItems?.length || 0,
  });
}
