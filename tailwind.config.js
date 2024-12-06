/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-slow": "bounce 3s 1",
        "slide-in-left": "slideRight 1000ms 1",
        "slide-in-right": "slideLeft 1000ms 1",
      },
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(-20px)" },
          "20%": { transform: "translateX(20px)" },
          "40%": { transform: "translateX(-20px)" },
          "60%": { transform: "translateX(20px)" },
          "80%": { transform: "translateX(-20px)" },
          "100%": { transform: "translateX(0px)" },
        },
        slideLeft: {
          "0%": { transform: "translateX(20px)" },
          "20%": { transform: "translateX(-20px)" },
          "40%": { transform: "translateX(20px)" },
          "60%": { transform: "translateX(-20px)" },
          "80%": { transform: "translateX(20px)" },
          "100%": { transform: "translateX(0px)" },
        },
      },
    },
  },
  plugins: [],
};
