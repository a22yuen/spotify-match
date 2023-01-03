const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Tailwind Defaults
        // e.g. text-blue-500
        // https://tailwindcss.com/docs/customizing-colors
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        blue: colors.blue,
        // custom colors
        'spotify-green': "#1DB954"
      },
    },
  },
  plugins: [],
};
