/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#41be89",
        primaryBackground: "#e0f2ec",
        pendingBackground: "#fff1e3",
        secondary: "#2169ff",
        blue: "#2169ff",
        headerBg: "rgba(55, 116, 118,0.1)",
        warning: "#f56a6a",
        warningBackground: "#fde1e1",
        pending: "orange",
        darkGray: "#333333",
        gray: "#5E8290",
        lightGray: "#DDE5E5",
        black: "#000000",
        white: "#FFFFFF",
        lightgray_01: "#f1f1f1",
        cardBackground: "#F2F8F9",
        moneyCardBg: "#f5f9f9",
        moneyCardBgVariant: "#4D5162",
        yellow: "#F9C700",
        lightGreen: "rgba(110, 220, 133,0.3)",
        lightYellow: "rgba(237, 251, 139,0.3)",
        beige: "#f7f6f1",
      },
    },
  },
  plugins: [],
});
