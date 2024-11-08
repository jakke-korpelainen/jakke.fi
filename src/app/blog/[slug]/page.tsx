import { Tags } from "@/components/Blog/Tags";
import { Markdown } from "@/components/Markdown";
import { queryBlogPostBySlug } from "@/lib/contentful/blogPost";
import { formatDateString } from "@/lib/date";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = params ?? {};
  const { title } = (await queryBlogPostBySlug(slug)) ?? {};
  return {
    title: `${title} - jakke.fi`,
  };
}

export default async function BlogPage({ params }: Readonly<BlogPageProps>) {
  const { slug } = params ?? {};
  const blogPost = await queryBlogPostBySlug(slug);

  if (!blogPost) {
    return notFound();
  }

  return (
    <>
      <Link className="text-2xl" href="/blog">
        Back to list of articles
      </Link>
      <article className="mt-10 flex flex-col space-y-10">
        <header className="space-y-10">
          <h1>{blogPost.title}</h1>
          <div className="flex flex-col font-mono [&>p]:uppercase">
            <p>
              <span className="font-medium">@Published:</span> {formatDateString(blogPost.sys.firstPublishedAt)}
            </p>
            {/* if has been updated */}
            {blogPost.sys.publishedAt !== blogPost.sys.firstPublishedAt && (
              <p>
                <span className="font-medium">@Last Updated:</span> {formatDateString(blogPost.sys.publishedAt)}
              </p>
            )}
            <p>
              <span className="font-medium">@Author:</span> Jakke Korpelainen
            </p>
          </div>
          <div>
            <Tags tags={blogPost.tags} />
          </div>
        </header>
        <main>
          <section>
            <Markdown>{blogPost.content}</Markdown>
          </section>
        </main>
        <footer></footer>
      </article>
    </>
  );
}
