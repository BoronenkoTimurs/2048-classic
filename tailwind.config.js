/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./styles/tailwind.config.js",
  theme: {
    extend: {
      colors: {
        gameBackground: "#AD9D8F",
        squareBackgound: "#d3d3d3",
      },
    },
  },
  plugins: [],
};
