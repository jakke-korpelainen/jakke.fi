import { DEFAULT_LOCALE } from "@/lib/locale";

import { fetchContentfulGraphQL } from "..";
import { ContentfulCollection, ContentfulSys } from "../types";
import { QUERY_ALL_BLOG_POST, QUERY_BLOG_POST_BY_SLUG } from "./queries";

export interface BlogPost extends ContentfulSys {
  /**
   * Title
   * @example "My Blog Post"
   */
  title: string;
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

export async function queryAllBlogPosts(locale: string = DEFAULT_LOCALE) {
  const { data: entries } = await fetchContentfulGraphQL<BlogPostCollection>(QUERY_ALL_BLOG_POST(locale));

  return entries?.blogPostCollection?.items;
}

export async function queryBlogPostBySlug(slug: string, locale: string = DEFAULT_LOCALE) {
  const { data: entries } = await fetchContentfulGraphQL<BlogPostCollection>(QUERY_BLOG_POST_BY_SLUG(slug, locale));

  return entries?.blogPostCollection?.items?.[0];
}
