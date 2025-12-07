import { DEFAULT_LOCALE } from "@/lib/locale";

import { ContentfulQueryParams } from "../types";
import { BLOG_PAGE_FIELDS } from "./fields";

export const QUERY_ALL_BLOG_POST = ({
  skip = 0,
  limit = 100,
  locale = DEFAULT_LOCALE,
}: Partial<ContentfulQueryParams>) => `
  query blogPostCollectionQuery {
    blogPostCollection(locale: "${locale}", skip: ${skip}, limit: ${limit}, order: [sys_firstPublishedAt_DESC]) {
      total
      items {
        ${BLOG_PAGE_FIELDS}
      }
    }
  }
`;

export interface BlogPostTagQueryParams extends Partial<ContentfulQueryParams> {
  tag: string;
}

export const QUERY_ALL_BY_BLOG_POST_TAG = ({
  tag,
  skip = 0,
  limit = 100,
  locale = DEFAULT_LOCALE,
}: BlogPostTagQueryParams) => `
  query blogPostCollectionQuery {
    blogPostCollection(locale: "${locale}", where: { tags_contains_some: "${tag}" }, skip: ${skip}, limit: ${limit}, order: [sys_firstPublishedAt_DESC] ) {
      total
      items {
        ${BLOG_PAGE_FIELDS}
      }
    }
  }
`;

export interface BlogPostSlugQueryParams extends Partial<ContentfulQueryParams> {
  slug: string;
}

export const QUERY_BLOG_POST_BY_SLUG = ({
  slug,
  skip = 0,
  limit = 100,
  locale = DEFAULT_LOCALE,
}: BlogPostSlugQueryParams) => `
  query blogPostBySlugQuery {
    blogPostCollection(locale: "${locale}", where: { slug: "${slug}" }, skip: ${skip}, limit: ${limit}) {
      total
      items {
        ${BLOG_PAGE_FIELDS}
      }
    }
  }
`;
