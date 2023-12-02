/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        iplanGrey: '#E5E5E5',
        iplanPink: '#ED1F70',
        iplanPurple: '#AD5FFF',
        iplanWhite: '#FFFFFF',
        iplanGrey2: '#7C7B85',//texto gris
        iplanBlue: '#00AEEF',
        iplanBlue2: '#182a50',
        iplanOrange: '#FF8200',
        iplanForm: '#E0E0E0',
        iplanBrown: '#5B5151',
        iplanGreen: '#42E781'
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'figtree': ['Figtree', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'body': ['Roboto', 'sans-serif']
      },
    },
  },
  plugins: [],
  important: true,
}
