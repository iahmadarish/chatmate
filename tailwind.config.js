/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      'nunito': ['Nunito', 'sans-serif'],
      'opens': ['Open Sans', 'sans-serif'],
      'pops': ['Poppins', 'sans-serif'],

    },
    colors:{
      'blueone': '#5F35F5',
      'overlay' : 'rgba(0, 0, 0, 0.41);'
      

    }
    },
  },
  plugins: [],
}