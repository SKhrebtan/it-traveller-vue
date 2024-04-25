/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,vue,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F3743D',
        gray: '#939393'
      },
      screens: {
        modals: '540px',
        tablet: '768px',
        desktop: '1140px'
      }
    }
  },
  plugins: []
}
