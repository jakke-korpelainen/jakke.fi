import { fetchContentfulGraphQL } from "..";
import type {
  ContentfulCollection,
  ContentfulQueryParams,
  ContentfulSys,
} from "../types";
import {
  type BlogPostSlugQueryParams,
  type BlogPostTagQueryParams,
  QUERY_ALL_BLOG_POST,
  QUERY_ALL_BY_BLOG_POST_TAG,
  QUERY_BLOG_POST_BY_SLUG,
} from "./queries";

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

export async function queryAllBlogPosts(
  options: Partial<ContentfulQueryParams>,
) {
  const query = QUERY_ALL_BLOG_POST({ ...options });
  const { data: entries } =
    await fetchContentfulGraphQL<BlogPostCollection>(query);
  return entries?.blogPostCollection;
}

export async function queryAllBlogPostsByTag(options: BlogPostTagQueryParams) {
  const query = QUERY_ALL_BY_BLOG_POST_TAG({ ...options });
  const { data: entries } =
    await fetchContentfulGraphQL<BlogPostCollection>(query);
  return entries?.blogPostCollection;
}

export async function queryBlogPostBySlug(options: BlogPostSlugQueryParams) {
  const query = QUERY_BLOG_POST_BY_SLUG({ ...options });
  const { data: entries } =
    await fetchContentfulGraphQL<BlogPostCollection>(query);
  return entries?.blogPostCollection?.items?.[0];
}
