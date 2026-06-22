import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
      },
      colors: {
        cream: "#fdf8f0",
        parchment: "#f5ead8",
        champagne: "#f7e7ce",
        gold: "#c9a84c",
        burgundy: "#722f37",
        ink: "#2c2416",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glassLeft: {
          "0%": { transform: "translateX(-120px) rotate(-15deg)", opacity: "0" },
          "30%": { opacity: "1" },
          "60%": { transform: "translateX(-18px) rotate(-8deg)" },
          "75%": { transform: "translateX(-22px) rotate(-10deg)" },
          "100%": { transform: "translateX(-18px) rotate(-8deg)" },
        },
        glassRight: {
          "0%": { transform: "translateX(120px) rotate(15deg)", opacity: "0" },
          "30%": { opacity: "1" },
          "60%": { transform: "translateX(18px) rotate(8deg)" },
          "75%": { transform: "translateX(22px) rotate(10deg)" },
          "100%": { transform: "translateX(18px) rotate(8deg)" },
        },
        bubbleRise: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.8" },
          "100%": { transform: "translateY(-60px) scale(0.3)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
        slideUp: "slideUp 0.6s ease-out",
        glassLeft: "glassLeft 1.2s cubic-bezier(0.34,1.56,0.64,1) forwards",
        glassRight: "glassRight 1.2s cubic-bezier(0.34,1.56,0.64,1) forwards",
        bubbleRise: "bubbleRise 1.4s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
