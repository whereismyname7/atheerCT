/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  media: false,
  theme: {
    extend: {
      colors: {
        primary: '#5f2bf5',
        'primary-dark': '#4a21c7',
        'primary-light': '#a0a7fb',
      },
    },
  },
  plugins: [],
}
