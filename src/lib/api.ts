// Client-side API helpers for Supabase-backed data

export async function fetchProgress() {
  const res = await fetch("/api/progress");
  if (!res.ok) throw new Error("Failed to fetch progress");
  return res.json();
}

export async function completeDay(data: {
  day: number;
  completedAt: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
}) {
  const res = await fetch("/api/progress/complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to complete day");
  return res.json();
}

export async function fetchDueSRS() {
  const res = await fetch("/api/srs");
  if (!res.ok) throw new Error("Failed to fetch SRS");
  return res.json();
}

export async function reviewSRSItem(itemKey: string, correct: boolean) {
  const res = await fetch("/api/srs/review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemKey, correct }),
  });
  if (!res.ok) throw new Error("Failed to review item");
  return res.json();
}

export async function seedSRSItems(keys: string[]) {
  const res = await fetch("/api/srs/seed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keys }),
  });
  if (!res.ok) throw new Error("Failed to seed SRS");
  return res.json();
}

export async function fetchMistakes() {
  const res = await fetch("/api/mistakes");
  if (!res.ok) throw new Error("Failed to fetch mistakes");
  return res.json();
}

export async function addMistakeAPI(data: {
  itemKey: string;
  puzzleType: string;
  userAnswer: string;
  correctAnswer: string;
  prompt: string;
}) {
  const res = await fetch("/api/mistakes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add mistake");
  return res.json();
}

export async function deleteMistakeAPI(id?: string) {
  const url = id ? `/api/mistakes?id=${id}` : "/api/mistakes";
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete mistake");
  return res.json();
}

export async function logout() {
  const { createClient } = await import("@/lib/supabase/client");
  const supabase = createClient();
  await supabase.auth.signOut();
}
