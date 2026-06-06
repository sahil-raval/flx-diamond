import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
export const SANITY_DATASET = (import.meta.env.VITE_SANITY_DATASET as string) || "production";

export const isSanityConfigured = Boolean(
  SANITY_PROJECT_ID && SANITY_PROJECT_ID !== "placeholder" && SANITY_PROJECT_ID.length > 0
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: SANITY_PROJECT_ID!,
      dataset: SANITY_DATASET,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

const builder =
  isSanityConfigured && sanityClient
    ? createImageUrlBuilder(sanityClient)
    : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!builder) return { url: () => "" };
  return builder.image(source);
}

/**
 * Fetch via the server-side proxy (/api/sanity-query).
 * This avoids browser CORS restrictions entirely — the API server
 * calls Sanity server-to-server and returns the result.
 */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    const res = await fetch("/api/sanity-query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, params: params ?? {} }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result: T };
    return data.result ?? null;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
