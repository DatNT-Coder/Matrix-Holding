/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#222C5D",
          dark: "#161F3E",
        },
        yellow: {
          brand: "#FCBF49",
        },
        blue: {
          brand: "#002296",
        },
        cream: "#F7F6F2",
        muted: {
          DEFAULT: "#404040",
          light: "#737373",
          mid: "#4C4C4C",
        },
      },
      fontFamily: {
        sans: ["Nunito", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        "card-sm": "12px",
        btn: "8px",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.08)",
        "card-lg": "0 8px 24px rgba(0,0,0,0.12)",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
