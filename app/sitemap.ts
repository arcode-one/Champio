import type { MetadataRoute } from "next";

const baseUrl = "https://champio-corporate.ntcoder-1.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/production", "/products", "/partners", "/quality", "/contacts"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/partners" ? 0.9 : 0.8,
  }));
}
