import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-mode="night"]'],
  theme: {
    extend: {
      colors: {
        // Day Mode
        cream: "#FFF8F0",
        "cloud-white": "#FFFBF0",
        "honey-glow": "#FFD78E",
        butter: "#FFE9B8",
        "sky-mist": "#BFD9E8",
        moonlight: "#D8C9E8",
        blush: "#F5D5C8",
        midnight: "#1F2A44",
        "midnight-soft": "#3A4663",
        // Night Mode
        "night-deep": "#0B1226",
        "night-mid": "#1A2440",
        "night-soft": "#2A3556",
        starlight: "#E8E1FF",
        "glow-warm": "#FFB957",
        "glow-soft": "#FFE0A8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 8px 40px rgba(255,215,142,0.45)",
        "glow-night": "0 0 60px rgba(255,185,87,0.35)",
        card: "0 4px 20px rgba(31,42,68,0.06)",
        "card-night": "0 4px 20px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      lineHeight: {
        relaxed: "1.7",
      },
      transitionDuration: {
        "600": "600ms",
        "800": "800ms",
      },
      keyframes: {
        "drift-star": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.9" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "drift-star": "drift-star var(--duration, 4s) ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
