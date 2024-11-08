import "@/global.css";

import clsx from "clsx";

import { karla, firaCode } from "@/fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx("min-h-screen", karla.variable, karla.className, firaCode.variable)}>
        <main className="flex min-h-screen flex-col bg-[#121217] lg:flex-row lg:bg-transparent">{children}</main>
      </body>
    </html>
  );
}
