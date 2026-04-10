import type { Metadata } from "next";
import { Noto_Sans_JP, Playfair_Display } from "next/font/google";
import Navigation from "@/components/Navigation";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Учим японский — курс японского языка",
  description: "Изучайте японский: хирагана, катакана, кандзи, словарный запас и грамматика",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${notoSansJP.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Navigation />
          <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
