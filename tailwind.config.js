/** @type {import('tailwindcss').Config} */

import { fontFamily } from "tailwindcss/defaultTheme";

// Adjust to your liking, but keep in mind that changes may break the layout

export const content = ["./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  screens: {
    sm: "576px",
    md: "960px",
    lg: "1440px",
    xl: "1920px",
    max: "2400px",
  },
  fontSize: {
    xxs: "0.625rem",
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
  },
  extend: {
    colors: {
      white: "rgb(232, 230, 227)",
      before: "rgba(114, 255, 255, 0.55)",
      link: "rgb(114, 255, 255)",
    },
    fontFamily: {
      // Be sure to update these if you change your fonts.
      // TODO: Could these be imported from src/lib/fonts.ts? The exported font objects include a variable property.
      sans: [`var(--font-sans)`, ...fontFamily.sans],
      mono: [`var(--font-mono)`, ...fontFamily.sans],
      heading: [`var(--font-heading)`, ...fontFamily.sans],
    },
  },
};
