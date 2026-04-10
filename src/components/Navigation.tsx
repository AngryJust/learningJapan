"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { logout } from "@/lib/api";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/course", label: "Курс" },
  { href: "/review", label: "Повторение" },
  { href: "/mistakes", label: "Ошибки" },
  { href: "/history", label: "История" },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Don't show nav on login/register
  if (pathname === "/login" || pathname === "/register") return null;

  async function handleLogout() {
    await logout();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-card/80 border-b border-card-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl jp-char" aria-hidden="true">墨</span>
            <span className="text-sm font-semibold tracking-wide text-foreground group-hover:text-accent transition-colors hidden sm:inline">
              УЧИМ ЯПОНСКИЙ
            </span>
          </Link>
          <div className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                  isActive(item.href)
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
            {!loading && user && (
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1.5 text-xs text-muted hover:text-danger transition-colors"
              >
                Выйти
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
