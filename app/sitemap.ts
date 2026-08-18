import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/data/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/production", "/products", "/partners", "/quality", "/contacts"];
  const lastModified = new Date("2026-08-18T00:00:00+05:00");

  return routes.map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/partners" ? 0.9 : 0.8,
  }));
}
