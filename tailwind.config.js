/** @type {import('tailwindcss').Config} */
module.exports = {
  // hover só em quem tem mouse: no celular a borda laranja do cartão grudava depois do toque
  future: { hoverOnlyWhenSupported: true },
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}