import { DEFAULT_LOCALE } from "@/lib/locale";

import { ContentfulQueryParams } from "../types";
import { BLOG_PAGE_FIELDS } from "./fields";

export const QUERY_ALL_BLOG_POST = ({
  skip = 0,
  limit = 100,
  locale = DEFAULT_LOCALE,
}: Partial<ContentfulQueryParams>) => `
  query blogPostCollectionQuery {
    blogPostCollection(locale: "${locale}", skip: ${skip}, limit: ${limit}) {
      total
      items {
        ${BLOG_PAGE_FIELDS}
      }
    }
  }
`;

interface BlogPostQueryParams extends Partial<ContentfulQueryParams> {
  slug: string;
}

export const QUERY_BLOG_POST_BY_SLUG = ({
  slug,
  skip = 0,
  limit = 100,
  locale = DEFAULT_LOCALE,
}: BlogPostQueryParams) => `
  query blogPostBySlugQuery {
    blogPostCollection(locale: "${locale}", where: { slug: "${slug}" }, skip: ${skip}, limit: ${limit}) {
      total
      items {
        ${BLOG_PAGE_FIELDS}
      }
    }
  }
`;
