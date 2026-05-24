import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './store/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        accent: '#14B8A6',
        secondary: '#F59E0B',
        background: '#F8FAFC',
      },
      boxShadow: {
        glow: '0 24px 80px rgba(30, 64, 175, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
