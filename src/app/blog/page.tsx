import { Suspense } from "react";

import { BlogPostList } from "@/components/Blog/BlogPostList";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Breadcrumb } from "@/components/Breadcrumb";

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
      <Breadcrumb items={[{ label: "Location" }, { label: "Blog" }]} />
      <h1>Blog</h1>
      <h2>Articles</h2>

      <Suspense fallback={<LoadingSpinner />}>
        <BlogPostList tag={tag} />
      </Suspense>
    </div>
  );
}
