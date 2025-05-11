/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      perspective: {
        '1000': '1000px',
      },
      rotate: {
        'y-12': 'rotateY(12deg)',
      },
      colors: {
        base: '#0B0C10',
        accent: '#9CA3AF',
        surface: '#101114',
        surfaceAlt: '#151619',
        textPrimary: '#FFFFFF',
        textSecondary: '#B0B0B0',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        oxanium: ['Oxanium', 'monospace', 'system-ui'],
      },
      borderRadius: {
        'card': '1rem',
        '2xl': '1rem',
      },
      padding: {
        '4rem': '4rem',
      },
      maxWidth: {
        '1280': '1280px',
      },
      opacity: {
        '15': '0.15',
      },
    },
  },
  plugins: [],
};
