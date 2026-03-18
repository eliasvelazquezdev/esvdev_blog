/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "brand-offwhite": "#e5e5e5",
        "brand-navy": "#14213d",
        "brand-navy-dark": "#0a1120",
        "brand-orange": "#fca311",
        "brand-gray": "#a3a3a3",
        "brand-charcoal": "#e5e5e5",
        "brand-accent": "#e5e5e5",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
