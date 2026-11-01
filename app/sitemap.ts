import type { MetadataRoute } from "next";
import { getNews } from "@/lib/news";
import { site } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...[
      "",
      "/about",
      "/game",
      "/character",
      "/news",
      "/contact",
      "/privacy",
    ].map((path) => ({ url: `${site.url}${path}` })),
    ...getNews().map((post) => ({
      url: `${site.url}/news/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}
