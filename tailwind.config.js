/** @type {import('tailwindcss').Config} */
module.exports = {
  // hover só em quem tem mouse: no celular a borda laranja do cartão grudava depois do toque
  future: { hoverOnlyWhenSupported: true },
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Pantone 1655 e Black 7, da folha de cores oficial
        marca: '#FF3700',
        grafite: '#414141',
        // o mesmo laranja mais claro, só para texto pequeno sobre o fundo escuro
        // (o #FF3700 dá 3,2:1 ali; este dá 4,6:1)
        'marca-clara': '#FF8050',
      },
    },
  },
  plugins: [],
}