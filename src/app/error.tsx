"use client";

import Link from "next/link";
import Image from "next/image";

export default function Error() {
  return (
    <div className="flex w-full grow flex-col space-y-10 bg-gradient-to-b from-[#121217] to-[#262a2b] p-5 text-white sm:p-10">
      <header className="container mx-auto">
        <a href="/" className="text-2xl text-white no-underline hover:text-white">
          <div className="flex gap-5">
            <Image sizes="" className="object-contain" src="/ball.png" alt="Jakke.fi logo" width={64} height={64} />
            <div>
              <span className="text-xl sm:text-xl">jakke.fi</span>
              <p className="text-sm sm:text-lg">Error</p>
            </div>
          </div>
        </a>
      </header>
      <div className="container mx-auto space-y-10">
        <h1>
          Internal Server Error <span className="font-mono">500</span>
        </h1>

        <p>An unexpected error occurred during your request.</p>

        <ul className="flex flex-col gap-5 sm:inline-flex sm:flex-row [&>li>a]:no-underline [&>li]:text-xl">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog Articles</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
