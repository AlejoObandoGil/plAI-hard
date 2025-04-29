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
        tertiary: {
          DEFAULT: '#a259f7', // Morado branding terciario
          dark: '#6d28d9',
        },
        accent: {
          DEFAULT: '#FFFFFF',
          dark: '#181A20', // Fondo principal
          card: '#23272F', // Fondo de cards/header
          input: '#2E323A', // Fondo de inputs
        },
        muted: {
          DEFAULT: '#A0A0A0',
          dark: '#808080',
        },
        success: {
          DEFAULT: '#21D375',
          dark: '#178a4d',
        },
        warning: {
          DEFAULT: '#FFB020',
          dark: '#b27816',
        },
        error: {
          DEFAULT: '#FF4B4B',
          dark: '#b22d2d',
        },
        info: {
          DEFAULT: '#38BDF8',
          dark: '#157bb8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Bebas Neue', 'Montserrat', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        36: '9rem',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        strong: '0 8px 24px 0 rgba(34, 211, 169, 0.15)',
        inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      },
      fontSize: {
        xxs: '0.65rem',
        tiny: '0.8rem',
        '7xl': '5rem',
      },
      zIndex: {
        60: '60',
        70: '70',
        100: '100',
      },
      maxWidth: {
        xs: '20rem',
        '3xl': '48rem',
        'screen-xl': '1280px',
      },
      minHeight: {
        'screen-75': '75vh',
      },
      transitionDuration: {
        0: '0ms',
        400: '400ms',
        600: '600ms',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
