import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
export const SANITY_DATASET = (import.meta.env.VITE_SANITY_DATASET as string) || "production";
const SANITY_TOKEN = import.meta.env.VITE_SANITY_API_TOKEN as string | undefined;

export const isSanityConfigured = Boolean(
  SANITY_PROJECT_ID && SANITY_PROJECT_ID !== "placeholder" && SANITY_PROJECT_ID.length > 0
);

// Always use the CDN for browser reads — cdn.sanity.io allows all CORS origins.
// The token is kept for Sanity Studio mutations only; it is NOT needed for
// read-only public content in the browser.
export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: SANITY_PROJECT_ID!,
      dataset: SANITY_DATASET,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

const builder = isSanityConfigured && sanityClient
  ? imageUrlBuilder(sanityClient)
  : null;

export function urlFor(source: SanityImageSource) {
  if (!builder || !source) return { url: () => "" };
  return builder.image(source);
}

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params ?? {});
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
