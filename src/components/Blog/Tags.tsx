import Link from "next/link";

interface TagOptions {
  links?: boolean;
}

const Tag = ({ tag }: { tag: string }) => <span key={crypto.randomUUID()}>{tag}</span>;

export function Tags({ tags, options = { links: true } }: { tags: string[]; options?: TagOptions }) {
  return (
    <div className="inline-flex flex-wrap items-center gap-2 font-mono text-sm uppercase sm:gap-5 md:text-base">
      <span className="font-medium">Tags:</span>
      {tags.map((tag) =>
        options.links ? (
          <Link className="text-link-darker no-underline" key={`linked-${tag}`} href={`/blog?tag=${tag}`}>
            <Tag tag={tag} />
          </Link>
        ) : (
          <Tag key={tag} tag={tag} />
        ),
      )}
    </div>
  );
}
