/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        izri: {
          black: "#191919",
          red: "#E30613",
          redHover: "#C40510",
          redLight: "#FDE8E9",
          bg: "#F5F5F7",
          border: "#E9EAED",
          muted: "#777777",
          darkBg: "#111111",
          darkCard: "#191919",
          darkBorder: "#27272A",
        },
        primary: {
          DEFAULT: "#E30613",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#191919",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
        sm: "8px",
        md: "10px",
        lg: "14px",
        xl: "18px",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)",
        card: "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)",
        hover: "0 8px 24px -4px rgba(0, 0, 0, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
