/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        botanical: {
          50: '#f2f8f4',
          100: '#e1efe5',
          200: '#c5dfcd',
          300: '#9ac5a8',
          400: '#69a37c',
          500: '#47865c',
          600: '#346b48',
          700: '#2a553a',
          800: '#1b3f29',
          900: '#0f2b1b',
          950: '#06170e',
        },
        marigold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        terracotta: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        ivory: {
          50: '#fffefc',
          100: '#fdfbf7',
          200: '#faf8f5',
          300: '#f4efe1',
          400: '#eae2cd',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'luxury': '0 20px 40px -15px rgba(27, 63, 41, 0.08)',
        'gold': '0 10px 25px -5px rgba(217, 119, 6, 0.20)',
      }
    },
  },
  plugins: [],
}
