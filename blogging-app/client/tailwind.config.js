// tailwind.config.js
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // "purge" renamed to "content" in newer versions
  darkMode: 'class', // enable toggle support (modern sites often use dark mode)
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        // primary: '#4f46e5', // indigo-600
        primary: {
        600: "#3b82f6", // example blue
        700: "#2563eb",
      },
        secondary: '#f97316', // orange-500
        lightGray: '#f9fafb',
        mutedText: '#6b7280',
        midnight: '#121826',
        softWhite: '#fefefe',
      },
    },
  },
  plugins: [],
};
