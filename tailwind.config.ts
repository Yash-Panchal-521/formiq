// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5A67D8", // Indigo
        secondary: "#22C55E", // Green
      },
      borderRadius: {
        xl: "16px",
      },
    },
  },
  darkMode: "media", // auto-switch based on system preference
  plugins: [],
};
