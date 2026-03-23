import dynamic from "next/dynamic";
import Link from "next/link";

const MatrixRain = dynamic(() => import("../components/MatrixRain"), { ssr: false });
const TypingText = dynamic(() => import("../components/TypingText"), { ssr: false });

const skills = [
  { name: "Penetration Testing", level: 95, color: "#00ff41" },
  { name: "Network Forensics", level: 92, color: "#00ffff" },
  { name: "Malware Analysis", level: 88, color: "#00ff41" },
  { name: "OSINT & Threat Intel", level: 90, color: "#00ffff" },
  { name: "Cloud Security (AWS/GCP)", level: 85, color: "#00ff41" },
  { name: "Reverse Engineering", level: 82, color: "#00ffff" },
  { name: "Exploit Development", level: 87, color: "#00ff41" },
  { name: "Incident Response", level: 93, color: "#00ffff" },
];

const projects = [
  {
    id: "01",
    title: "ROGUE_HUNTER",
    tag: "OFFENSIVE SEC",
    desc: "Automated red team framework for identifying rogue actors across dark web & clear net infrastructure.",
    tech: ["Python", "Tor", "YARA", "ELK"],
    status: "CLASSIFIED",
  },
  {
    id: "02",
    title: "PHANTOM_TRACE",
    tag: "FORENSICS",
    desc: "Deep packet inspection & memory forensics toolkit used in live government investigations.",
    tech: ["C++", "Wireshark API", "Volatility"],
    status: "ACTIVE",
  },
  {
    id: "03",
    title: "SENTINEL_NET",
    tag: "DEFENSE",
    desc: "AI-driven threat detection network monitoring 10k+ endpoints with real-time anomaly detection.",
    tech: ["ML", "Kafka", "Rust", "SIEM"],
    status: "DEPLOYED",
  },
  {
    id: "04",
    title: "ZERO_BREACH",
    tag: "CLOUD SEC",
    desc: "Zero-trust architecture implementation framework for government cloud infrastructure.",
    tech: ["Terraform", "AWS", "IAM", "Vault"],
    status: "ACTIVE",
  },
];

const timeline = [
  {
    year: "2024–NOW",
    role: "Head of Cybersecurity",
    org: "Gov. Collab Division",
    desc: "Leading offensive + defensive cyber ops in collaboration with national security agencies.",
  },
  {
    year: "2022–2024",
    role: "Senior Penetration Tester",
    org: "RedTeam Alpha",
    desc: "Executed 100+ authorized breach simulations across critical infrastructure.",
  },
  {
    year: "2020–2022",
    role: "Threat Intelligence Analyst",
    org: "CyberShield Inc.",
    desc: "Tracked APT groups, produced threat intel reports for Fortune 500 clients.",
  },
];

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen text-cyber-green font-mono overflow-x-hidden">
      {/* Matrix Background */}
      <MatrixRain />

      {/* ─── NAVBAR ──────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-cyber-green/20 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse" />
          <span className="font-body text-cyber-green font-bold tracking-widest text-sm">
            CYBER<span className="text-cyber-cyan">SEC</span>
          </span>
          <span className="text-cyber-green/30 text-xs">// ONLINE</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["about", "skills", "projects", "timeline", "contact"].map((item) => (
            <a key={item} href={`#${item}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-cyber-green/50">
          <span className="animate-blink">●</span>
          <span>SECURE_CONN</span>
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────── */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-8 pt-24">
        <div className="max-w-5xl w-full">
          {/* Terminal window */}
          <div className="terminal-window mb-8">
            <div className="terminal-header">
              <div className="terminal-dot bg-cyber-red" />
              <div className="terminal-dot bg-cyber-yellow" />
              <div className="terminal-dot bg-cyber-green" />
              <span className="ml-4 text-xs text-cyber-green/60">
                root@cybersec:~$ ./identify.sh
              </span>
            </div>
            <div className="p-6 space-y-2">
              <p className="text-cyber-green/50 text-sm">
                <span className="text-cyber-cyan">$</span> whoami
              </p>
              <p className="text-cyber-green text-sm">
                ▸ Initializing identity protocol...
              </p>
              <p className="text-cyber-green/70 text-sm">
                ▸ clearance_level: <span className="text-cyber-cyan">TOP_SECRET</span> | status:{" "}
                <span className="text-cyber-green">ACTIVE</span> | role:{" "}
                <span className="text-cyber-yellow">HEAD_OF_CYBERSECURITY</span>
              </p>
            </div>
          </div>

          {/* Main heading with glitch */}
          <div className="mb-6">
            <p className="text-cyber-cyan text-sm tracking-widest mb-4 font-mono">
              // IDENTITY CONFIRMED
            </p>
            <h1
              className="glitch font-body text-5xl md:text-7xl font-black tracking-wider mb-4"
              data-text="[YOUR NAME]"
            >
              [YOUR NAME]
            </h1>
            <div className="text-cyber-cyan font-hacker text-2xl md:text-3xl mt-4 h-10">
              <TypingText
                texts={[
                  "Head of Cybersecurity",
                  "Rogue Hacker Hunter",
                  "Penetration Tester",
                  "Govt. Security Advisor",
                  "Threat Intelligence Lead",
                ]}
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mb-10 mt-8">
            {[
              { label: "BREACHES STOPPED", value: "200+" },
              { label: "GOV CLEARANCE", value: "ACTIVE" },
              { label: "CVEs FOUND", value: "37" },
              { label: "THREAT ACTORS TRACKED", value: "500+" },
            ].map((stat) => (
              <div key={stat.label} className="border border-cyber-green/20 px-4 py-3 bg-cyber-green/5">
                <div className="text-cyber-green font-body text-xl font-bold neon-text">
                  {stat.value}
                </div>
                <div className="text-cyber-green/40 text-xs tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="cyber-btn">
              View Operations
            </a>
            <a href="#contact" className="cyber-btn" style={{ borderColor: "#00ffff", color: "#00ffff" }}>
              Establish Contact
            </a>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-24 right-8 hidden lg:block text-right">
          <div className="text-cyber-green/20 text-xs font-mono space-y-1">
            <p>IP: [REDACTED]</p>
            <p>PROTO: TLS 1.3</p>
            <p>CIPHER: AES-256-GCM</p>
            <p className="text-cyber-green/40">CONN: ENCRYPTED</p>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ───────────────────────────────────────── */}
      <section id="about" className="relative z-10 py-28 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-2xl font-body mb-16">About</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot bg-cyber-red" />
                <div className="terminal-dot bg-cyber-yellow" />
                <div className="terminal-dot bg-cyber-green" />
                <span className="ml-4 text-xs text-cyber-green/60">bio.txt</span>
              </div>
              <div className="p-6 space-y-4 text-sm text-cyber-green/80 leading-relaxed">
                <p>
                  <span className="text-cyber-cyan">$</span> cat /etc/about.conf
                </p>
                <p>
                  Elite cybersecurity professional operating at the intersection of{" "}
                  <span className="text-cyber-green">offensive security</span> and{" "}
                  <span className="text-cyber-cyan">government intelligence</span>.
                </p>
                <p>
                  Authorized to identify, track, and neutralize rogue hackers. Operating in
                  official capacity with full government clearance across national cyber defense
                  programs.
                </p>
                <p>
                  Specializing in{" "}
                  <span className="text-cyber-yellow">APT attribution</span>,{" "}
                  <span className="text-cyber-yellow">zero-day research</span>, and{" "}
                  <span className="text-cyber-yellow">critical infrastructure protection</span>.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "CLEARANCE LEVEL", value: "TOP SECRET / SCI" },
                { label: "SPECIALIZATION", value: "OFFENSIVE SEC OPS" },
                { label: "JURISDICTION", value: "NATIONAL + INTERNATIONAL" },
                { label: "COLLABORATION", value: "GOVERNMENT AGENCIES" },
                { label: "CERTIFICATION", value: "OSCP | CEH | CISSP | GREM" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-3 border-b border-cyber-green/10 group"
                >
                  <span className="text-cyber-green/40 text-xs tracking-widest group-hover:text-cyber-cyan transition-colors">
                    {item.label}
                  </span>
                  <span className="text-cyber-green text-sm font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SKILLS ──────────────────────────────────────── */}
      <section id="skills" className="relative z-10 py-28 px-8 bg-cyber-green/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-2xl font-body mb-16">Skills</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-cyber-green/80">{skill.name}</span>
                  <span className="text-cyber-cyan text-xs">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color === "#00ff41" ? "#00ffff" : "#00ff41"})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tool badges */}
          <div className="mt-16">
            <p className="text-cyber-green/40 text-xs tracking-widest mb-6">// TOOLS & FRAMEWORKS</p>
            <div className="flex flex-wrap gap-3">
              {[
                "Metasploit", "Burp Suite", "Nmap", "Wireshark", "Ghidra",
                "IDA Pro", "Volatility", "Cobalt Strike", "BloodHound",
                "Maltego", "Shodan", "YARA", "Splunk", "TheHive",
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 text-xs border border-cyber-green/20 text-cyber-green/70 hover:border-cyber-green hover:text-cyber-green hover:shadow-cyber-sm transition-all cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ────────────────────────────────────── */}
      <section id="projects" className="relative z-10 py-28 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-2xl font-body mb-16">Operations</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="cyber-card p-6 group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-cyber-cyan/40 font-hacker text-2xl">{project.id}</span>
                  <span
                    className={`text-xs px-2 py-1 border tracking-widest ${
                      project.status === "CLASSIFIED"
                        ? "border-cyber-red/50 text-cyber-red"
                        : "border-cyber-green/30 text-cyber-green/60"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="text-cyber-cyan text-xs tracking-widest mb-2">{project.tag}</div>
                <h3 className="font-body text-cyber-green text-lg font-bold mb-3 group-hover:neon-text">
                  {project.title}
                </h3>
                <p className="text-cyber-green/60 text-sm mb-4 leading-relaxed">{project.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs text-cyber-cyan/60 border border-cyber-cyan/20 px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ────────────────────────────────────── */}
      <section id="timeline" className="relative z-10 py-28 px-8 bg-cyber-green/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-2xl font-body mb-16">Timeline</h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-cyber-green/20" />

            <div className="space-y-12 pl-10">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  {/* Dot */}
                  <div className="absolute -left-[42px] top-1 w-3 h-3 border border-cyber-green bg-black">
                    <div className="w-full h-full bg-cyber-green/40 animate-pulse" />
                  </div>

                  <div className="text-cyber-cyan text-xs tracking-widest mb-1">{item.year}</div>
                  <h3 className="font-body text-cyber-green font-bold text-lg">{item.role}</h3>
                  <div className="text-cyber-green/40 text-xs tracking-wider mb-2">{item.org}</div>
                  <p className="text-cyber-green/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="relative z-10 py-28 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title text-2xl font-body mb-6 mx-auto">Contact</h2>
          <p className="text-cyber-green/40 text-sm mt-10 mb-12 tracking-widest">
            // SECURE CHANNEL — ENCRYPTED COMMS ONLY
          </p>

          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot bg-cyber-red" />
              <div className="terminal-dot bg-cyber-yellow" />
              <div className="terminal-dot bg-cyber-green" />
              <span className="ml-4 text-xs text-cyber-green/60">contact.sh</span>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4 text-left">
                {[
                  { label: "EMAIL", value: "your@email.com", icon: ">" },
                  { label: "LINKEDIN", value: "linkedin.com/in/yourname", icon: ">" },
                  { label: "GITHUB", value: "github.com/Charitardha555", icon: ">" },
                  { label: "PGP KEY", value: "0x[YOUR_PGP_KEY]", icon: ">" },
                ].map((contact) => (
                  <div key={contact.label} className="flex gap-4 items-center text-sm border-b border-cyber-green/10 pb-3">
                    <span className="text-cyber-cyan w-24 text-xs tracking-widest flex-shrink-0">
                      {contact.icon} {contact.label}
                    </span>
                    <span className="text-cyber-green/80">{contact.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4 justify-center">
                <a href="mailto:your@email.com" className="cyber-btn text-sm">
                  Send Encrypted Mail
                </a>
                <a
                  href="https://github.com/Charitardha555"
                  className="cyber-btn text-sm"
                  style={{ borderColor: "#00ffff", color: "#00ffff" }}
                >
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-cyber-green/10 py-8 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-cyber-green/20 text-xs font-mono tracking-widest">
            // ALL ACTIVITIES AUTHORIZED & MONITORED
          </span>
          <span className="text-cyber-green/20 text-xs">
            © {new Date().getFullYear()} — CYBERSEC DIVISION
          </span>
          <div className="flex items-center gap-2 text-xs text-cyber-green/30">
            <span className="animate-blink">●</span>
            <span>SYSTEM ONLINE</span>
          </div>
        </div>
      </footer>
    </main>
  );
}