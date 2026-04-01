"use client";
import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    // Mix of matrix chars + cyber symbols
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01HACK>_<|{}[]$#@%ABCDEFGHIJKLMNOP";

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 8, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Courier New'`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Leading char is brighter
        if (drops[i] * fontSize > canvas.height * 0.8) {
          ctx.fillStyle = "#ffffff";
        } else if (drops[i] * fontSize < 20) {
          ctx.fillStyle = "#00ff41";
        } else {
          const alpha = Math.random() * 0.5 + 0.3;
          ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
