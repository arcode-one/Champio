import type { MetadataRoute } from "next";
import { withBasePath } from "@/data/site-url";
import { defaultDescription } from "@/data/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Champio — свежие шампиньоны оптом",
    short_name: "Champio",
    description: defaultDescription,
    start_url: withBasePath("/"),
    scope: withBasePath("/"),
    display: "standalone",
    background_color: "#f4f0e7",
    theme_color: "#172018",
    lang: "ru-RU",
    categories: ["business", "food"],
    icons: [
      {
        src: withBasePath("/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: withBasePath("/icon-512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
