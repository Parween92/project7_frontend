/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#20948B",
        secondary: "#6AB187",
        accent: "#ec9a53",
        orangehell: "#ec9a5366",
        text: "#646767",
        hover: "#ec9a53cc",
      },
    },
  },
  plugins: [],
};
