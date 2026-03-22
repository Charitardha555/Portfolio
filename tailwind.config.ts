import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050816",
        sand: "#efe4cc",
        ember: "#fb6d4c",
        ocean: "#79d8ff",
        haze: "#93a4ff"
      },
      boxShadow: {
        glow: "0 0 120px rgba(121, 216, 255, 0.18)"
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
