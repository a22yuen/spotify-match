const colors = require("tailwindcss/colors");

/** @type {impo rt('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tailwind Defaults
        // e.g. text-blue-500
        // https://tailwindcss.com/docs/customizing-colors
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        blue: colors.blue,
        // custom colors
        "spotify-green": "#1ED760",
      },
    },
  },
  plugins: [],
};
