import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          400: "#4F46E5", // Indigo
          500: "#4338CA",
          600: "#3730A3",
          700: "#312E81",
          800: "#2E1065", // Deep purple
        },
        accent: {
          400: "#A78BFA", // Lighter purple
          500: "#8B5CF6", // Purple
          600: "#7C3AED",
        },
        gray: {
          50: "#F8FAFC",
          200: "#E2E8F0",
          500: "#64748B",
          600: "#475569",
          900: "#0F172A",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
