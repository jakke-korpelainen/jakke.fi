import Link from "next/link";

import { BlogPost } from "@/lib/contentful/blogPost";
import { formatDateString } from "@/lib/date";

import { Tags } from "./Tags";

export async function BlogPostListItem({ item }: { item: BlogPost }) {
  return (
    <div className="space-y-5">
      <div>
        <Link className="no-underline" href={`/blog/${item.slug}`}>
          <h3 className="mb-0 inline-block before:hidden" key={item.sys.id}>
            <span className="mr-5 pb-1 font-mono text-base font-medium uppercase">
              {item.type}
            </span>
            {item.title}
          </h3>
        </Link>
        <p className="mb-2 text-lg">
          Published on {formatDateString(item.sys.firstPublishedAt)}
        </p>
        <Tags tags={item.tags} />
      </div>
    </div>
  );
}
