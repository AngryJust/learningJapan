"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface Props {
  referenceChar: string;
  size?: number;
}

export default function WritingCanvas({ referenceChar, size = 200 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const drawReference = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);

    // Draw grid lines
    ctx.strokeStyle = "rgba(128, 128, 128, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(size / 2, 0);
    ctx.lineTo(size / 2, size);
    ctx.moveTo(0, size / 2);
    ctx.lineTo(size, size / 2);
    ctx.stroke();

    // Draw reference character
    ctx.fillStyle = "rgba(128, 128, 128, 0.12)";
    ctx.font = `${size * 0.7}px "Noto Sans JP", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(referenceChar, size / 2, size / 2);
  }, [referenceChar, size]);

  useEffect(() => {
    drawReference();
  }, [drawReference]);

  function getPos(e: React.PointerEvent): { x: number; y: number } {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (size / rect.width),
      y: (e.clientY - rect.top) * (size / rect.height),
    };
  }

  function handlePointerDown(e: React.PointerEvent) {
    setIsDrawing(true);
    lastPos.current = getPos(e);
    canvasRef.current?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDrawing || !lastPos.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);
    ctx.strokeStyle = "var(--accent, #c7963e)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  }

  function handlePointerUp() {
    setIsDrawing(false);
    lastPos.current = null;
  }

  function handleClear() {
    drawReference();
  }

  return (
    <div>
      <div className="text-[10px] text-muted font-semibold tracking-wide uppercase mb-2">Нарисуйте символ</div>
      <div className="bg-card border border-card-border rounded-xl p-2 inline-block">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="cursor-crosshair touch-none block"
          style={{ width: size, height: size }}
        />
      </div>
      <button
        onClick={handleClear}
        className="block mt-2 text-xs text-muted hover:text-accent transition-colors"
      >
        Очистить
      </button>
    </div>
  );
}
