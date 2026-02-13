// Je configure Tailwind avec le theme medical noir, blanc et rouge
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#050505",
          card: "rgba(255, 255, 255, 0.03)",
          "card-hover": "rgba(255, 255, 255, 0.06)",
        },
        accent: {
          red: "#DC2626",
          "red-light": "#EF4444",
          "red-dark": "#991B1B",
          emerald: "#10B981",
          rose: "#EF4444",
          warning: "#F59E0B",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#A1A1AA",
          muted: "#71717A",
        },
        glass: {
          border: "rgba(255, 255, 255, 0.08)",
          "border-hover": "rgba(255, 255, 255, 0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
