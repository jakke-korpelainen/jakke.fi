import "@/global.css";

import clsx from "clsx";
import { Suspense } from "react";

import { karla } from "@/fonts";

import DemoScene from "./components/DemoScene";

const Column = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={clsx("w-full lg:w-6/12", className)}>{children}</div>;
};

const Loading = () => (
  <div className="flex h-full w-full items-center justify-center bg-before/[0.05] font-black">
    <p className="text-white">Loading</p>
  </div>
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx("min-h-screen", karla.variable, karla.className)}>
        <main className="flex min-h-screen flex-col bg-[#121217] lg:flex-row lg:bg-transparent">
          <Column className="relative hidden bg-black lg:flex">
            <Suspense fallback={<Loading />}>
              <DemoScene />
            </Suspense>
          </Column>
          <Column className="min-h-screen bg-gradient-to-b from-[#121217] to-[#262a2b] px-5 py-10 text-white sm:px-10 xl:py-20">
            {children}
          </Column>
        </main>
      </body>
    </html>
  );
}
