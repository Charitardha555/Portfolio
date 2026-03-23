import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cyber-black": "#000000",
        "cyber-dark": "#0a0a0a",
        "cyber-green": "#00ff41",
        "cyber-green-dim": "#00cc33",
        "cyber-cyan": "#00ffff",
        "cyber-red": "#ff0033",
        "cyber-yellow": "#ffff00",
        "cyber-purple": "#9d00ff",
        "cyber-gray": "#1a1a1a",
        "cyber-border": "#003300",
      },
      fontFamily: {
        mono: ["'Share Tech Mono'", "'Courier New'", "monospace"],
        hacker: ["'VT323'", "monospace"],
        body: ["'Orbitron'", "monospace"],
      },
      animation: {
        "glitch": "glitch 2s infinite",
        "glitch2": "glitch2 2s infinite",
        "scanline": "scanline 8s linear infinite",
        "typing": "typing 3.5s steps(40, end)",
        "blink": "blink 1s step-end infinite",
        "flicker": "flicker 0.15s infinite",
        "matrix-fall": "matrix-fall 2s linear infinite",
        "pulse-green": "pulse-green 2s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0)", clipPath: "inset(0 0 0 0)" },
          "20%": { transform: "translate(-3px, 3px)", clipPath: "inset(10% 0 60% 0)" },
          "40%": { transform: "translate(3px, -3px)", clipPath: "inset(50% 0 20% 0)" },
          "60%": { transform: "translate(-3px, 0px)", clipPath: "inset(30% 0 40% 0)" },
          "80%": { transform: "translate(3px, 3px)", clipPath: "inset(70% 0 10% 0)" },
        },
        glitch2: {
          "0%, 100%": { transform: "translate(0)", clipPath: "inset(0 0 0 0)" },
          "20%": { transform: "translate(3px, -3px)", clipPath: "inset(60% 0 10% 0)" },
          "40%": { transform: "translate(-3px, 3px)", clipPath: "inset(20% 0 50% 0)" },
          "60%": { transform: "translate(3px, 0px)", clipPath: "inset(40% 0 30% 0)" },
          "80%": { transform: "translate(-3px, -3px)", clipPath: "inset(10% 0 70% 0)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.97" },
          "25%": { opacity: "0.94" },
          "75%": { opacity: "0.98" },
        },
        "pulse-green": {
          "0%, 100%": { boxShadow: "0 0 5px #00ff41, 0 0 10px #00ff41" },
          "50%": { boxShadow: "0 0 20px #00ff41, 0 0 40px #00ff41, 0 0 60px #00ff41" },
        },
        glow: {
          "from": { textShadow: "0 0 5px #00ff41, 0 0 10px #00ff41" },
          "to": { textShadow: "0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41" },
        },
      },
      boxShadow: {
        "cyber": "0 0 10px #00ff41, 0 0 20px #00ff41",
        "cyber-sm": "0 0 5px #00ff41",
        "cyber-cyan": "0 0 10px #00ffff, 0 0 20px #00ffff",
        "cyber-red": "0 0 10px #ff0033",
      },
    },
  },
  plugins: [],
};
export default config;