import type { MetadataRoute } from "next";
import { absoluteUrl, indexingEnabled, withBasePath } from "@/data/site-url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // Allow crawling even on previews so robots can read the noindex directive.
    rules: [{ userAgent: "*", allow: "/", disallow: [withBasePath("/api/")] }],
    ...(indexingEnabled ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}
