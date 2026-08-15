import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/production", "/products", "/partners", "/quality", "/contacts"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/partners" ? 0.9 : 0.8,
  }));
}
