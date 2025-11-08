/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          viola: 'rgb(65, 41, 111)',
          oro: 'rgb(197, 177, 140)',
        },
        fontFamily: {
          'civane': ['Civane Norm', 'sans-serif'], // Aggiungi il font personalizzato
        },
        screens: {
          landscapeOnly: { raw: '(orientation: landscape)' },
        },
      },
    },
    plugins: [],
  }
  