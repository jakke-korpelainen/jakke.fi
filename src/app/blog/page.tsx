import { Suspense } from "react";

import { BlogPostList } from "@/components/Blog/BlogPostList";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const metadata = {
  title: "Blog Articles - jakke.fi",
};

interface BlogParams {
  searchParams: {
    tag?: string;
  };
}

export default async function BlogIndex({ searchParams }: BlogParams) {
  const { tag } = searchParams ?? {};
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <header className="mt-10">
        <h1>Blog</h1>
        <h2>Articles</h2>
      </header>

      <Suspense fallback={<LoadingSpinner />}>
        <BlogPostList tag={tag} />
      </Suspense>
    </div>
  );
}
