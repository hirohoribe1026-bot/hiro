import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1E1B4B",
        violet: "#6B46C1",
        gold: "#D4AF37",
        cream: "#FAF7F2",
        starlight: "#F5E9C8",
      },
      fontFamily: {
        serif: ["var(--font-noto-serif)", "Noto Serif JP", "serif"],
        sans: ["var(--font-noto-sans)", "Noto Sans JP", "sans-serif"],
      },
      backgroundImage: {
        "cosmic": "radial-gradient(ellipse at top, #2a2566 0%, #1E1B4B 45%, #0c0a2a 100%)",
        "aurora": "linear-gradient(135deg, #1E1B4B 0%, #6B46C1 50%, #D4AF37 100%)",
        "gold-sheen": "linear-gradient(120deg, #D4AF37 0%, #F5E9C8 50%, #D4AF37 100%)",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        ripple: "ripple 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
      boxShadow: {
        gold: "0 0 24px rgba(212, 175, 55, 0.35)",
        deep: "0 20px 60px -20px rgba(30, 27, 75, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
