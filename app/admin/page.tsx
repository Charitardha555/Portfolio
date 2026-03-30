import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import ClientHero from "../components/ClientHero";

export const revalidate = 60;

const toolColors: Record<string, string> = {
  "Metasploit":    "#ff0033",
  "Burp Suite":    "#ff9900",
  "Nmap":          "#00ff41",
  "Wireshark":     "#00ffff",
  "Ghidra":        "#bd00ff",
  "IDA Pro":       "#ffff00",
  "Volatility":    "#00ffff",
  "Cobalt Strike": "#ff0033",
  "BloodHound":    "#ff9900",
  "Maltego":       "#00ff41",
  "Shodan":        "#00ffff",
  "YARA":          "#bd00ff",
  "Splunk":        "#ff9900",
  "TheHive":       "#ffff00",
};

export default async function Home() {
  const [skills, projects, timeline, profile] = await Promise.all([
    prisma.skill.findMany({ orderBy: { level: "desc" } }),
    prisma.project.findMany(),
    prisma.timeline.findMany({ orderBy: { order: "asc" } }),
    prisma.profile.findFirst(),
  ]);

  const name    = profile?.name   ?? "CYBER OPERATIVE";
  const roles   = (profile?.roles as string[]) ?? ["Head of Cybersecurity", "Penetration Tester", "Threat Intel Lead"];
  const stats   = (profile?.stats as { label: string; value: string }[]) ?? [];
  const bio     = profile?.bio    ?? "Elite cybersecurity professional operating at the intersection of offensive security and government intelligence.";
  const image   = profile?.image  ?? "/profile.jpg";
  const email   = profile?.email  ?? "your@email.com";
  const linkedin = profile?.linkedin ?? "linkedin.com/in/yourname";
  const github  = profile?.github ?? "github.com/Charitardha555";
  const pgp     = profile?.pgp    ?? "0x[YOUR_PGP_KEY]";

  const statColors = ["#00ff41", "#ff9900", "#00ffff", "#ff0033"];

  const projectAccents = ["#ff0033", "#00ffff", "#00ff41", "#ff9900", "#bd00ff", "#ffff00"];

  const timelineColors = ["#ff9900", "#00ffff", "#00ff41", "#bd00ff", "#ffff00"];

  return (
    <main className="relative bg-black min-h-screen font-mono overflow-x-hidden">

      {/* ── CLIENT: Matrix + Hex stream rendered inside ClientHero ── */}
      {/* We only render the static shell here; animations are client-side */}

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/5 bg-black/90 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="pulse-dot glow-green" />
          <span className="font-body text-sm font-bold tracking-widest glow-green">
            CYBER<span className="glow-cyan">SEC</span>
          </span>
          <span className="text-white/10 text-xs tracking-widest">// ONLINE</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "about",    href: "#about"    },
            { label: "skills",   href: "#skills"   },
            { label: "projects", href: "#projects" },
            { label: "timeline", href: "#timeline" },
            { label: "contact",  href: "#contact"  },
          ].map((item) => (
            <a key={item.label} href={item.href} className="nav-link-v2">
              {item.label}
            </a>
          ))}

          {/* Admin link */}
          <Link
            href="/admin"
            className="text-xs tracking-widest px-3 py-1.5 border transition-all"
            style={{
              color: "#ff0033",
              borderColor: "#ff003355",
              fontFamily: "'Share Tech Mono', monospace",
              letterSpacing: "2px",
            }}
          >
            ⚿ ADMIN
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(0,255,65,0.35)" }}>
          <span className="animate-blink">●</span>
          <span>SECURE_CONN</span>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-8 pt-24">

        {/* Client-side animations (matrix + typing) */}
        <ClientHero name={name} roles={roles} />

        <div className="max-w-5xl w-full relative z-10">

          {/* Profile photo — top left on xl screens */}
          {image && (
            <div className="absolute -top-8 right-0 hidden xl:block">
              <div className="relative">
                {/* Neon ring */}
                <div
                  className="absolute inset-0 rounded-full animate-pulse"
                  style={{ boxShadow: "0 0 20px #00ff41, 0 0 40px #00ff41", borderRadius: "50%" }}
                />
                <Image
                  src={image}
                  alt={name}
                  width={160}
                  height={160}
                  className="rounded-full object-cover relative z-10"
                  style={{ border: "2px solid #00ff41" }}
                />
                {/* Corner brackets around photo */}
                <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: "#00ffff" }} />
                <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: "#00ffff" }} />
                <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: "#00ffff" }} />
                <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: "#00ffff" }} />
              </div>
            </div>
          )}

          {/* Boot sequence */}
          <div className="mb-8 space-y-1">
            {[
              { text: "BIOS v4.2.1 — Security Module Loaded",       color: "rgba(0,255,65,0.35)"  },
              { text: "Decrypting identity matrix...",               color: "rgba(0,255,255,0.35)" },
              { text: "Clearance verified: TOP_SECRET/SCI",         color: "#ff9900"               },
              { text: "All systems operational. Welcome, operative.", color: "rgba(0,255,65,0.55)" },
            ].map((line, i) => (
              <p
                key={i}
                className="boot-line text-xs tracking-widest"
                style={{ color: line.color, animationDelay: i * 0.3 + "s" }}
              >
                [{String(i).padStart(2, "0")}] {line.text}
              </p>
            ))}
          </div>

          {/* Name + typing — rendered by ClientHero (positioned absolutely) */}
          {/* Spacer so content flows below the client-rendered name */}
          <div className="h-44 md:h-52" />

          {/* Stats */}
          {stats.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-10">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="stat-card"
                  style={{ color: statColors[i % statColors.length] }}
                >
                  <div
                    className="font-body text-xl font-bold"
                    style={{
                      color: statColors[i % statColors.length],
                      textShadow: "0 0 8px " + statColors[i % statColors.length],
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs tracking-widest mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="cyber-btn" style={{ borderColor: "#00ff41", color: "#00ff41" }}>
              View Operations
            </a>
            <a href="#contact" className="cyber-btn" style={{ borderColor: "#00ffff", color: "#00ffff" }}>
              Establish Contact
            </a>
          </div>
        </div>

        {/* Right side data stream */}
        <div
          className="absolute top-32 right-8 hidden xl:block data-stream text-right"
          style={{ color: "#00ffff" }}
        >
          {["SYS.BOOT: OK","FW: 9.1.7","IDS: ACTIVE","ENCRYPT: AES-256",
            "VPN: CONNECTED","FIREWALL: UP","AUDIT: ON","AUTH: 2FA","UPTIME: 99.98%"].map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>

      </section>

      {/* ══════════════════════════════════════
          ABOUT
      ══════════════════════════════════════ */}
      <section id="about" className="relative z-10 py-28 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(0,255,65,0.4)" }}>// SECTION_01</p>
          <h2 className="sec-head glow-green text-2xl">
            About<span className="prefix glow-cyan"> _OPERATIVE</span>
          </h2>
          <div className="section-divider" style={{ color: "#00ff41" }} />

          <div className="grid md:grid-cols-5 gap-10">

            {/* Terminal bio */}
            <div className="md:col-span-3 terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: "#ff0033" }} />
                <div className="terminal-dot" style={{ background: "#ffff00" }} />
                <div className="terminal-dot" style={{ background: "#00ff41" }} />
                <span className="ml-4 text-xs" style={{ color: "rgba(0,255,65,0.5)" }}>
                  root@cybersec:~$ cat operative.conf
                </span>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p className="cmd-prompt" style={{ color: "rgba(0,255,65,0.5)" }}>whoami</p>
                <p style={{ color: "#e8ffe8" }}>{bio}</p>
                <p style={{ color: "rgba(232,255,232,0.7)" }}>
                  Authorized to identify, track, and neutralize{" "}
                  <span className="glow-red">rogue hackers</span> in official capacity
                  with full government clearance across national cyber defense programs.
                </p>
                <p style={{ color: "rgba(232,255,232,0.7)" }}>
                  Specializing in{" "}
                  <span className="glow-yellow">APT attribution</span>,{" "}
                  <span className="glow-orange">zero-day research</span>, and{" "}
                  <span className="glow-purple">critical infrastructure protection</span>.
                </p>
                <p className="text-xs mt-4 animate-blink" style={{ color: "rgba(0,255,65,0.35)" }}>█</p>
              </div>
            </div>

            {/* Profile photo + info table */}
            <div className="md:col-span-2 space-y-6">

              {/* Mobile profile photo */}
              {image && (
                <div className="xl:hidden flex justify-center">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full animate-pulse"
                      style={{ boxShadow: "0 0 15px #00ff41" }}
                    />
                    <Image
                      src={image}
                      alt={name}
                      width={120}
                      height={120}
                      className="rounded-full object-cover relative z-10"
                      style={{ border: "2px solid #00ff41" }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-0">
                {[
                  { label: "CLEARANCE",    value: "TOP SECRET / SCI", color: "#ff0033" },
                  { label: "ROLE",         value: "HEAD OF CYBERSEC",  color: "#ff9900" },
                  { label: "JURISDICTION", value: "NATIONAL + INTL",   color: "#00ffff" },
                  { label: "COLLAB",       value: "GOV AGENCIES",      color: "#00ff41" },
                  { label: "CERTS",        value: "OSCP | CEH | CISSP",color: "#ffff00" },
                  { label: "STATUS",       value: "● ACTIVE",          color: "#00ff41" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="py-3 border-b flex justify-between items-center"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <span className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {row.label}
                    </span>
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: row.color, textShadow: "0 0 6px " + row.color }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SKILLS
      ══════════════════════════════════════ */}
      <section id="skills" className="relative z-10 py-28 px-8" style={{ background: "rgba(0,255,255,0.015)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(0,255,255,0.4)" }}>// SECTION_02</p>
          <h2 className="sec-head glow-cyan text-2xl">
            Skills<span className="prefix glow-green"> _MODULES</span>
          </h2>
          <div className="section-divider" style={{ color: "#00ffff" }} />

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {skills.map((s: any, i: number) => {
              const color = s.color ?? statColors[i % statColors.length];
              return (
                <div key={s.id} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>{s.name}</span>
                    <span style={{ color, textShadow: "0 0 4px " + color }}>{s.level}%</span>
                  </div>
                  <div className="skill-bar-v2">
                    <div
                      className="skill-fill"
                      style={{
                        width: s.level + "%",
                        background: "linear-gradient(90deg, " + color + "88, " + color + ")",
                        boxShadow: "0 0 6px " + color,
                        animationDelay: i * 0.1 + "s",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.2)" }}>
            // TOOLS & FRAMEWORKS
          </p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(toolColors).map(([tool, color]) => (
              <span
                key={tool}
                className="tag-badge cursor-default"
                style={{ color, borderColor: color + "44", textShadow: "0 0 4px " + color }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROJECTS
     ══════════════════════════════════════ */}
      <section id="projects" className="relative z-10 py-28 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(255,153,0,0.4)" }}>// SECTION_03</p>
          <h2 className="sec-head glow-orange text-2xl">
            Operations<span className="prefix glow-red"> _CLASSIFIED</span>
          </h2>
          <div className="section-divider" style={{ color: "#ff9900" }} />

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p: any, i: number) => {
              const accent = p.accentColor ?? projectAccents[i % projectAccents.length];
              return (
                <div
                  key={p.id}
                  className="cyber-card-v2 p-6"
                  style={{ borderColor: accent + "22" }}
                >
                  <div className="bracket-tl" style={{ color: accent }} />
                  <div className="bracket-tr" style={{ color: accent }} />
                  <div className="bracket-bl" style={{ color: accent }} />
                  <div className="bracket-br" style={{ color: accent }} />

                  <div className="flex justify-between items-start mb-4">
                    <span className="font-hacker text-3xl" style={{ color: accent + "55" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="tag-badge"
                      style={{
                        color:       p.status === "CLASSIFIED" ? "#ff0033" : "#00ff41",
                        borderColor: p.status === "CLASSIFIED" ? "#ff003344" : "#00ff4144",
                      }}
                    >
                      {p.status}
                    </span>
                  </div>

                  {p.tag && (
                    <div
                      className="tag-badge mb-3 inline-block"
                      style={{ color: accent, borderColor: accent + "55" }}
                    >
                      {p.tag}
                    </div>
                  )}

                  <h3
                    className="font-body text-lg font-bold mb-3"
                    style={{ color: "#ffffff", textShadow: "0 0 8px " + accent }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {p.desc ?? p.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(p.tech as string[])?.map((t: string) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5"
                        style={{ color: accent, border: "1px solid " + accent + "33", background: accent + "0a" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════ */}
      <section id="timeline" className="relative z-10 py-28 px-8" style={{ background: "rgba(255,255,0,0.012)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(255,255,0,0.4)" }}>// SECTION_04</p>
          <h2 className="sec-head glow-yellow text-2xl">
            Timeline<span className="prefix glow-orange"> _MISSION_LOG</span>
          </h2>
          <div className="section-divider" style={{ color: "#ffff00" }} />

          <div className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(180deg, #ff990044, #ffff0044, transparent)" }}
            />
            <div className="space-y-14 pl-10">
              {timeline.map((item: any, i: number) => {
                const color = item.color ?? timelineColors[i % timelineColors.length];
                return (
                  <div key={item.id} className="relative">
                    <div
                      className="absolute -left-[41px] top-1 w-3 h-3 border"
                      style={{ borderColor: color }}
                    >
                      <div className="w-full h-full animate-pulse" style={{ background: color, opacity: 0.4 }} />
                    </div>
                    <p className="text-xs tracking-widest mb-1" style={{ color, textShadow: "0 0 6px " + color }}>
                      {item.year}
                    </p>
                    <h3 className="font-body font-bold text-lg mb-1" style={{ color: "#ffffff" }}>
                      {item.role}
                    </h3>
                    <p className="text-xs tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {item.org}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {item.desc ?? item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT
      ══════════════════════════════════════ */}
      <section id="contact" className="relative z-10 py-28 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(189,0,255,0.4)" }}>// SECTION_05</p>
            <h2 className="sec-head glow-purple text-2xl">
              Contact<span className="prefix glow-cyan"> _SECURE_CHANNEL</span>
            </h2>
            <div className="section-divider" style={{ color: "#bd00ff" }} />
            <p className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
              // ENCRYPTED COMMS ONLY — ALL CONNECTIONS MONITORED
            </p>
          </div>

          <div
            className="terminal-window"
            style={{ borderColor: "#bd00ff44", boxShadow: "0 0 30px rgba(189,0,255,0.1)" }}
          >
            <div
              className="terminal-header"
              style={{ borderColor: "#bd00ff44", background: "rgba(189,0,255,0.06)" }}
            >
              <div className="terminal-dot" style={{ background: "#ff0033" }} />
              <div className="terminal-dot" style={{ background: "#ffff00" }} />
              <div className="terminal-dot" style={{ background: "#00ff41" }} />
              <span className="ml-4 text-xs" style={{ color: "rgba(189,0,255,0.6)" }}>
                root@cybersec:~$ ./contact.sh --secure
              </span>
            </div>
            <div className="p-8">
              {[
                { label: "EMAIL",    value: email,    color: "#00ff41", href: "mailto:" + email },
                { label: "LINKEDIN", value: linkedin, color: "#00ffff", href: "https://" + linkedin },
                { label: "GITHUB",   value: github,   color: "#bd00ff", href: "https://" + github },
                { label: "PGP KEY",  value: pgp,      color: "#ff9900", href: null },
              ].map((c) => (
                <div key={c.label} className="contact-row">
                  <span
                    className="text-xs tracking-widest w-24 flex-shrink-0"
                    style={{ color: c.color, textShadow: "0 0 4px " + c.color }}
                  >
                    &gt; {c.label}
                  </span>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="contact-val text-sm hover:underline"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="contact-val text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {c.value}
                    </span>
                  )}
                </div>
              ))}

              <div className="flex flex-wrap gap-4 justify-center pt-8">
                <a
                  href={"mailto:" + email}
                  className="cyber-btn"
                  style={{ borderColor: "#00ff41", color: "#00ff41" }}
                >
                  Send Encrypted Mail
                </a>
                <a
                  href={"https://" + github}
                  className="cyber-btn"
                  style={{ borderColor: "#bd00ff", color: "#bd00ff" }}
                >
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer
        className="relative z-10 py-8 px-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.15)" }}>
            // ALL ACTIVITIES AUTHORIZED AND LEGALLY MONITORED
          </span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.12)" }}>
            {new Date().getFullYear()} — CYBERSEC DIVISION
          </span>
          <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(0,255,65,0.3)" }}>
            <span className="animate-blink">●</span>
            <span>SYSTEM ONLINE</span>
          </div>
        </div>
      </footer>

    </main>
  );
}