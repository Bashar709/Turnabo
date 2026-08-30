import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Flater
        bg: "#f4f1e8",
        "bg-alt": "#e9e3d4",
        card: "#fffef9",
        // Tekst
        ink: "#16231e", // hovedtekst, ~14:1 mot bg
        muted: "#3b453f", // sekundær brødtekst, ~9:1 mot bg
        fog: "#55635c", // hjelpetekst / mono-labels, ~4.8:1 mot bg
        // Aksenter
        pine: {
          DEFAULT: "#2c4739",
          deep: "#1b2f27",
        },
        fjord: "#194b63", // gikk mørkere for bedre kontrast
        amber: {
          DEFAULT: "#e29a2e",
          deep: "#8f5c10", // mørk nok til brødtekst-bruk
        },
        line: "rgba(22,35,30,0.16)",
        "line-strong": "rgba(22,35,30,0.28)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(22,35,30,0.04), 0 8px 24px -16px rgba(22,35,30,0.25)",
        pop: "0 16px 44px -18px rgba(22,35,30,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
