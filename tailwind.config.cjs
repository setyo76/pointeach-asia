/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './hooks/**/*.{ts,tsx,js,jsx}',
    './store/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
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
