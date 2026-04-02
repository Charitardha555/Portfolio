"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const MatrixRain = dynamic(() => import("../components/MatrixRain"), { ssr: false });
const TypingText = dynamic(() => import("../components/TypingText"), { ssr: false });

const skills = [
  { name: "Cybersecurity", level: 95, color: "#7CFFB2" },
  { name: "Penetration Testing", level: 92, color: "#29F0FF" },
  { name: "Digital Forensics", level: 90, color: "#B48CFF" },
  { name: "Cyber Threat Intelligence", level: 88, color: "#FF8A3D" },
  { name: "Red Teaming", level: 89, color: "#FF5C8A" },
  { name: "Web Application Security", level: 90, color: "#7CFFB2" },
  { name: "Generative AI", level: 85, color: "#29F0FF" },
  { name: "Python", level: 87, color: "#FFE56F" }
];

const certifications = [
  { title: "CRTA", issuer: "Certified Red Team Analyst", year: "2026", color: "#7CFFB2" },
  { title: "Top 4% on THM", issuer: "TryHackMe", year: "2026", color: "#29F0FF" },
  { title: "Certified Cyber Criminologist", issuer: "Virtual Cyber Labs", year: "2026", color: "#B48CFF" },
  { title: "Cyber Security Training", issuer: "Hackers Gurukul", year: "2025", color: "#FF8A3D" }
];

const projects = [
  {
    title: "Certified Cyber Criminologist",
    desc: "Working with Virtual Cyber Labs in a cyber criminology-focused role, building practical exposure in cybercrime investigation, criminology, and forensic-oriented security work.",
    tags: ["Cyber Criminology", "Digital Forensics", "Cybercrime Investigation", "CTI"],
    status: "FEB 2026 - PRESENT",
    color: "#7CFFB2"
  },
  {
    title: "Cyber Security Intern",
    desc: "Serving as a Cyber Security Intern at Hackers Gurukul, gaining hands-on experience in ethical hacking, vulnerability assessment, penetration testing, and practical security operations.",
    tags: ["Ethical Hacking", "Vulnerability Assessment", "Penetration Testing", "Kali Linux"],
    status: "MAY 2025 - PRESENT",
    color: "#29F0FF"
  },
  {
    title: "Red Team & CTF Practice",
    desc: "Actively strengthening offensive security skills through CTF participation, red teaming practice, and attack-focused labs, supported by a Top 4% TryHackMe standing and CRTA achievement.",
    tags: ["CTF", "Red Teaming", "TryHackMe", "Adversary Simulation"],
    status: "ONGOING",
    color: "#B48CFF"
  },
  {
    title: "AI & Security Builder",
    desc: "Combining cybersecurity with generative AI, Python, and web application development while exploring prompt engineering, machine learning, and practical AI-assisted security workflows.",
    tags: ["Generative AI", "Python", "Web App Security", "Prompt Engineering"],
    status: "ACTIVE",
    color: "#FF8A3D"
  }
];

const SPECIALIZATIONS = {
  left: [
    "Penetration Testing",
    "Web Application Security",
    "Digital Forensics",
    "Cybercrime Investigation"
  ],
  right: [
    "Cyber Threat Intelligence",
    "Red Teaming",
    "Generative AI",
    "Python Development"
  ]
};

const navItems = ["HOME", "ABOUT", "SKILLS", "CERTIFICATIONS", "PROJECTS", "CONTACT"];

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
    "[ OK ] ACCESS GRANTED - Welcome, Operator."
  ];

  useEffect(() => {
  let i = 0;

  const interval = setInterval(() => {
    if (i >= bootSequence.length) {
      clearInterval(interval);
      setTimeout(() => setBootComplete(true), 600);
      return;
    }

    const line = bootSequence[i];

    if (line) {
      setBootLines((prev) => [...prev, line]);
    }

    i++;
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
          <div className="text-neon-green text-xs mb-4 tracking-[0.25em]">
            CHARITARDHA_PULIPATI_OS v4.2.0 - BOOT SEQUENCE
          </div>
          <div className="space-y-2 rounded-xl border border-white/10 bg-black/45 p-6 shadow-[0_0_40px_rgba(41,240,255,0.06)]">
            {bootLines.map((line, idx) => (
              <div
                key={idx}
                className="text-sm"
                style={{
                  color: line?.includes("GRANTED") ? "#7CFFB2" : "#7d8796",
                  textShadow: line?.includes("GRANTED") ? "0 0 10px #7CFFB2" : "none"
                }}
              >
                {line}
              </div>
            ))}
            {bootLines.length < bootSequence.length ? (
              <span className="text-neon-green cursor-blink">█</span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg font-mono relative scanlines crt-flicker overflow-x-hidden">
      <MatrixRain />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 36%, rgba(4,7,12,0.86) 100%)",
          zIndex: 1
        }}
      />

      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: "rgba(4, 7, 12, 0.86)",
          borderColor: "rgba(124,255,178,0.18)",
          backdropFilter: "blur(10px)"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-neon-green text-xs neon-text">▶</span>
            <span className="text-neon-green text-sm font-bold tracking-widest">
              CP<span className="text-gray-500">::</span>PORTFOLIO
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setActiveSection(item)}
                className="px-3 py-1 text-[11px] tracking-widest transition-all duration-200 rounded"
                style={{
                  color: activeSection === item ? "#7CFFB2" : "#526071",
                  textShadow: activeSection === item ? "0 0 8px #7CFFB2" : "none",
                  borderBottom:
                    activeSection === item ? "1px solid #7CFFB2" : "1px solid transparent"
                }}
              >
                {item}
              </a>
            ))}
            <Link
              href="/admin"
              className="ml-3 rounded border px-3 py-1 text-[11px] tracking-widest transition-all"
              style={{
                color: "#29F0FF",
                borderColor: "rgba(41,240,255,0.45)",
                background: "rgba(41,240,255,0.08)"
              }}
            >
              ADMIN
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: "#7CFFB2", boxShadow: "0 0 8px #7CFFB2" }}
            />
            <span>SECURE</span>
          </div>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center" style={{ zIndex: 2 }}>
        <div className="text-center px-6 max-w-4xl">
          <div className="text-xs text-gray-500 mb-6 tracking-widest">
            <span className="text-neon-green">root@cyberops</span>
            <span className="text-gray-600">:</span>
            <span className="text-neon-cyan">~</span>
            <span className="text-gray-600">$ </span>
            <span className="text-gray-400">whoami</span>
          </div>

          <h1
            className="glitch text-5xl md:text-7xl font-black tracking-widest mb-2 text-white"
            data-text="CHARITARDHA"
            style={{ letterSpacing: "0.15em" }}
          >
            CHARITARDHA
          </h1>
          <div
            className="text-neon-green text-lg md:text-2xl tracking-[0.3em] font-bold mb-8"
            style={{ textShadow: "0 0 12px #7CFFB2" }}
          >
            PULIPATI
          </div>

          <div className="text-sm md:text-lg mb-10 h-8">
            <span className="text-gray-500">&gt; </span>
            <TypingText
              phrases={[
  "Cybersecurity Intern",
  "CTF Competitor",
  "Ethical Hacker",
  "AI Prompt Engineer",
  "Electronics Engineer",
  "Top 4% on TryHackMe"
]}
              className="text-neon-cyan"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { label: "GOV CLEARANCE", color: "#7CFFB2" },
              { label: "RED TEAM CERTIFIED", color: "#29F0FF" },
              { label: "DFIR ACTIVE", color: "#B48CFF" }
            ].map(({ label, color }) => (
              <span
                key={label}
                className="text-xs px-3 py-1 rounded border tracking-widest"
                style={{
                  color,
                  borderColor: color,
                  boxShadow: `0 0 8px ${color}40`,
                  background: `${color}10`
                }}
              >
                ⬡ {label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 text-sm tracking-widest border transition-all duration-300 rounded"
              style={{
                color: "#7CFFB2",
                borderColor: "#7CFFB2",
                boxShadow: "0 0 15px rgba(124,255,178,0.16)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(124,255,178,0.1)";
                e.currentTarget.style.boxShadow = "0 0 25px rgba(124,255,178,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(124,255,178,0.16)";
              }}
            >
              [VIEW_OPERATIONS]
            </a>
            <a
              href="#contact"
              className="px-6 py-3 text-sm tracking-widest border transition-all duration-300 rounded"
              style={{ color: "#6b7280", borderColor: "#374151" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#29F0FF";
                e.currentTarget.style.borderColor = "#29F0FF";
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600 tracking-widest flex flex-col items-center gap-1">
          <span>SCROLL TO INFILTRATE</span>
          <span className="text-neon-green animate-bounce">▼</span>
        </div>
      </section>

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
                  { icon: "⚔", label: "Red & Purple Team Ops", color: "#7CFFB2" },
                  { icon: "🔍", label: "Threat Hunting & APT Tracking", color: "#29F0FF" },
                  { icon: "🏛", label: "Government Cyber Collaboration", color: "#B48CFF" },
                  { icon: "🧬", label: "Digital Forensics & DFIR", color: "#FF8A3D" },
                  { icon: "🕵", label: "OSINT & Cyber Intelligence", color: "#FFE56F" }
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
                      transitionDelay: `${i * 100}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="relative py-24 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="CERTIFICATIONS" command="cat /secure/certs.log" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {certifications.map((cert) => (
              <div key={cert.title} className="terminal-card p-5">
                <div className="text-[11px] tracking-[0.25em] text-gray-500 mb-3">VERIFIED</div>
                <div className="text-lg font-bold mb-2" style={{ color: cert.color }}>
                  {cert.title}
                </div>
                <div className="text-sm text-gray-300">{cert.issuer}</div>
                <div className="mt-4 text-xs tracking-widest text-gray-500">{cert.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative py-24 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="OPERATIONS" command="ls -la /ops/classified/" />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {projects.map((project) => (
              <div key={project.title} className="terminal-card p-6 group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs text-gray-500 tracking-widest">/ops/</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded border tracking-widest"
                    style={{
                      color: project.color,
                      borderColor: project.color,
                      background: `${project.color}15`
                    }}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold mb-3 tracking-wide" style={{ color: project.color }}>
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        color: "#8f98a3",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid #1f2937"
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

      <section id="contact" className="relative py-24 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader label="CONTACT" command="ssh operator@charitardha.io" />

          <div className="terminal-card p-10 mt-12">
            <div className="text-xs text-gray-500 mb-6 tracking-widest">
              &gt; Initiating secure channel...
            </div>
            <p className="text-gray-400 text-sm mb-8">
              Whether it&apos;s a red team engagement, government collaboration, or threat
              intelligence sharing - open a secure channel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:charitardhapulipati@gmail.com"
                className="px-6 py-3 text-sm tracking-widest border rounded transition-all"
                style={{ color: "#7CFFB2", borderColor: "#7CFFB2" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(124,255,178,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                [SEND_ENCRYPTED_MAIL]
              </a>
              <a
                href="https://linkedin.com/in/charitardh-pulipati"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-sm tracking-widest border rounded transition-all"
                style={{ color: "#29F0FF", borderColor: "#29F0FF" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(41,240,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                [LINKEDIN_CONNECT]
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="relative py-6 border-t text-center"
        style={{ zIndex: 2, borderColor: "rgba(124,255,178,0.12)" }}
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
          style={{ color: "#7CFFB2", textShadow: "0 0 15px rgba(124,255,178,0.45)" }}
        >
          {label}
        </h2>
        <div
          className="flex-1 h-px"
          style={{ background: "linear-gradient(to right, rgba(124,255,178,0.45), transparent)" }}
        />
      </div>
    </div>
  );
}
