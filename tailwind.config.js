/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,html}",
    "./public/**/*.{js,html}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
        '3xl': '1600px',
      },
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require('daisyui')],
}

