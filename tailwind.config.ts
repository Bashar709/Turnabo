import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#efeade",
        "bg-alt": "#e7e1d1",
        card: "#f8f5ec",
        ink: "#1b2a24",
        pine: {
          DEFAULT: "#2f4a3c",
          deep: "#1d3129",
        },
        fjord: "#1b3a4b",
        amber: {
          DEFAULT: "#e8a33d",
          deep: "#c67f22",
        },
        fog: "#7c8c86",
        line: "rgba(27,42,36,0.12)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};

export default config;
