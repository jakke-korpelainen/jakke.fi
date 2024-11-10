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
    <div className="space-y-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <h1>Blog</h1>
      <h2>Articles</h2>

      <Suspense fallback={<LoadingSpinner />}>
        <BlogPostList tag={tag} />
      </Suspense>
    </div>
  );
}
