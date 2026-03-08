/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FDF8F0',
          gold: '#C9A96E',
          dark: '#1A1A2E',
          plum: '#4A2040',
          rose: '#D4A0A0',
          sage: '#A8B5A2',
          blush: '#F5E6E0',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
