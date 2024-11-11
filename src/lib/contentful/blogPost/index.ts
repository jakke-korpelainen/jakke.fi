import { DEFAULT_LOCALE } from "@/lib/locale";

import { fetchContentfulGraphQL } from "..";
import type { ContentfulCollection, ContentfulQueryParams, ContentfulSys } from "../types";
import { QUERY_ALL_BLOG_POST, QUERY_BLOG_POST_BY_SLUG } from "./queries";

export interface BlogPost extends ContentfulSys {
  /**
   * Title
   * @example "My Blog Post"
   */
  title: string;
  /**
   * Type
   * @example "Report"
   */
  type: "Report" | "Tutorial" | "Article";
  /**
   * Slug
   * @example "my-blog-post"
   */
  slug: string;
  /**
   * Markdown
   * @example "# My Blog Post\n\nThis is my blog post"
   */
  content: string;

  /**
   * Tags
   * @example ["programming", "typescript"]
   */
  tags: string[];
}

export interface BlogPostCollection {
  blogPostCollection: ContentfulCollection<BlogPost>;
}

export async function queryAllBlogPosts(options: Partial<ContentfulQueryParams> = { locale: DEFAULT_LOCALE }) {
  const { data: entries } = await fetchContentfulGraphQL<BlogPostCollection>(QUERY_ALL_BLOG_POST({ ...options }));

  return entries?.blogPostCollection;
}

export async function queryBlogPostBySlug(slug: string, options: Partial<ContentfulQueryParams>) {
  const { data: entries } = await fetchContentfulGraphQL<BlogPostCollection>(
    QUERY_BLOG_POST_BY_SLUG({ slug, ...options }),
  );

  return entries?.blogPostCollection?.items?.[0];
}
