/** @type {import('tailwindcss').Config} */

import { fontFamily } from "tailwindcss/defaultTheme";

// Adjust to your liking, but keep in mind that changes may break the layout

export const content = ["./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  screens: {
    xs: "0px",
    sm: "600px",
    md: "960px",
    lg: "1280px",
    xl: "1600px",
  },
  container: {
    center: true,
    padding: "2rem",
    screens: {
      sm: "600px",
      md: "960px",
      lg: "1280px",
      xl: "1600px",
    },
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
    transitionProperty: {
      "text-shadow": "text-shadow 0.5s ease",
    },
    keyframes: {
      wave: {
        "0%": {
          textShadow: "0 0 0.5rem rgba(255,255,255, 0.05), 0 0 2rem rgba(255,255,255, 0.05)",
          transform: "translate3d(0, 0, 0)",
        },

        "50%": {
          textShadow: "0 0 0.5rem rgba(255,255,255, 0.55), 0 0 2rem rgba(0,150,0, 0.25)",
          transform: "translate3d(0, -0.75rem, 0)",
        },

        "100%": {
          textShadow: "0 0 0.5rem rgba(255,255,255, 0.05), 0 0 2rem rgba(255,255,255, 0.05)",
          transform: "translate3d(0, 0, 0)",
        },
      },
    },
    animation: {
      wave: "wave 2s ease-in-out infinite",
    },
    colors: {
      white: "rgb(232, 230, 227)",
      before: "rgba(114, 255, 255, 0.55)",
      link: { normal: "rgb(114, 255, 255)", hover: "orange" },
    },
    fontFamily: {
      // Be sure to update these if you change your fonts.
      // TODO: Could these be imported from src/lib/fonts.ts? The exported font objects include a variable property.
      sans: [`var(--font-sans)`, ...fontFamily.sans],
      mono: [`var(--font-mono)`, ...fontFamily.mono],
      heading: [`var(--font-heading)`, ...fontFamily.sans],
    },
  },
};
