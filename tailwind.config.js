/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: "Poppins, sans-serif",
      Heading: "Segoe UI",
      body: "Lato, sans-serif",
      title: "Nunito, sans-serif",
    },

    extend: {
      colors: {
        tertiarywhite: {
          50: "#FBFBFB",
          100: "#FFFFFF",
          150: "#E7E7E7",
        },
        "gray-50": "#CCCCCC",
        blackShade: {
          50: "#292929",
        },
        tertiaryred: {
          50: "#F80000",
          100: "#fee2e2",
          150: "#D10000",
          400: "#DF1010",
          500: "#9E2B25",
        },
        tertiaryViolet: "#8B5BDC",
        tertiaryRed: "#DF1010",
        tertiaryorange: {
          50: "#ffedd5",
          100: "#FF7400",
        },
        tertiarygrey: {
          50: "#6A6A6A",
          100: "#D8D8D8",
          150: "#6A6A6A",
          200: "#E7E7E7",
          250: "#5F5F5F",
          300: "#CCCCCC",
          350: "#757575",
          400: "#5F5F5F",
          450: "#8F8F8F",
          500: "#C4C4C4",
          550: "#EDEDED",
          575: "#DFDFDF",
          600: "#6A6A6A",
          625: "#F6F6F6",
          630: "#f8f8f8",
          640: "#A9A9A9",
          650: "#EEEEEE",
          660: "#CECECE",
          670: "#222222",
          680: "#2c2c2c",
        },
        tertiaryblue: { 50: "#256BD3", 60: "#E5EFFF", 100: "165FCC" },
        navyblue: {
          100: "165FCC",
          900: "#101A36",
        },
        tertiarygreen: {
          100: "#ecfccb",
          120: "#579A00",
          400: "#75BE17",
        },

        tertiarypurple: {
          100: "#f3e8ff",
          400: "#8B5BDC",
        },

        tertiaryblack: {
          50: "#191919",
        },
      },
    },
  },
  variants: {
    width: ["responsive", "hover", "focus"],
    height: ["responsive", "hover", "focus"],
  },
  plugins: [],
};
