"use client";

import dynamic from "next/dynamic";

const MatrixRain = dynamic(() => import("../components/MatrixRain"), { ssr: false });
const TypingText = dynamic(() => import("../components/TypingText"), { ssr: false });

const skills = [
  { name: "Penetration Testing",      level: 95, color: "#00ff41" },
  { name: "Network Forensics",         level: 92, color: "#00ffff" },
  { name: "Malware Analysis",          level: 88, color: "#bd00ff" },
  { name: "OSINT & Threat Intel",      level: 90, color: "#ff9900" },
  { name: "Cloud Security (AWS/GCP)",  level: 85, color: "#00ff41" },
  { name: "Reverse Engineering",       level: 82, color: "#00ffff" },
  { name: "Exploit Development",       level: 87, color: "#ff0033" },
  { name: "Incident Response",         level: 93, color: "#ffff00" },
];

const projects = [
  {
    id: "01", title: "ROGUE_HUNTER",  tag: "OFFENSIVE SEC", status: "CLASSIFIED", accentColor: "#ff0033",
    desc: "Automated red team framework for identifying rogue actors across dark web & clear net infrastructure.",
    tech: ["Python", "Tor", "YARA", "ELK"],
  },
  {
    id: "02", title: "PHANTOM_TRACE", tag: "FORENSICS",     status: "ACTIVE",     accentColor: "#00ffff",
    desc: "Deep packet inspection & memory forensics toolkit used in live government investigations.",
    tech: ["C++", "Wireshark API", "Volatility"],
  },
  {
    id: "03", title: "SENTINEL_NET",  tag: "DEFENSE",       status: "DEPLOYED",   accentColor: "#00ff41",
    desc: "AI-driven threat detection network monitoring 10k+ endpoints with real-time anomaly detection.",
    tech: ["ML", "Kafka", "Rust", "SIEM"],
  },
  {
    id: "04", title: "ZERO_BREACH",   tag: "CLOUD SEC",     status: "ACTIVE",     accentColor: "#ff9900",
    desc: "Zero-trust architecture implementation for government cloud infrastructure.",
    tech: ["Terraform", "AWS", "IAM", "Vault"],
  },
];

const timeline = [
  { year: "2024–NOW",  role: "Head of Cybersecurity",      org: "Gov. Collab Division", color: "#ff9900",
    desc: "Leading offensive + defensive cyber ops in collaboration with national security agencies." },
  { year: "2022–2024", role: "Senior Penetration Tester",  org: "RedTeam Alpha",        color: "#00ffff",
    desc: "Executed 100+ authorized breach simulations across critical infrastructure." },
  { year: "2020–2022", role: "Threat Intelligence Analyst", org: "CyberShield Inc.",    color: "#00ff41",
    desc: "Tracked APT groups, produced threat intel reports for Fortune 500 clients." },
];

const toolColors: Record<string, string> = {
  "Metasploit": "#ff0033", "Burp Suite": "#ff9900", "Nmap": "#00ff41",
  "Wireshark": "#00ffff",  "Ghidra": "#bd00ff",     "IDA Pro": "#ffff00",
  "Volatility": "#00ffff", "Cobalt Strike": "#ff0033", "BloodHound": "#ff9900",
  "Maltego": "#00ff41",    "Shodan": "#00ffff",      "YARA": "#bd00ff",
  "Splunk": "#ff9900",     "TheHive": "#ffff00",
};

const hexRow = () =>
  Array.from({ length: 12 })
    .map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, "0").toUpperCase())
    .join(" ");

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen font-mono overflow-x-hidden">

      <MatrixRain />

      {/* Hex stream decoration */}
      <div className="hex-stream" aria-hidden="true">
        {Array.from({ length: 120 }).map((_, i) => (
          <span key={i}>{hexRow()}</span>
        ))}
      </div>

      {/* ══ NAVBAR ══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/5 bg-black/85 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="pulse-dot glow-green" />
          <span className="font-body text-sm font-bold tracking-widest glow-green">
            CYBER<span className="glow-cyan">SEC</span>
          </span>
          <span className="text-white/10 text-xs tracking-widest">// ONLINE</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {["about", "skills", "projects", "timeline", "contact"].map((item) => (
            <a key={item} href={"#" + item} className="nav-link-v2">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(0,255,65,0.35)" }}>
          <span className="animate-blink">●</span>
          <span>SECURE_CONN</span>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-8 pt-24">
        <div className="max-w-5xl w-full">

          {/* Boot sequence */}
          <div className="mb-8 space-y-1">
            {[
              { text: "BIOS v4.2.1 — Security Module Loaded",        color: "rgba(0,255,65,0.35)",  delay: "0s"    },
              { text: "Decrypting identity matrix...",                 color: "rgba(0,255,255,0.35)", delay: "0.3s"  },
              { text: "Clearance verified: TOP_SECRET/SCI",           color: "#ff9900",              delay: "0.6s"  },
              { text: "All systems operational. Welcome, operative.", color: "rgba(0,255,65,0.55)",  delay: "0.9s"  },
            ].map((line, i) => (
              <p
                key={i}
                className="boot-line text-xs tracking-widest"
                style={{ color: line.color, animationDelay: line.delay }}
              >
                [{String(i).padStart(2, "0")}] {line.text}
              </p>
            ))}
          </div>

          <h1 className="glitch-name text-5xl md:text-8xl font-black tracking-tight mb-4" data-text="[YOUR NAME]">
            [YOUR NAME]
          </h1>

          <div className="mt-4 mb-10 flex items-center gap-3">
            <span className="glow-cyan text-xs tracking-widest">//</span>
            <span className="font-hacker text-2xl md:text-3xl" style={{ color: "#00ffff", textShadow: "0 0 8px #00ffff" }}>
              <TypingText
                texts={["Head of Cybersecurity", "Rogue Hacker Hunter", "Penetration Tester", "Govt. Security Advisor", "Threat Intel Lead"]}
              />
            </span>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { label: "BREACHES STOPPED", value: "200+",   color: "#00ff41" },
              { label: "GOV CLEARANCE",    value: "ACTIVE", color: "#ff9900" },
              { label: "CVEs FOUND",        value: "37",    color: "#00ffff" },
              { label: "ACTORS TRACKED",    value: "500+",  color: "#ff0033" },
            ].map((s) => (
              <div key={s.label} className="stat-card" style={{ color: s.color }}>
                <div className="font-body text-xl font-bold" style={{ color: s.color, textShadow: "0 0 8px " + s.color }}>
                  {s.value}
                </div>
                <div className="text-xs tracking-widest mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="cyber-btn" style={{ borderColor: "#00ff41", color: "#00ff41" }}>
              View Operations
            </a>
            <a href="#contact" className="cyber-btn" style={{ borderColor: "#00ffff", color: "#00ffff" }}>
              Establish Contact
            </a>
          </div>
        </div>

        {/* Right panel */}
        <div className="absolute top-32 right-8 hidden xl:block data-stream text-right" style={{ color: "#00ffff" }}>
          {["SYS.BOOT: OK","FW: 9.1.7","IDS: ACTIVE","ENCRYPT: AES-256","VPN: CONNECTED",
            "FIREWALL: UP","AUDIT: ON","SCAN: IDLE","AUTH: 2FA","UPTIME: 99.98%"].map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" className="relative z-10 py-28 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(0,255,65,0.4)" }}>// SECTION_01</p>
          <h2 className="sec-head glow-green text-2xl">About<span className="prefix glow-cyan"> _OPERATIVE</span></h2>
          <div className="section-divider" style={{ color: "#00ff41" }} />

          <div className="grid md:grid-cols-5 gap-10">
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
                <p style={{ color: "#e8ffe8" }}>
                  Elite cybersecurity professional operating at the intersection of{" "}
                  <span className="glow-green">offensive security</span> and{" "}
                  <span className="glow-cyan">government intelligence</span>.
                </p>
                <p style={{ color: "rgba(232,255,232,0.75)" }}>
                  Authorized to identify, track, and neutralize{" "}
                  <span className="glow-red">rogue hackers</span> in official capacity
                  with full government clearance across national cyber defense programs.
                </p>
                <p style={{ color: "rgba(232,255,232,0.75)" }}>
                  Specializing in{" "}
                  <span className="glow-yellow">APT attribution</span>,{" "}
                  <span className="glow-orange">zero-day research</span>, and{" "}
                  <span className="glow-purple">critical infrastructure protection</span>.
                </p>
                <p className="text-xs mt-4 animate-blink" style={{ color: "rgba(0,255,65,0.35)" }}>█</p>
              </div>
            </div>

            <div className="md:col-span-2 space-y-0">
              {[
                { label: "CLEARANCE",    value: "TOP SECRET / SCI",  color: "#ff0033" },
                { label: "ROLE",         value: "HEAD OF CYBERSEC",   color: "#ff9900" },
                { label: "JURISDICTION", value: "NATIONAL + INTL",   color: "#00ffff" },
                { label: "COLLAB",       value: "GOV AGENCIES",      color: "#00ff41" },
                { label: "CERTS",        value: "OSCP | CEH | CISSP", color: "#ffff00" },
                { label: "STATUS",       value: "● ACTIVE",          color: "#00ff41" },
              ].map((row) => (
                <div key={row.label} className="py-3 border-b flex justify-between items-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>{row.label}</span>
                  <span className="text-xs font-mono font-bold" style={{ color: row.color, textShadow: "0 0 6px " + row.color }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" className="relative z-10 py-28 px-8" style={{ background: "rgba(0,255,255,0.015)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(0,255,255,0.4)" }}>// SECTION_02</p>
          <h2 className="sec-head glow-cyan text-2xl">Skills<span className="prefix glow-green"> _MODULES</span></h2>
          <div className="section-divider" style={{ color: "#00ffff" }} />

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {skills.map((s, i) => (
              <div key={s.name} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{s.name}</span>
                  <span style={{ color: s.color, textShadow: "0 0 4px " + s.color }}>{s.level}%</span>
                </div>
                <div className="skill-bar-v2">
                  <div
                    className="skill-fill"
                    style={{
                      width: s.level + "%",
                      background: "linear-gradient(90deg, " + s.color + "88, " + s.color + ")",
                      boxShadow: "0 0 6px " + s.color,
                      animationDelay: (i * 0.12) + "s",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.2)" }}>// TOOLS & FRAMEWORKS</p>
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

      {/* ══ PROJECTS ══ */}
      <section id="projects" className="relative z-10 py-28 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(255,153,0,0.4)" }}>// SECTION_03</p>
          <h2 className="sec-head glow-orange text-2xl">Operations<span className="prefix glow-red"> _CLASSIFIED</span></h2>
          <div className="section-divider" style={{ color: "#ff9900" }} />

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="cyber-card-v2 p-6" style={{ borderColor: p.accentColor + "22" }}>
                <div className="bracket-tl" style={{ color: p.accentColor }} />
                <div className="bracket-tr" style={{ color: p.accentColor }} />
                <div className="bracket-bl" style={{ color: p.accentColor }} />
                <div className="bracket-br" style={{ color: p.accentColor }} />

                <div className="flex justify-between items-start mb-4">
                  <span className="font-hacker text-3xl" style={{ color: p.accentColor + "44" }}>{p.id}</span>
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

                <div className="tag-badge mb-3 inline-block" style={{ color: p.accentColor, borderColor: p.accentColor + "55" }}>
                  {p.tag}
                </div>

                <h3 className="font-body text-lg font-bold mb-3" style={{ color: "#ffffff", textShadow: "0 0 8px " + p.accentColor }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>{p.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5" style={{ color: p.accentColor, border: "1px solid " + p.accentColor + "33", background: p.accentColor + "0a" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section id="timeline" className="relative z-10 py-28 px-8" style={{ background: "rgba(255,255,0,0.012)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(255,255,0,0.4)" }}>// SECTION_04</p>
          <h2 className="sec-head glow-yellow text-2xl">Timeline<span className="prefix glow-orange"> _MISSION_LOG</span></h2>
          <div className="section-divider" style={{ color: "#ffff00" }} />

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, #ff990044, #ffff0044, transparent)" }} />
            <div className="space-y-14 pl-10">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[41px] top-1 w-3 h-3 border" style={{ borderColor: item.color }}>
                    <div className="w-full h-full animate-pulse" style={{ background: item.color, opacity: 0.4 }} />
                  </div>
                  <p className="text-xs tracking-widest mb-1" style={{ color: item.color, textShadow: "0 0 6px " + item.color }}>{item.year}</p>
                  <h3 className="font-body font-bold text-lg mb-1" style={{ color: "#ffffff" }}>{item.role}</h3>
                  <p className="text-xs tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>{item.org}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="relative z-10 py-28 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(189,0,255,0.4)" }}>// SECTION_05</p>
            <h2 className="sec-head glow-purple text-2xl">Contact<span className="prefix glow-cyan"> _SECURE_CHANNEL</span></h2>
            <div className="section-divider" style={{ color: "#bd00ff" }} />
            <p className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
              // ENCRYPTED COMMS ONLY — ALL CONNECTIONS MONITORED
            </p>
          </div>

          <div className="terminal-window" style={{ borderColor: "#bd00ff44", boxShadow: "0 0 30px rgba(189,0,255,0.1)" }}>
            <div className="terminal-header" style={{ borderColor: "#bd00ff44", background: "rgba(189,0,255,0.06)" }}>
              <div className="terminal-dot" style={{ background: "#ff0033" }} />
              <div className="terminal-dot" style={{ background: "#ffff00" }} />
              <div className="terminal-dot" style={{ background: "#00ff41" }} />
              <span className="ml-4 text-xs" style={{ color: "rgba(189,0,255,0.6)" }}>
                root@cybersec:~$ ./contact.sh --secure
              </span>
            </div>
            <div className="p-8">
              {[
                { label: "EMAIL",    value: "your@email.com",               color: "#00ff41" },
                { label: "LINKEDIN", value: "linkedin.com/in/yourname",      color: "#00ffff" },
                { label: "GITHUB",   value: "github.com/Charitardha555",     color: "#bd00ff" },
                { label: "PGP KEY",  value: "0x[YOUR_PGP_FINGERPRINT]",      color: "#ff9900" },
                { label: "SIGNAL",   value: "+xx-xxxx-xxxx (encrypted only)", color: "#ffff00" },
              ].map((c) => (
                <div key={c.label} className="contact-row">
                  <span className="text-xs tracking-widest w-24 flex-shrink-0" style={{ color: c.color, textShadow: "0 0 4px " + c.color }}>
                    &gt; {c.label}
                  </span>
                  <span className="contact-val text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{c.value}</span>
                </div>
              ))}
              <div className="flex flex-wrap gap-4 justify-center pt-8">
                <a href="mailto:your@email.com" className="cyber-btn" style={{ borderColor: "#00ff41", color: "#00ff41" }}>
                  Send Encrypted Mail
                </a>
                <a href="https://github.com/Charitardha555" className="cyber-btn" style={{ borderColor: "#bd00ff", color: "#bd00ff" }}>
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="relative z-10 py-8 px-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
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
