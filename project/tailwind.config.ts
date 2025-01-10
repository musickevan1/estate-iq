import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2563EB",
        secondary: "#059669",
        accent: "#F59E0B",
        neutral: "#F3F4F6",
      },
    },
  },
  plugins: [],
} satisfies Config;
