import Image from "next/image";
import Link from "next/link";

import { ScrollToTop } from "@/components/ScrollToTop";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full grow flex-col space-y-10 bg-gradient-to-b from-[#121217] to-[#262a2b] p-5 text-white sm:p-10">
      <header className="container mx-auto">
        <a href="/blog" className="text-2xl text-white no-underline hover:text-white">
          <div className="flex gap-5">
            <Image sizes="" className="object-contain" src="/ball.png" alt="Jakke.fi logo" width={64} height={64} />
            <div>
              <span className="text-xl sm:text-xl">jakke.fi/blog</span>
              <p className="text-sm sm:text-lg">Blogging mostly about my free-time projects.</p>
            </div>
          </div>
        </a>
      </header>
      <div className="flex grow flex-col justify-between">
        <div className="container mx-auto grow">{children}</div>
        <div className="container mx-auto flex flex-col-reverse justify-between gap-10 sm:flex-row">
          <div className="select-none text-gray-400">&copy; jakke.fi</div>
          <ul className="flex flex-col gap-5 sm:inline-flex sm:flex-row [&>li>a]:no-underline [&>li]:text-base">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blog">Blog Articles</Link>
            </li>
            <ScrollToTop />
          </ul>
        </div>
      </div>
    </div>
  );
}
