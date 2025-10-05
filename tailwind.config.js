/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontSize: {
        '10xl': '10rem',   // 160px
        '11xl': '12rem',   // 192px
        '12xl': '14rem',   // 224px
      },
      fontFamily: {
        blackOps: ['"Black Ops One"', 'cursive'],
        winky: ['"Winky Sans"', 'sans-serif'],
        yusei: ['"Yusei Magic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
