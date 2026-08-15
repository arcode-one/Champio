import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://champio-corporate.ntcoder-1.chatgpt.site/sitemap.xml",
  };
}
