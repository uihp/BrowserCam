export default {
  content: ["index.html", "modules/**/*.js"],
  theme: {
    extend: {}
  },
  plugins: [],
  darkMode: 'class',
  variants: {
    backgroundColor: [
      "dark",
      "dark-hover",
      "dark-group-hover",
      "dark-even",
      "dark-odd"
    ],
    borderColor: ["dark", "dark-focus", "dark-focus-within"],
    textColor: ["dark", "dark-hover", "dark-active"]
  }
}
