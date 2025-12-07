import Link from "next/link";

interface TagOptions {
  links?: boolean;
}

const Tag = ({ tag }: { tag: string }) => <span key={crypto.randomUUID()}>{tag}</span>;

export function Tags({ tags, options = { links: true } }: { tags: string[]; options?: TagOptions }) {
  return (
    <div className="inline-flex flex-wrap items-center gap-5 font-mono uppercase">
      <span className="text-base font-medium">Tags:</span>
      {tags.map((tag) =>
        options.links ? (
          <Link key={`linked-${tag}`} href={`/blog?tag=${tag}`}>
            <Tag tag={tag} />
          </Link>
        ) : (
          <Tag key={tag} tag={tag} />
        ),
      )}
    </div>
  );
}
