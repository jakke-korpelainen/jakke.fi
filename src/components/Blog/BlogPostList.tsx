import Link from "next/link";

import { queryAllBlogPosts } from "@/lib/contentful/blogPost";

import { BlogPostListItem } from "./BlogPostListItem";

export async function BlogPostList({ tag }: { tag?: string }) {
  const items = await queryAllBlogPosts();
  const filteredItems = tag ? items.filter((item) => item.tags.includes(tag)) : items;

  return (
    <div>
      {tag && (
        <>
          <p className="mb-10">
            Filtering with tag: <span className="ml-2 font-mono text-base uppercase">{tag}</span>{" "}
            <Link className="text-base no-underline" href="/blog">
              ❌
            </Link>
          </p>
        </>
      )}
      {filteredItems.length === 0 && <p>Sorry, no articles found.</p>}
      {filteredItems.map((item) => (
        <BlogPostListItem key={item.sys.id} item={item} />
      ))}
    </div>
  );
}
