"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { logout } from "@/lib/api";

const navItems = [
  { href: "/", label: "Главная", short: "Дом" },
  { href: "/course", label: "Курс", short: "Курс" },
  { href: "/review", label: "Повторение", short: "SRS" },
  { href: "/mistakes", label: "Ошибки", short: "Ош." },
  { href: "/history", label: "История", short: "Ист." },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (pathname === "/login" || pathname === "/register") return null;

  async function handleLogout() {
    await logout();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-card/80 border-b border-card-border">
      <div className="max-w-5xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-12 sm:h-14">
          <Link href="/" className="flex items-center gap-1.5 group flex-shrink-0">
            <span className="text-xl sm:text-2xl jp-char" aria-hidden="true">墨</span>
            <span className="text-xs font-semibold tracking-wide text-foreground group-hover:text-accent transition-colors hidden md:inline">
              УЧИМ ЯПОНСКИЙ
            </span>
          </Link>
          <div className="flex items-center gap-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-1.5 sm:px-3 py-1.5 text-[10px] sm:text-sm font-medium tracking-wide transition-colors whitespace-nowrap ${
                  isActive(item.href)
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.short}</span>
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 sm:w-4 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
            {!loading && user && (
              <button
                onClick={handleLogout}
                className="ml-1 sm:ml-2 px-1.5 sm:px-3 py-1.5 text-[10px] sm:text-xs text-muted hover:text-danger transition-colors whitespace-nowrap"
              >
                <span className="hidden sm:inline">Выйти</span>
                <span className="sm:hidden">X</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
