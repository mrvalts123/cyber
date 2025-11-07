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
        // Enhanced Cyberpunk Theme
        cyber: {
          dark: "hsl(222 47% 4%)",
          darker: "hsl(222 50% 3%)",
          panel: "hsl(222 35% 10%)",
          border: "hsl(180 100% 45%)",
          "border-alt": "hsl(330 100% 55%)",
        },
        terminal: {
          bg: "hsl(222 45% 6%)",
          text: "hsl(150 100% 65%)",
          bright: "hsl(150 100% 75%)",
          dim: "hsl(150 50% 45%)",
        },
        neon: {
          cyan: "hsl(180 100% 50%)",
          pink: "hsl(330 100% 60%)",
          purple: "hsl(270 100% 60%)",
          green: "hsl(150 100% 60%)",
          blue: "hsl(200 100% 55%)",
          orange: "hsl(30 100% 60%)",
          yellow: "hsl(45 100% 55%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Courier New'", "monospace"],
        display: ["'Orbitron'", "'Inter'", "sans-serif"],
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
          "0%, 100%": { 
            opacity: "1", 
            filter: "brightness(1)",
          },
          "50%": { 
            opacity: "0.85", 
            filter: "brightness(1.2)",
          },
        },
        "glow-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px currentColor",
            opacity: "1"
          },
          "50%": { 
            boxShadow: "0 0 40px currentColor",
            opacity: "0.8"
          },
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
        shimmer: {
          "0%, 100%": { backgroundPosition: "200% 0" },
          "50%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
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
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "slide-up": "slide-up 0.4s ease-out",
        "slide-down": "slide-down 0.4s ease-out",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px hsl(180 100% 50% / 0.5), 0 0 40px hsl(180 100% 50% / 0.3)",
        "neon-pink": "0 0 20px hsl(330 100% 60% / 0.5), 0 0 40px hsl(330 100% 60% / 0.3)",
        "neon-purple": "0 0 20px hsl(270 100% 60% / 0.5), 0 0 40px hsl(270 100% 60% / 0.3)",
        "neon-green": "0 0 20px hsl(150 100% 60% / 0.5), 0 0 40px hsl(150 100% 60% / 0.3)",
        "cyber-sm": "0 2px 10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        "cyber-md": "0 8px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        "cyber-lg": "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.05)",
        "cyber-inset": "inset 0 2px 20px rgba(0, 0, 0, 0.6), inset 0 -2px 10px rgba(0, 0, 0, 0.3)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        "3d": "0 10px 40px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(hsl(180 100% 50% / 0.05) 1.5px, transparent 1.5px), linear-gradient(90deg, hsl(180 100% 50% / 0.05) 1.5px, transparent 1.5px)",
        "cyber-gradient": "linear-gradient(135deg, hsl(222 35% 10%) 0%, hsl(222 47% 6%) 50%, hsl(232 35% 10%) 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
