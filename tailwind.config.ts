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
        "neon-green": "#00ff41",
        "neon-cyan": "#00d4ff",
        "neon-purple": "#bf00ff",
        "dark-bg": "#0a0a0f",
        "darker-bg": "#050508",
        "matrix-green": "#003b00",
      },
      fontFamily: {
        mono: ["Courier New", "Courier", "monospace"],
      },
      animation: {
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "glitch": "glitch-skew 4s infinite linear alternate-reverse",
        "blink": "blink 1s step-end infinite",
        "scan": "scan 8s linear infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      boxShadow: {
        "neon-green": "0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 20px #00ff41",
        "neon-cyan": "0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 20px #00d4ff",
      },
    },
  },
  plugins: [],
};

export default config;
