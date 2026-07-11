import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const offwhiteScale = {
  50: "#ffffff",
  100: "#fcfcfc",
  200: "#f7f7f7",
  300: "#f1f1f1",
  400: "#ebebeb",
  500: "#e5e5e5",
  600: "#c9c9c9",
  700: "#a3a3a3",
  800: "#7a7a7a",
  900: "#525252",
  DEFAULT: "#e5e5e5",
};

const navyScale = {
  50: "#eef3fb",
  100: "#d5e0f2",
  200: "#afc3e4",
  300: "#829dd1",
  400: "#5b76bb",
  500: "#365398",
  600: "#233a73",
  700: "#14213d",
  800: "#0f1a33",
  900: "#0a1120",
  DEFAULT: "#14213d",
};

const navyMidScale = {
  50: "#edf2fb",
  100: "#d3ddf1",
  200: "#acbee1",
  300: "#8097cb",
  400: "#5970b2",
  500: "#3a4f8d",
  600: "#243569",
  700: "#172246",
  800: "#0f1a33",
  900: "#0a1120",
  DEFAULT: "#0f1a33",
};

const navyDarkScale = {
  50: "#eaf0fb",
  100: "#cad8f0",
  200: "#a2b8e0",
  300: "#7591cb",
  400: "#4f68b0",
  500: "#334b8a",
  600: "#223262",
  700: "#14203f",
  800: "#0f182f",
  900: "#0a1120",
  DEFAULT: "#0a1120",
};

const orangeScale = {
  50: "#fff7e8",
  100: "#feebc2",
  200: "#fed68a",
  300: "#fdbf52",
  400: "#fcae2a",
  500: "#fca311",
  600: "#e28606",
  700: "#bb6508",
  800: "#984f0e",
  900: "#7c4210",
  DEFAULT: "#fca311",
};

const grayScale = {
  50: "#f7f7f7",
  100: "#ededed",
  200: "#dcdcdc",
  300: "#c4c4c4",
  400: "#a3a3a3",
  500: "#8a8a8a",
  600: "#707070",
  700: "#575757",
  800: "#3f3f3f",
  900: "#2b2b2b",
  DEFAULT: "#a3a3a3",
};

const sageScale = {
  50: "#f3f7f4",
  100: "#e3ece5",
  200: "#c7d8ca",
  300: "#a8c0ad",
  400: "#8eaa95",
  500: "#73927c",
  600: "#5d7664",
  700: "#495c4e",
  800: "#39473d",
  900: "#2c3730",
  DEFAULT: "#73927c",
};

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "brand-offwhite": offwhiteScale,
        "brand-navy": navyScale,
        "brand-navy-mid": navyMidScale,
        "brand-navy-dark": navyDarkScale,
        "brand-orange": orangeScale,
        "brand-sage": sageScale,
        "brand-gray": grayScale,
      },
    },
  },
  plugins: [typography],
};
