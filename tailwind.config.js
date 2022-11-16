/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('chevronOpen', '&[data-state="open"]');
      addVariant('chevronClosed', '&[data-state="closed"]');
    }),
  ],
  theme: {
    extend: {
      boxShadow: {
        'footer': "inset 0px 4px 20px rgba(0, 0, 0, 0.15)",
        'header': "inset 0px 4px 10px rgba(0, 0, 0, 0.15)",
        'logo': "0px 4px 10px rgba(0, 0, 0, 0.15), inset 0px 4px 20px rgba(0, 0, 0, 0.15)",
        'icons': "box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1)",
        'btn': "0px 5px 20px rgba(0, 0, 0, 0.1)"
      },
      spacing: {
        '13': '3.125rem',
        '15': '3.75rem'
      },
      fontSize: {
        '2xs': '2rem',
        '3xs': '2.5rem',
        '2.5xl': '1.75rem',
        'xxs': '0.625rem'
      },
      borderRadius: {
        '1xs': '1.25rem',
        'xs': '0.625rem'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#FFFFFF',
      'black': '#000000',
      'blue': {
        700: '#2E86BE',
        500: '#4290BF',
        300: '#539FCE',
        scroll: '#3E93C9'
      },
      'sells': {
        low: '#FCBC1B',
        middle: '#F18C61',
        high: '#F16165'
      },
      'yellow': {
        200: '#F5E431'
      },
      'grey': {
        500: '#D6D6D6'
      }
    }
  },
};
