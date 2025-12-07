import clsx from "clsx";
import Link from "next/link";

import { queryAllBlogPosts } from "@/lib/contentful/blogPost";

import { BlogPostListItem } from "./BlogPostListItem";

const DEFAULT_PAGE_SIZE = 15;

const classes = {
  button: {
    disabled: "pointer-events-none select-none opacity-50",
  },
};

export async function BlogPostList({
  tag,
  skip = 0,
  limit = DEFAULT_PAGE_SIZE,
}: {
  tag?: string;
  skip?: number;
  limit?: number;
}) {
  const { total, items } = (await queryAllBlogPosts({ skip, limit })) ?? { total: 0, items: [] };
  const filteredItems = tag ? items.filter((item) => item.tags.includes(tag)) : items;
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="space-y-10">
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

      {total > limit && (
        <div className="flex items-center justify-between">
          <Link
            href={{
              pathname: "/blog",
              query: { tag, skip: Math.max(0, skip - limit), limit },
            }}
            className={clsx(`rounded bg-gray-800 px-4 py-2 text-white`, { [classes.button.disabled]: isPrevDisabled })}
          >
            Previous
          </Link>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Link
            href={{ pathname: "/blog", query: { tag, skip: skip + limit, limit } }}
            className={clsx(`rounded bg-gray-800 px-4 py-2 text-white`, { [classes.button.disabled]: isNextDisabled })}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
