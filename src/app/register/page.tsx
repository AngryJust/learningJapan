"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message === "User already registered" ? "Пользователь уже зарегистрирован" : error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="text-5xl jp-char opacity-20 mb-3">新</div>
          <h1 className="font-[var(--font-display)] text-2xl font-bold">Регистрация</h1>
          <p className="text-muted text-sm mt-1">Создайте аккаунт для начала обучения</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-danger-light border border-danger/20 rounded-xl p-3 text-sm text-danger animate-fade-in">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs font-semibold tracking-wide uppercase text-muted mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="your@email.com"
              className="w-full bg-card border border-card-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold tracking-wide uppercase text-muted mb-1.5">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Минимум 6 символов"
              className="w-full bg-card border border-card-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-semibold tracking-wide uppercase text-muted mb-1.5">Подтвердите пароль</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Повторите пароль"
              className="w-full bg-card border border-card-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white rounded-xl py-3 font-semibold hover:bg-accent-hover disabled:opacity-50 transition-all"
          >
            {loading ? "Регистрация..." : "Создать аккаунт"}
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="text-accent font-medium hover:underline">Войти</Link>
        </p>
      </div>
    </div>
  );
}
