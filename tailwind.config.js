/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0c",
        charcoal: "#191816",
        bone: "#f4efe6",
        ivory: "#faf7f1",
        stone: "#8a8378",
        gold: "#a9824f",
        "gold-light": "#cdab78",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
        widest3: "0.32em",
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, #a9824f, transparent)",
      },
    },
  },
  plugins: [],
};
