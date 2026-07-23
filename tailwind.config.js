/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0f',
          elevated: '#12121a',
          card: '#1a1a26',
          hover: '#22222e',
        },
        border: {
          DEFAULT: '#2a2a3a',
          subtle: '#1e1e2a',
        },
        text: {
          DEFAULT: '#e8e8f0',
          secondary: '#8888a0',
          muted: '#55556a',
        },
        accent: {
          DEFAULT: '#e85d4a',
          soft: '#e85d4a20',
        },
        green: { DEFAULT: '#4ade80', soft: '#4ade8020' },
        blue: { DEFAULT: '#60a5fa', soft: '#60a5fa20' },
        purple: { DEFAULT: '#a78bfa', soft: '#a78bfa20' },
        yellow: { DEFAULT: '#fbbf24', soft: '#fbbf2420' },
        rose: { DEFAULT: '#fb7185', soft: '#fb718520' },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
