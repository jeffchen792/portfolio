/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        emerald: {
          50: '#F0F4F1',
          100: '#DCE5DE',
          200: '#B9CCC0',
          300: '#8FAEA0',
          400: '#678D7D',
          500: '#456E5E',
          600: '#335548',
          700: '#2A453B',
          800: '#233730',
          900: '#1A2924',
        },
        stone: {
          50: '#FAF9F6',
          100: '#F2EFE9',
          200: '#E3DED1',
          300: '#D3CBB8',
          400: '#B5AA8F',
          500: '#968A6A',
          600: '#756A4F',
          700: '#5C523C',
          800: '#3D3628',
          900: '#2C271C',
        },
        teal: {
          200: '#E6F598',
          300: '#D4F134', // The bright lime accent from Canva
          400: '#C5E025',
          500: '#A9C21A',
        }
      },
      animation: {
        'blob': 'blob 15s infinite alternate ease-in-out',
        'blob-reverse': 'blob-reverse 18s infinite alternate ease-in-out',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(100px, -100px) scale(1.1)' },
          '66%': { transform: 'translate(-50px, 50px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'blob-reverse': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-100px, 100px) scale(1.2)' },
          '66%': { transform: 'translate(50px, -50px) scale(0.8)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
