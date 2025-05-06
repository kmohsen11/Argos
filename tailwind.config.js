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
        base: '#000000',
        accent: '#00E676',
        surface: '#121212',
        surfaceAlt: '#1E1E1E',
        textPrimary: '#FFFFFF',
        textSecondary: '#B0B0B0',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '1rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
