import { collectErrors } from "./errors";
import type { ContentfulResult } from "./types";

/**
 * Revalidate time in ms for contentful data
 * During development I suggest to keep it at 0
 */
const revalidate = 60; // 3600; // 1 hour

export async function fetchContentfulGraphQL<TQuery>(
  query: string,
): Promise<ContentfulResult<TQuery>> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate, tags: ["contentful"] },
    },
  )
    .then(async (response) => {
      return await response.json();
    })
    .then<ContentfulResult<TQuery>>((data) => data)
    .then(collectErrors);
}
