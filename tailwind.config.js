/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    //   backgroundColor: {
    //   primarycolor: '#3490dc' 
    // },

    extend: {
      colors: {
        matisse: {
          50: "#f2f9fd",
          100: "#e4f0fa",
          200: "#c2e1f5",
          300: "#8dcaec",
          400: "#50b0e0",
          500: "#2996ce",
          600: "#1a77af",
          700: "#176291",
          800: "#175175",
          900: "#184562",
          950: "#102b41",
        },
      },
    },
    fontFamily: {},

    container: {
      padding: {
        DEFAULT: "1rem ",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};
