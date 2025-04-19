/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Azul eléctrico
          dark: '#1E3A8A',
        },
        secondary: {
          DEFAULT: '#22D3A9', // Verde aqua lima
          dark: '#0E766E',
        },
        accent: {
          DEFAULT: '#FFFFFF',
          dark: '#181A20', // Fondo principal
          card: '#23272F', // Fondo de cards/header
        },
        muted: {
          DEFAULT: '#A0A0A0',
        },
        success: {
          DEFAULT: '#21D375',
        },
        warning: {
          DEFAULT: '#FFB020',
        },
        error: {
          DEFAULT: '#FF4B4B',
        },
        info: {
          DEFAULT: '#38BDF8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Bebas Neue', 'Montserrat', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
