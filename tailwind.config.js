const defaultTheme = require('tailwindcss/defaultTheme')
// const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: { // we add 'xs' and 'xmd' in with the default Tailwind breakpoints (order matters which is why 'xmd' is placed where it is)
      'xs': '475px',
      'sm': defaultTheme.screens.sm,
      'md': defaultTheme.screens.md,
      'xmd': '985px',
      'lg': defaultTheme.screens.lg,
      'xl': defaultTheme.screens.xl,
      'xls': '1320px',
      '2xl': defaultTheme.screens['2xl'],
    },
    fontSize: { // by default, all the below sizes exactly match the Tailwind defaults -- we just include this here to make it easy to change the default sizes/line-heights should you want to
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.15rem', { lineHeight: '1.75rem' }],
      xl: ['1.3rem', { lineHeight: '2rem' }],
      '2xl': ['1.6rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.75rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '4rem' }],
      '7xl': ['4.5rem', { lineHeight: '4.25rem' }],
      '8xl': ['6rem', { lineHeight: '5.5rem' }],
      '9xl': ['8rem', { lineHeight: '6.5rem' }],
    },
    extend: {
      colors: ({ colors }) => ({
        gray: { // we want to maintain a convention across projects where we always have a "gray" family, but maybe we want to use another built-in color family like "gray" for our grays, which is why we do this.. or you can provide custom gray colors like below
          '50': '#f4f4f4', // Secondary gray
          '100': '#e3e3e3', // hero/h1 text
          '200': '#c8c8c8',
          '300': '#a4a4a4',
          '400': '#818181',
          '500': '#58595B', // Primary gray
          '600': '#515151',
          '700': '#434343',
          '800': '#383838',
          '900': '#080808', // Primary dark gray (Black)
        },
        blue: { 
          '50': '#f2f7fd',
          '100': '#dbe9fb',
          '200': '#bbd8f7',
          '300': '#8fc1f0',
          '400': '#5da3e9',
          '500': '#387ee0',
          '600': '#2960c7',
          '700': '#294fa8',
          '800': '#26438c',
          '900': '#1e315c',
        },
        primary: {
          '50': '#fffcea',
          '100': '#fff4c5',
          '200': '#ffea85',
          '300': '#ffd846',
          '400': '#F9B21B',
          '500': '#fca000', // Primary Yellow/Orange
          '600': '#e27a00',
          '700': '#bb5302',
          '800': '#984008',
          '900': '#7c350b',
        },
        secondary: { // recommendation: if designer doesn't provide you with Tailwind-style palette, use https://uicolors.app/create to create a tailwind palette that you can easily export/copy into here
          '50': '#f2f2fc',
          '100': '#e1e2f8',
          '200': '#c9ccf4',
          '300': '#a4abec',
          '400': '#7981e1',
          '500': '#4d4dd5', // Secondary Blue/Purple
          '600': '#2f2f90', // Tertiary
          '700': '#4a3bba',
          '800': '#443598',
          '900': '#382f79',
        },
        
      }),
      fontFamily: {
        sans: ['Open sans', ...defaultTheme.fontFamily.sans],
        // serif: ['Della Respira', 'serif'] // add other font families like so
      },
      lineHeight: {
        'tightest': '1.1',
      },
      listStyleType: {
        circle: 'circle',
        square: 'square',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'spin-slowReverse': 'spin-reverse 15s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
