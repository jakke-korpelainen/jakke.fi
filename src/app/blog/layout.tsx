import Image from "next/image";
import Link from "next/link";

import { ScrollToTop } from "@/components/ScrollToTop";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col space-y-10 bg-gradient-to-b from-[#121217] to-[#262a2b] p-10 text-white">
      <header className="container mx-auto">
        <a href="/blog" className="text-2xl text-white no-underline hover:text-white">
          <div className="flex gap-5">
            <Image className="object-contain" src="/ball.png" alt="Jakke.fi logo" width={64} height={64} />
            <div>
              <span>jakke.fi/blog</span>
              <p className="text-lg">Blogging mostly about my free-time projects.</p>
            </div>
          </div>
        </a>
      </header>
      <div className="flex grow flex-col justify-between">
        <div className="container mx-auto grow">{children}</div>
        <div className="container mx-auto flex items-center justify-between gap-10">
          <div className="select-none text-gray-400">&copy; jakke.fi</div>
          <ul className="inline-flex gap-5 [&>li]:text-base">
            <li>
              <Link href="/">Home</Link>
            </li>
            <ScrollToTop />
          </ul>
        </div>
      </div>
    </div>
  );
}
