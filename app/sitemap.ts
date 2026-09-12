import type { MetadataRoute } from "next";
import { absoluteUrl, canonicalUrl, indexingEnabled } from "@/data/site-url";
import { indexablePaths, seoPages } from "@/data/seo-pages";
import { products } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexingEnabled) return [];
  // No fabricated lastmod: add per-page dates only when editorial history is tracked.
  return indexablePaths.map((path) => ({
    url: canonicalUrl(path),
    images: [absoluteUrl(seoPages[path].image), ...(path === "/products" ? products.map((product) => absoluteUrl(product.image)) : [])],
  }));
}
