/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        blush: '#fce4ec',
        cream: '#fff8f8',
        lavender: '#f3e5f5',
        sakura: '#f48fb1',
        'sakura-deep': '#e91e8c',
        'rose-gold': '#b76e79',
        gold: '#d4af7a',
        petal: '#ffb7c5',
        'soft-purple': '#ce93d8',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 4s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
