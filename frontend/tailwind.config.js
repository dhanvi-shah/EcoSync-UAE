/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Outfit", "DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        neon: "0 0 32px rgba(52, 211, 153, 0.25)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "score-ring-in": {
          "0%": { opacity: "0.65", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "score-ring-in": "score-ring-in 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "pulse-soft": "pulse-soft 2.2s ease-in-out infinite",
        "spin-slow": "spin-slow 1.15s linear infinite",
      },
    },
  },
  plugins: [],
};
