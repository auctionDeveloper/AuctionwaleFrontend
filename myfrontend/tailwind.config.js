/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
       animation: {
    'scroll-left': 'scrollLeft 10s linear infinite',
    'scroll-right': 'scrollRight 10s linear infinite',
  },
  keyframes: {
    scrollLeft: {
      '0%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(-50%)' },
    },
    scrollRight: {
      '0%': { transform: 'translateX(-50%)' },
      '100%': { transform: 'translateX(0)' },
    },}
    },
  },
  plugins: [],
}
