/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0e27',
        'bg-secondary': '#0f1535',
        'bg-tertiary': '#151d42',
        'bg-card': '#1a2351',
        'accent-blue': '#00d4ff',
        'accent-purple': '#8b5cf6',
        'profit-green': '#00ff88',
        'loss-red': '#ff3366',
        'warning-yellow': '#ffd60a',
      },
    },
  },
  plugins: [],
}
