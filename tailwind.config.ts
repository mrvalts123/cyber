import tailwindAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cyberpunk Theme Colors
        cyber: {
          dark: "hsl(240 15% 6%)",
          darker: "hsl(240 18% 3%)",
          panel: "hsl(240 12% 10%)",
          border: "hsl(180 100% 40%)",
          "border-alt": "hsl(330 100% 50%)",
        },
        terminal: {
          bg: "hsl(180 50% 5%)",
          text: "hsl(150 100% 60%)",
          bright: "hsl(150 100% 75%)",
          dim: "hsl(150 50% 40%)",
        },
        neon: {
          cyan: "hsl(180 100% 50%)",
          pink: "hsl(330 100% 60%)",
          purple: "hsl(270 100% 60%)",
          green: "hsl(150 100% 60%)",
          blue: "hsl(200 100% 50%)",
          orange: "hsl(30 100% 60%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        mono: ["'Courier New'", "Courier", "monospace"],
        cyber: ["'Share Tech Mono'", "'Courier New'", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        glow: {
          "0%, 100%": { opacity: "1", textShadow: "0 0 10px currentColor, 0 0 20px currentColor" },
          "50%": { opacity: "0.8", textShadow: "0 0 20px currentColor, 0 0 40px currentColor" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 10px currentColor, 0 0 20px currentColor, inset 0 0 10px currentColor" },
          "50%": { boxShadow: "0 0 20px currentColor, 0 0 40px currentColor, inset 0 0 20px currentColor" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "41%": { opacity: "1" },
          "42%": { opacity: "0.8" },
          "43%": { opacity: "1" },
          "45%": { opacity: "0.9" },
          "46%": { opacity: "1" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "33%": { transform: "translate(-2px, 2px)" },
          "66%": { transform: "translate(2px, -2px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        flicker: "flicker 3s linear infinite",
        scanline: "scanline 8s linear infinite",
        glitch: "glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
      },
      boxShadow: {
        "neon-cyan": "0 0 10px hsl(180 100% 50% / 0.5), 0 0 20px hsl(180 100% 50% / 0.3), 0 0 30px hsl(180 100% 50% / 0.2)",
        "neon-pink": "0 0 10px hsl(330 100% 60% / 0.5), 0 0 20px hsl(330 100% 60% / 0.3), 0 0 30px hsl(330 100% 60% / 0.2)",
        "neon-purple": "0 0 10px hsl(270 100% 60% / 0.5), 0 0 20px hsl(270 100% 60% / 0.3), 0 0 30px hsl(270 100% 60% / 0.2)",
        "neon-green": "0 0 10px hsl(150 100% 60% / 0.5), 0 0 20px hsl(150 100% 60% / 0.3), 0 0 30px hsl(150 100% 60% / 0.2)",
        "cyber-inset": "inset 0 0 20px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.3)",
        "cyber-panel": "0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(hsl(180 100% 50% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(180 100% 50% / 0.1) 1px, transparent 1px)",
        "cyber-gradient": "linear-gradient(135deg, hsl(180 100% 10%) 0%, hsl(240 15% 6%) 50%, hsl(330 100% 10%) 100%)",
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
