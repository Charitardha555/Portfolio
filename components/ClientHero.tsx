"use client";

import dynamic from "next/dynamic";

const MatrixRain = dynamic(() => import("./MatrixRain"));
const TypingText = dynamic(() => import("./TypingText"));

export default function ClientHero() {
  return (
    <>
      <MatrixRain />
      <TypingText />
    </>
  );
}

"use client";

import dynamic from "next/dynamic";

const MatrixRain = dynamic(() => import("./MatrixRain"), { ssr: false });
const TypingText = dynamic(() => import("./TypingText"), { ssr: false });

const hexRow = () =>
  Array.from({ length: 12 })
    .map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, "0").toUpperCase())
    .join(" ");

interface ClientHeroProps {
  name: string;
  roles: string[];
}

export default function ClientHero({ name, roles }: ClientHeroProps) {
  return (
    <>
      <MatrixRain />
      <div className="hex-stream" aria-hidden="true">
        {Array.from({ length: 120 }).map((_, i) => (
          <span key={i}>{hexRow()}</span>
        ))}
      </div>
      <h1
        className="glitch-name text-5xl md:text-8xl font-black tracking-tight mb-4"
        data-text={name}
        style={{ position: "absolute", top: "42%", left: "2rem", zIndex: 10 }}
      >
        {name}
      </h1>
      <div
        className="flex items-center gap-3"
        style={{ position: "absolute", top: "56%", left: "2rem", zIndex: 10 }}
      >
        <span className="glow-cyan text-xs tracking-widest">//</span>
        <span
          className="font-hacker text-2xl md:text-3xl"
          style={{ color: "#00ffff", textShadow: "0 0 8px #00ffff" }}
        >
          <TypingText texts={roles} />
        </span>
      </div>
    </>
  );
}
