/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#1B2A4A', 50: '#EBEDF2', 100: '#D6DAE5', 200: '#ADB5CB', 300: '#8490B1', 400: '#5B6B97', 500: '#1B2A4A', 600: '#16223B', 700: '#0E1627', 800: '#0A0F1A', 900: '#05080E' },
        accent: { DEFAULT: '#C9A84C', 50: '#F8F2E0', 100: '#F1E6C2', 200: '#E3CD85', 300: '#D6B747', 400: '#C9A84C', 500: '#A68A2C', 600: '#7E681F', 700: '#554512', 800: '#2D2409', 900: '#141003' },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Merriweather', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
