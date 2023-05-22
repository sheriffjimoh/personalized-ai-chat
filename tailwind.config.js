/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      boxShadow: {
        'menu': '0px 46px  130px 0px   #00000026',
        'form': '14px  0px 60px 0px #2C30400D',
      }
    },
  },
  plugins: [],
}

