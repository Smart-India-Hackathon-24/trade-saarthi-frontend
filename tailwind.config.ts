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
          100: "#E6EEF8", // Lightest royal blue
          200: "#C9DCEF", // Lighter royal blue 
          300: "#9CBAE6", // Light royal blue
          400: "#4B77BE", // Royal blue
          500: "#2C5BA0", // Medium royal blue
          600: "#1E4785", // Darker royal blue
          700: "#13325E", // Deep royal blue
          800: "#0A1F3D", // Darkest royal blue
        },
        accent: {
          400: "#7AA2D3", // Light accent blue
          500: "#5C8BC1", // Medium accent blue
          600: "#3D74AF", // Dark accent blue
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
