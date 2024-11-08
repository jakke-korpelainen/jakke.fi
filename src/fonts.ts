import { Fira_Code, Karla } from "next/font/google";

export const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  variable: "--font-sans",
});

export const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  variable: "--font-mono",
});
