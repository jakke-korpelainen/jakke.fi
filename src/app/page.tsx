import clsx from "clsx";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import { Column } from "./components/Column";
import DemoScene from "./components/DemoScene";
import { WaveText } from "./components/WaveText";

interface TwoColumnProps {
  row?: boolean;
  heading: string;
  className?: string;
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Jakke Korpelainen",
  description: "My name is Jakke Korpelainen, I'm a full-stack developer based in Helsinki, Finland.",
  alternates: { canonical: "https://jakke.fi" },
};

const Loading = () => (
  <div className="flex h-full w-full items-center justify-center bg-before/[0.05] font-black">
    <p className="text-white">Loading</p>
  </div>
);

const TwoColumn = ({ heading, children, className, row = true }: TwoColumnProps) => (
  <div
    className={clsx("flex border-b-2 border-before/[0.1] pb-5 last-of-type:border-0 last-of-type:pb-0 xl:pb-10", {
      ["flex-col xl:flex-row"]: row,
      ["flex-col"]: !row,
    })}
  >
    <h2 className={clsx({ ["w-full xl:w-80"]: row, ["w-full"]: !row })}>{heading}</h2>
    <div className={clsx("w-full", className)}>{children}</div>
  </div>
);

export const dynamic = "force-static";

export default function Page() {
  return (
    <>
      <Column className="relative hidden bg-black lg:flex">
        <Suspense fallback={<Loading />}>
          <DemoScene />
        </Suspense>
      </Column>
      <Column className="min-h-screen bg-gradient-to-b from-[#121217] to-[#262a2b] px-5 py-10 text-white sm:px-10 xl:py-20">
        <div className="grow">
          <h1 title="Kinda funky, innit?">
            <WaveText words={["Hello!"]} />
          </h1>

          <div className="flex flex-col gap-5">
            <TwoColumn className="flex items-center gap-4 sm:gap-10 lg:items-start lg:gap-0" heading="who">
              <Image
                width={240}
                height={240}
                className="lg:64 lg:64 m-0 m-5 h-20 w-20 rounded-full object-cover sm:h-32 sm:w-32 md:h-48 md:w-48 lg:hidden"
                src="/face_2024.jpg"
                alt="Image of Jakke Korpelainen"
              />
              <p>
                My name is Jakke Korpelainen, I'm a full-stack developer (with frontend focus) based in HELSINKI,
                FINLAND.
              </p>
            </TwoColumn>
            <TwoColumn heading="what">
              <p>
                Not sure what you're looking for in here, but if you're interested; You can find my full professional
                working history in <a href="https://linkedin.com/in/jakke-korpelainen">LinkedIn</a>, and some of my
                public/spare-time projects in <a href="https://github.com/jakke-korpelainen">GitHub</a>.
              </p>
            </TwoColumn>
            <TwoColumn row={false} heading="where">
              <Image
                priority
                className="object-fill"
                width={1200}
                height={400}
                alt="Logo of Loihde Factor"
                src="/employer.jpg"
              />
            </TwoColumn>
          </div>
        </div>
      </Column>
    </>
  );
}
