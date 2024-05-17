// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        beige: '#f5f5dc',
        bisque: "#ffe4c4",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
