/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        gn: {
          100: '#A9D1B4',
          300: '#42BD97',
          400: '#008B75',
          500: '#24B04B',
        },
        bu: {
          200: '#69D6DA',
          300: '#4E9DA1',
          350: '#316466',
          400: '#5792C8',
          500: '#00DAE3',
          550: '#00F5FF',
          700: '#00263D',
          750: '#00214B',
          800: '#00201F',
        },
        gy: {
          50: '#F4F4F4',
          100: '#E9E9E9',
          150: '#EDEDED',
          200: '#D7D7D7',
          300: '#D2D2D2',
          400: '#9A9A9A',
          500: '#6E6E6E',
          600: '#62606B',
          650: '#56555A',
          700: '#141414',
          800: '#001125',
        },
        height: {
          13: '3.25rem',
        },
        warn: {
          400: '#EAD8A1',
          500: '#E2AC00',
          600: '#E1A2A2',
          700: '#E16161',
        },
        rgba: {
          'custom-gray': 'rgba(246, 245, 252, 0.7)',
        },
      },
      screens: {
        b1: '360px',
        b2: '393px',
        b3: '430px',
        sm: '480px',
        smx2: '600px',
        md: '768px',
        mdx2: '840px',
        mdx3: '1024px',
        lg: '1280px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}
