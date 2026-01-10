import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogPostList } from "@/components/Blog/BlogPostList";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const metadata: Metadata = {
  title: "Blog Articles - jakke.fi",
};

interface BlogParams {
  searchParams: {
    tag?: string;
    skip?: string;
    limit?: string;
  };
}

export default async function BlogIndex({ searchParams }: BlogParams) {
  const { tag, skip, limit } = searchParams ?? {};

  const skipNumber = skip ? parseInt(skip, 10) : undefined;
  const limitNumber = limit ? parseInt(limit, 10) : undefined;

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <header className="mt-10">
        <h1>Blog</h1>
        <h2>Articles</h2>
      </header>

      <Suspense fallback={<LoadingSpinner />}>
        <BlogPostList tag={tag} skip={skipNumber} limit={limitNumber} />
      </Suspense>
    </div>
  );
}
