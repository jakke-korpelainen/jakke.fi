import clsx from "clsx";
import Link from "next/link";

import {
  queryAllBlogPosts,
  queryAllBlogPostsByTag,
} from "@/lib/contentful/blogPost";
import { BlogPostTagQueryParams } from "@/lib/contentful/blogPost/queries";

import { BlogPostListItem } from "./BlogPostListItem";

const DEFAULT_PAGE_SIZE = 15;

const classes = {
  link: "rounded bg-gray-800 px-4 py-2 text-white",
  button: {
    disabled: "pointer-events-none select-none opacity-50",
  },
};

async function getFilteredBlogPosts({
  tag,
  skip,
  limit,
}: Partial<BlogPostTagQueryParams>) {
  if (tag) {
    return await queryAllBlogPostsByTag({ tag, skip, limit });
  }
  return await queryAllBlogPosts({ skip, limit });
}

export async function BlogPostList({
  tag,
  skip = 0,
  limit = DEFAULT_PAGE_SIZE,
}: Partial<BlogPostTagQueryParams>) {
  const { total, items } = (await getFilteredBlogPosts({
    tag,
    skip,
    limit,
  })) ?? { total: 0, items: [] };

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="space-y-10">
      {tag && (
        <>
          <p className="mb-10">
            Filtering with tag:{" "}
            <span className="ml-2 font-mono text-base uppercase">{tag}</span>{" "}
            <Link className="text-base no-underline" href="/blog">
              ❌
            </Link>
          </p>
        </>
      )}
      {total === 0 && <p>Sorry, no articles found.</p>}
      {items.map((item) => (
        <BlogPostListItem key={item.sys.id} item={item} />
      ))}
      {total > limit && (
        <div className="flex items-center justify-between">
          <Link
            href={{
              pathname: "/blog",
              query: { tag, skip: Math.max(0, skip - limit), limit },
            }}
            className={clsx(classes.link, {
              [classes.button.disabled]: isPrevDisabled,
            })}
          >
            Previous
          </Link>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Link
            href={{
              pathname: "/blog",
              query: { tag, skip: skip + limit, limit },
            }}
            className={clsx(classes.link, {
              [classes.button.disabled]: isNextDisabled,
            })}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
