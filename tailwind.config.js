/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6f4',
          100: '#d9e9e3',
          200: '#b3d3c7',
          300: '#84b5a0',
          400: '#529176',
          500: '#357259',
          600: '#285a46',
          700: '#214839',
          800: '#1c3a2f',
          900: '#173027',
          950: '#0d1c17',
        },
        accent: {
          50: '#fef9e7',
          100: '#fbecbf',
          200: '#f7d97f',
          300: '#f3c33f',
          400: '#efac1a',
          500: '#d98e0a',
          600: '#b36b06',
          700: '#8f4f08',
          800: '#743f0e',
          900: '#62350f',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
