/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#070A14',
        surface: '#0D1222',
        surfaceElevated: '#131B31',
        cyanAccent: '#00F2FE',
        indigoAccent: '#6366F1',
        purpleAccent: '#A855F7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderColor: {
        DEFAULT: 'rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
};
