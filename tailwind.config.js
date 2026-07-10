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
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Quantum lab palette
        space: {
          DEFAULT: '#050310',
          deep: '#02010a',
          card: '#0A0820',
        },
        nebula: {
          DEFAULT: '#7c3aed',
          soft: '#a78bfa',
          glow: '#c4b5fd',
        },
        quantum: {
          DEFAULT: '#10b981',
          bright: '#34d399',
          glow: '#6ee7b7',
          dark: '#064e3b',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          bright: '#22d3ee',
          glow: '#67e8f9',
        },
        hud: '#9adcff',
        star: '#eef2ff',
      },
      animation: {
        'blob': 'blob 15s infinite alternate ease-in-out',
        'blob-reverse': 'blob-reverse 18s infinite alternate ease-in-out',
        'blink': 'blink 1.6s ease-in-out infinite',
        'scroll-dot': 'scroll-dot 1.8s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbit 25s linear infinite',
        'particle-drift': 'particle-drift 8s ease-in-out infinite',
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
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '25%': { opacity: '1' },
          '75%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.3), 0 0 60px rgba(16, 185, 129, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(16, 185, 129, 0.5), 0 0 100px rgba(16, 185, 129, 0.2)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' },
        },
        'orbit-reverse': {
          '0%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
          '100%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
        },
        'particle-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '25%': { transform: 'translate(50px, -30px) scale(1.5)', opacity: '0.7' },
          '50%': { transform: 'translate(100px, 20px) scale(1)', opacity: '1' },
          '75%': { transform: 'translate(50px, 40px) scale(0.8)', opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
