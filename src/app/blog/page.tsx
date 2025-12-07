import { Suspense } from "react";
import { BlogPostList } from "@/components/Blog/BlogPostList";
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
      <h1>Blog</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <BlogPostList tag={tag} />
      </Suspense>
    </div>
  );
}
