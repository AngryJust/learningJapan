"use client";

import { speak } from "@/lib/audio";
import { useState } from "react";

interface Props {
  text: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export default function AudioButton({ text, size = "md", label, className = "" }: Props) {
  const [playing, setPlaying] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    setPlaying(true);
    speak(text);
    setTimeout(() => setPlaying(false), 800);
  }

  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const iconSize = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full bg-accent/10 text-accent hover:bg-accent/20 flex items-center justify-center transition-all ${playing ? "animate-pulse scale-110" : ""} ${className}`}
      title={label || `Прослушать: ${text}`}
      aria-label={label || `Прослушать: ${text}`}
    >
      <svg className={iconSize[size]} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5zM14 3.23v2.06a6.5 6.5 0 010 13.42v2.06A8.5 8.5 0 0014 3.23z" />
      </svg>
      {playing && <span className="sr-only" aria-live="polite">Воспроизведение</span>}
    </button>
  );
}
