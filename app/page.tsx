import { prisma } from "@/lib/prisma";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import ClientHero from "../components/ClientHero";

export const revalidate = 60;

const toolColors: Record<string, string> = {
  Metasploit: "#ff0033",
  "Burp Suite": "#ff9900",
  Nmap: "#00ff41",
  Wireshark: "#00ffff",
  Ghidra: "#bd00ff",
  "IDA Pro": "#ffff00",
  Volatility: "#00ffff",
  "Cobalt Strike": "#ff0033",
  BloodHound: "#ff9900",
  Maltego: "#00ff41",
  Shodan: "#00ffff",
  YARA: "#bd00ff",
  Splunk: "#ff9900",
  TheHive: "#ffff00",
};

const hexRow = () =>
  Array.from({ length: 12 })
    .map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, "0").toUpperCase())
    .join(" ");

export default async function Home() {
  const skills = await prisma.skill.findMany();
  const projects = await prisma.project.findMany();
  const timeline = await prisma.timeline.findMany();
  const profile = await prisma.profile.findFirst();

  return (
    <main className="relative bg-black min-h-screen font-mono overflow-x-hidden">
      
      <MatrixRain />

      {/* HEX STREAM */}
      <div className="hex-stream" aria-hidden="true">
        {Array.from({ length: 120 }).map((_, i) => (
          <span key={i}>{hexRow()}</span>
        ))}
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/5 bg-black/85 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="pulse-dot glow-green" />
          <span className="font-body text-sm font-bold tracking-widest glow-green">
            CYBER<span className="glow-cyan">SEC</span>
          </span>
          <span className="text-white/10 text-xs">// ONLINE</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <Link href="/about" className="nav-link-v2">about</Link>
          <Link href="/skills" className="nav-link-v2">skills</Link>
          <Link href="/projects" className="nav-link-v2">projects</Link>
          <Link href="/timeline" className="nav-link-v2">timeline</Link>
          <Link href="/contact" className="nav-link-v2">contact</Link>

          {/* ADMIN */}
          <Link
            href="/admin"
            className="text-red-500 border border-red-500 px-3 py-1 rounded text-xs"
          >
            ADMIN
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs text-green-400/40">
          <span className="animate-blink">●</span>
          <span>SECURE_CONN</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-8 pt-24">
        <div className="max-w-5xl w-full">

          {/* PROFILE IMAGE */}
          <div className="absolute left-8 top-32 hidden xl:block">
            <Image
              src={profile?.image || "/profile.jpg"}
              alt="profile"
              width={180}
              height={180}
              className="rounded-full border border-green-500 shadow-lg"
            />
          </div>

          {/* BOOT TEXT */}
          <div className="mb-8 space-y-1">
            {[
              "BIOS v4.2.1 — Security Module Loaded",
              "Decrypting identity matrix...",
              "Clearance verified: TOP_SECRET/SCI",
              "All systems operational. Welcome, operative.",
            ].map((text, i) => (
              <p key={i} className="text-xs text-green-400/40 tracking-widest">
                [{String(i).padStart(2, "0")}] {text}
              </p>
            ))}
          </div>

          {/* NAME */}
          <h1 className="glitch-name text-5xl md:text-8xl font-black mb-4">
            {profile?.name || "CYBER OPERATIVE"}
          </h1>

          {/* TYPING */}
          <div className="mt-4 mb-10 text-cyan-400 text-2xl">
            <TypingText
              texts={
                profile?.roles || [
                  "Head of Cybersecurity",
                  "Penetration Tester",
                  "Threat Intelligence Lead",
                ]
              }
            />
          </div>

          {/* STATS */}
          <div className="flex flex-wrap gap-4 mb-10">
            {profile?.stats?.map((s: any) => (
              <div key={s.label} className="stat-card">
                <div className="text-xl font-bold text-green-400">{s.value}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Link href="/projects" className="cyber-btn">View Operations</Link>
            <Link href="/contact" className="cyber-btn text-cyan-400 border-cyan-400">
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl text-cyan-400 mb-10">Skills</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((s: any) => (
              <div key={s.id}>
                <div className="flex justify-between text-xs">
                  <span>{s.name}</span>
                  <span style={{ color: s.color }}>{s.level}%</span>
                </div>
                <div className="bg-white/10 h-2">
                  <div
                    style={{
                      width: `${s.level}%`,
                      background: s.color,
                    }}
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* TOOLS */}
          <div className="mt-12 flex flex-wrap gap-3">
            {Object.entries(toolColors).map(([tool, color]) => (
              <span key={tool} style={{ color }} className="border px-2 py-1 text-xs">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl text-orange-400 mb-10">Operations</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p: any) => (
              <div key={p.id} className="border border-white/10 p-6">
                <div className="flex justify-between mb-3">
                  <span>{p.id}</span>
                  <span>{p.status}</span>
                </div>
                <h3 className="text-lg text-white">{p.title}</h3>
                <p className="text-sm text-white/50">{p.desc}</p>

                <div className="flex gap-2 mt-3 flex-wrap">
                  {p.tech.map((t: string) => (
                    <span key={t} className="text-xs border px-2">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl text-yellow-400 mb-10">Timeline</h2>

          <div className="space-y-8">
            {timeline.map((t: any) => (
              <div key={t.id}>
                <div className="text-xs text-yellow-400">{t.year}</div>
                <div className="text-lg">{t.role}</div>
                <div className="text-xs text-white/40">{t.org}</div>
                <p className="text-sm text-white/60">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-xs text-white/20 border-t border-white/10">
        © {new Date().getFullYear()} CYBERSEC DIVISION
      </footer>
    </main>
  );
}
