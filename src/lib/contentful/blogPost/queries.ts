import { DEFAULT_LOCALE } from "@/lib/locale";

import { BLOG_PAGE_FIELDS } from "./fields";

export const QUERY_ALL_BLOG_POST = (locale: string = DEFAULT_LOCALE) => `
    query blogPostCollectionQuery {
        blogPostCollection(locale: "${locale}") {
            items {
                ${BLOG_PAGE_FIELDS}
            }
        }
    }
`;

export const QUERY_BLOG_POST_BY_SLUG = (slug: string, locale: string = DEFAULT_LOCALE) => `
    query blogPostBySlugQuery {
        blogPostCollection(locale: "${locale}", where: { slug: "${slug}" }) {
            items {
                ${BLOG_PAGE_FIELDS}
            }
        }
    }
`;
