/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["app/**/*.{js,ts,jsx,tsx}", "components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  // important: true,
  theme: {
    colors: {
      accent: "#FF3131",
      black: "#04080F",
      white: "#FCFCFC",
      orange: "#FF4C00",
      red: "#ff0000",
    },
    extend: {
      fontFamily: {
        mona: ["Mona", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
