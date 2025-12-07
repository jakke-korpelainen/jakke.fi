import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Column } from "@/components/Column";
import DemoScene from "@/components/DemoScene";
import { WaveText } from "@/components/WaveText";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { TwoColumn } from "@/components/TwoColumn";

export const metadata: Metadata = {
  title: "Jakke Korpelainen",
  description:
    "My name is Jakke Korpelainen, I'm a full-stack developer based in Helsinki, Finland.",
  alternates: { canonical: "https://jakke.fi" },
};

export const dynamic = "force-static";

export default function Page() {
  return (
    <>
      <Column className="relative hidden bg-black lg:flex">
        <Suspense fallback={<LoadingSpinner />}>
          <DemoScene />
        </Suspense>
      </Column>
      <Column className="min-h-screen bg-gradient-to-b from-[#121217] to-[#262a2b] py-5 text-white sm:py-10">
        <div className="container grow">
          <h1 title="Kinda funky, innit?">
            <WaveText words={["Hello!"]} />
          </h1>

          <div className="flex flex-col gap-5">
            <TwoColumn heading="who">
              <Image
                width={240}
                height={240}
                className="lg:64 lg:64 m-2 sm:m-5 h-20 w-20 rounded-full object-cover sm:h-32 sm:w-32 md:h-48 md:w-48 lg:hidden"
                src="/face_2024.jpg"
                alt="Image of Jakke Korpelainen"
              />
              <p>
                My name is Jakke Korpelainen, I'm a full-stack developer based
                in Helsinki, Finland.
              </p>
            </TwoColumn>
            <TwoColumn heading="what">
              <ul className="inline-flex flex-col gap-5 sm:flex-row">
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link target="_blank" href="/curriculum-vitae.pdf">
                    Curriculum Vitae
                  </Link>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://linkedin.com/in/jakke-korpelainen"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://github.com/jakke-korpelainen"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://bsky.app/profile/jakke.fi">
                    Bluesky
                  </a>
                </li>
              </ul>
            </TwoColumn>
            <TwoColumn heading="where">
              <a href="https://op.fi" target="_blank">
                <Image
                  priority
                  className="object-fill inline-flex"
                  width={32}
                  height={32}
                  alt="Osuuspankki"
                  src="/op.svg"
                />
              </a>
            </TwoColumn>
          </div>
        </div>
      </Column>
    </>
  );
}
