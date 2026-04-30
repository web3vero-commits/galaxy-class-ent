import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#0A0A0F", panel: "#0F0F17", border: "#1E1E2E" },
        ink: { DEFAULT: "#E8E8F0", dim: "#C8C8D0", muted: "#9A9AAA", faint: "#6B6B7B" },
        accent: { DEFAULT: "#9AD" },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
