/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'development',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '375px',
        sml: '500px',
        md: '667px',
        mdl: '768px',
        lg: '960px',
        lgl: '1024px',
        xl: '1280px',
      },
      colors: {
        bodyColor: '#030D25',
      },
      fontFamily: {
        bodyFont: ['Poppins', 'sans-serif'],
        titleFont: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        todoShadow: '0px 0px 20px 5px rgba(0,0,0, .4)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
