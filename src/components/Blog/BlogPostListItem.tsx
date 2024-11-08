import Link from "next/link";

import { BlogPost } from "@/lib/contentful/blogPost";
import { formatDateString } from "@/lib/date";

import { Tags } from "./Tags";

export async function BlogPostListItem({ item }: { item: BlogPost }) {
  return (
    <>
      <Link className="no-underline" href={`/blog/${item.slug}`}>
        <h3 className="before:hidden" key={item.sys.id}>
          {item.title}
        </h3>
      </Link>
      <p className="mb-2 text-lg">Published on {formatDateString(item.sys.firstPublishedAt)}</p>
      <Tags tags={item.tags} />
    </>
  );
}
