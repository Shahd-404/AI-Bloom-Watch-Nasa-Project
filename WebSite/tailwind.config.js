/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      custom: ["Poppins", "sans-serif"],
    },
  },
},

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // خط افتراضي
      },
      colors: {
        brand: {
          DEFAULT: "#2ECC71", // أخضر أساسي (تقدرِ تغيريه بعدين)
          dark: "#27AE60",
          light: "#A3E4D7",
        },
      },
    },
  },
  plugins: [],
};
