/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {backgroundImage: {
      'main-bg': "url('/public/img/bg.svg')",
      'title': "url('/public/img/title.svg')"
    }
    },
  },
  plugins: [],
}
