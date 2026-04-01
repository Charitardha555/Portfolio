"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Link from "next/link";

const MatrixRain = dynamic(() => import("../components/MatrixRain"), { ssr: false });
const TypingText = dynamic(() => import("../components/TypingText"), { ssr: false });

const skills = [
  { name: "Threat Hunting", level: 95, color: "#00ff41" },
  { name: "Penetration Testing", level: 92, color: "#00ff41" },
  { name: "Digital Forensics", level: 90, color: "#00d4ff" },
  { name: "Red Team Ops", level: 88, color: "#00d4ff" },
  { name: "Malware Analysis", level: 85, color: "#bf00ff" },
  { name: "OSINT & Recon", level: 93, color: "#00ff41" },
  { name: "Incident Response", level: 91, color: "#00d4ff" },
  { name: "Python / Scripting", level: 87, color: "#bf00ff" },
];

const projects = [
  {
    title: "STELLA — AI Field Assistant",
    desc: "Offline AI assistant on Raspberry Pi 4 with OLED display, espeak-ng TTS, and Ollama LLM backend. Built for field ops without internet dependency.",
    tags: ["Python", "Raspberry Pi", "Ollama", "OLED"],
    status: "DEPLOYED",
    color: "#00ff41",
  },
  {
    title: "Threat Intelligence Pipeline",
    desc: "Automated threat feed aggregation and IOC correlation engine used in collaboration with government cyber units for tracking APT activity.",
    tags: ["Python", "OSINT", "MITRE ATT&CK", "Splunk"],
    status: "CLASSIFIED",
    color: "#00d4ff",
  },
  {
    title: "Red Team C2 Framework",
    desc: "Custom command-and-control infrastructure for authorized red team engagements. Includes evasion techniques and beacon obfuscation.",
    tags: ["C2", "Red Team", "Evasion", "Cobalt Strike"],
    status: "RESTRICTED",
    color: "#bf00ff",
  },
  {
    title: "Digital Forensics Toolkit",
    desc: "Collection of automated forensic analysis scripts for disk imaging, memory dumps, and artifact extraction in incident response operations.",
    tags: ["DFIR", "Python", "Volatility", "Autopsy"],
    status: "ACTIVE",
    color: "#00ff41",
  },
];

const navItems = ["HOME", "ABOUT", "SKILLS", "PROJECTS", "CONTACT"];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("HOME");
  const [bootComplete, setBootComplete] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [skillsVisible, setSkillsVisible] = useState(false);

  const bootSequence = [
    "[ OK ] Initializing secure shell...",
    "[ OK ] Loading encryption modules...",
    "[ OK ] Establishing VPN tunnel...",
    "[ OK ] Bypassing firewall rules...",
    "[ OK ] Authenticating identity...",
    "[ OK ] ACCESS GRANTED — Welcome, Operator.",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setBootLines((prev) => [...prev, bootSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBootComplete(true), 600);
      }
    }, 350);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!bootComplete) return;
    const timer = setTimeout(() => setSkillsVisible(true), 800);
    return () => clearTimeout(timer);
  }, [bootComplete]);

  if (!bootComplete) {
    return (
      <div className="min-h-screen bg-darker-bg flex items-center justify-center font-mono">
        <div className="p-8 max-w-xl w-full">
          <div className="text-neon-green text-xs mb-4">
            CHARITARDHA_PULIPATI_OS v4.2.0 — BOOT SEQUENCE
          </div>
          <div className="space-y-2">
            {bootLines.map((line, idx) => (
              <div
                key={idx}
                className="text-sm"
                style={{
                  color: line.includes("GRANTED") ? "#00ff41" : "#6b7280",
                  textShadow: line.includes("GRANTED") ? "0 0 8px #00ff41" : "none",
                }}
              >
                {line}
              </div>
            ))}
            {bootLines.length < bootSequence.length && (
              <span className="text-neon-green cursor-blink">█</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg font-mono relative scanlines crt-flicker">
      {/* Matrix Background */}
      <MatrixRain />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,8,0.8) 100%)",
          zIndex: 1,
        }}
      />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: "rgba(5, 5, 8, 0.9)",
          borderColor: "rgba(0,255,65,0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-neon-green text-xs neon-text">▶</span>
            <span className="text-neon-green text-sm font-bold tracking-widest">
              CP<span className="text-gray-500">::</span>PORTFOLIO
            </span>
          </div>
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setActiveSection(item)}
                className="px-3 py-1 text-xs tracking-widest transition-all duration-200 rounded"
                style={{
                  color: activeSection === item ? "#00ff41" : "#4b5563",
                  textShadow: activeSection === item ? "0 0 8px #00ff41" : "none",
                  borderBottom: activeSection === item ? "1px solid #00ff41" : "1px solid transparent",
                }}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full bg-neon-green inline-block"
              style={{ boxShadow: "0 0 6px #00ff41" }} />
            <span>SECURE</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center"
        style={{ zIndex: 2 }}
      >
        <div className="text-center px-6 max-w-4xl">
          {/* Terminal prompt line */}
          <div className="text-xs text-gray-500 mb-6 tracking-widest">
            <span className="text-neon-green">root@cyberops</span>
            <span className="text-gray-600">:</span>
            <span className="text-neon-cyan">~</span>
            <span className="text-gray-600">$ </span>
            <span className="text-gray-400">whoami</span>
          </div>

          {/* NAME with glitch */}
          <h1
            className="glitch text-5xl md:text-7xl font-black tracking-widest mb-2 text-white"
            data-text="CHARITARDHA"
            style={{ letterSpacing: "0.15em" }}
          >
            CHARITARDHA
          </h1>
          <div
            className="text-neon-green text-lg md:text-2xl tracking-[0.3em] font-bold mb-8"
            style={{ textShadow: "0 0 10px #00ff41" }}
          >
            PULIPATI
          </div>

          {/* Typing role */}
          <div className="text-sm md:text-lg mb-10 h-8">
            <span className="text-gray-500">&gt; </span>
            <TypingText
              phrases={[
                "Threat Hunter & Red Team Operator",
                "Government Cyber Collaboration Lead",
                "Digital Forensics Specialist",
                "Offensive Security Expert",
                "Catching Rogue Hackers. Officially.",
              ]}
              className="text-neon-cyan"
            />
          </div>

          {/* Status badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { label: "GOV CLEARANCE", color: "#00ff41" },
              { label: "RED TEAM CERTIFIED", color: "#00d4ff" },
              { label: "DFIR ACTIVE", color: "#bf00ff" },
            ].map(({ label, color }) => (
              <span
                key={label}
                className="text-xs px-3 py-1 rounded border tracking-widest"
                style={{
                  color,
                  borderColor: color,
                  boxShadow: `0 0 8px ${color}40`,
                  background: `${color}10`,
                }}
              >
                ⬡ {label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            
              href="#projects"
              className="px-6 py-3 text-sm tracking-widest border transition-all duration-300 rounded"
              style={{
                color: "#00ff41",
                borderColor: "#00ff41",
                boxShadow: "0 0 15px rgba(0,255,65,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,255,65,0.1)";
                e.currentTarget.style.boxShadow = "0 0 25px rgba(0,255,65,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(0,255,65,0.2)";
              }}
            >
              [VIEW_OPERATIONS]
            </a>
            
              href="#contact"
              className="px-6 py-3 text-sm tracking-widest border transition-all duration-300 rounded"
              style={{ color: "#6b7280", borderColor: "#374151" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#00d4ff";
                e.currentTarget.style.borderColor = "#00d4ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6b7280";
                e.currentTarget.style.borderColor = "#374151";
              }}
            >
              [ESTABLISH_CONTACT]
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600 tracking-widest flex flex-col items-center gap-1">
          <span>SCROLL TO INFILTRATE</span>
          <span className="text-neon-green animate-bounce">▼</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-24 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="ABOUT" command="cat /etc/operator.profile" />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="terminal-card p-6">
              <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
                <span className="text-neon-green">●</span> OPERATOR_PROFILE.txt
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Cybersecurity operator specializing in{" "}
                <span className="text-neon-green">threat hunting</span>,{" "}
                <span className="text-neon-cyan">offensive security</span>, and{" "}
                <span className="text-neon-purple">digital forensics</span>. Operating
                at the intersection of red team ops and government collaboration to
                identify, track, and neutralize malicious actors.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Officially authorized to pursue rogue hackers in collaboration with
                government entities. Expertise spans full kill-chain attack simulation,
                APT tracking, and incident response in high-stakes environments.
              </p>
            </div>

            <div className="terminal-card p-6">
              <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">●</span> SPECIALIZATIONS.json
              </div>
              <div className="space-y-3">
                {[
                  { icon: "⚔", label: "Red & Purple Team Ops", color: "#00ff41" },
                  { icon: "🔍", label: "Threat Hunting & APT Tracking", color: "#00d4ff" },
                  { icon: "🏛", label: "Government Cyber Collaboration", color: "#bf00ff" },
                  { icon: "🧬", label: "Digital Forensics & DFIR", color: "#00ff41" },
                  { icon: "🕵", label: "OSINT & Cyber Intelligence", color: "#00d4ff" },
                ].map(({ icon, label, color }) => (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <span>{icon}</span>
                    <span style={{ color }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative py-24 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="SKILLS" command="nmap --scan-type skills 127.0.0.1" />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {skills.map((skill, i) => (
              <div key={skill.name} className="terminal-card p-5">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-300 tracking-widest">{skill.name}</span>
                  <span style={{ color: skill.color }}>{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded">
                  <div
                    className="skill-bar-fill rounded"
                    style={{
                      width: skillsVisible ? `${skill.level}%` : "0%",
                      background: skill.color,
                      boxShadow: `0 0 8px ${skill.color}`,
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative py-24 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="OPERATIONS" command="ls -la /ops/classified/" />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {projects.map((p) => (
              <div key={p.title} className="terminal-card p-6 group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs text-gray-500 tracking-widest">/ops/</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded border tracking-widest"
                    style={{
                      color: p.color,
                      borderColor: p.color,
                      background: `${p.color}15`,
                    }}
                  >
                    {p.status}
                  </span>
                </div>
                <h3
                  className="text-sm font-bold mb-3 tracking-wide"
                  style={{ color: p.color }}
                >
                  {p.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        color: "#6b7280",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid #1f2937",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-24 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader label="CONTACT" command="ssh operator@charitardha.io" />

          <div className="terminal-card p-10 mt-12">
            <div className="text-xs text-gray-500 mb-6 tracking-widest">
              &gt; Initiating secure channel...
            </div>
            <p className="text-gray-400 text-sm mb-8">
              Whether it&apos;s a red team engagement, government collaboration, or threat
              intelligence sharing — open a secure channel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
                href="mailto:contact@charitardha.io"
                className="px-6 py-3 text-sm tracking-widest border rounded transition-all"
                style={{ color: "#00ff41", borderColor: "#00ff41" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,255,65,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                [SEND_ENCRYPTED_MAIL]
              </a>
              
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-sm tracking-widest border rounded transition-all"
                style={{ color: "#00d4ff", borderColor: "#00d4ff" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,212,255,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                [LINKEDIN_CONNECT]
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="relative py-6 border-t text-center"
        style={{ zIndex: 2, borderColor: "rgba(0,255,65,0.1)" }}
      >
        <p className="text-xs text-gray-600 tracking-widest">
          <span className="text-neon-green">©</span> CHARITARDHA PULIPATI{" "}
          <span className="text-gray-700">|</span> ALL SYSTEMS OPERATIONAL{" "}
          <span className="text-gray-700">|</span>{" "}
          <span className="text-neon-green">ENCRYPTED</span>
        </p>
      </footer>
    </div>
  );
}

// Reusable section header
function SectionHeader({ label, command }: { label: string; command: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-gray-600 tracking-widest">
        <span className="text-neon-green">root@cyberops</span>:~${" "}
        <span className="text-gray-400">{command}</span>
      </div>
      <div className="flex items-center gap-4">
        <h2
          className="text-2xl font-black tracking-[0.3em]"
          style={{ color: "#00ff41", textShadow: "0 0 15px rgba(0,255,65,0.5)" }}
        >
          {label}
        </h2>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(0,255,65,0.4), transparent)" }} />
      </div>
    </div>
  );
}
