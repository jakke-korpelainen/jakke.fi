import "@/global.css";

import clsx from "clsx";
import Image from "next/image";

import { karla } from "@/fonts";

const Column = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={clsx("w-full lg:w-6/12", className)}>{children}</div>;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx("min-h-screen", karla.variable, karla.className)}>
        <main className="flex min-h-screen flex-col bg-[#121217] lg:flex-row lg:bg-transparent">
          <Column className="hidden lg:flex">
            <Image
              width={1600}
              height={1600}
              className="h-full w-full rounded-none object-cover"
              src="/face.jpg"
              alt="Image of Jakke Korpelainen"
            />
          </Column>
          <Column className="min-h-screen bg-gradient-to-b from-[#121217] to-[#262a2b] px-5 py-10 text-white sm:px-10 xl:py-20">
            {children}
          </Column>
        </main>
      </body>
    </html>
  );
}
