/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        site: "1920px", // Site stops growing at 1920px
      },
      spacing: {
        15: "3.75rem", // 60px for large screens
        18: "4.5rem", // 72px
      },
      zIndex: {
        sticky: "1020",
        dropdown: "1030",
      },
    },
  },
  plugins: [],
};
