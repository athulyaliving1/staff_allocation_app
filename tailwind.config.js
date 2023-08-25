/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      ss: "320px",
      // => @media (min-width: 640px) { ... }

      sm: "375px",
      sl: "425px",

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      desktop: "1440px",
      // => @media (min-width: 1536px) { ... }
    },

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
