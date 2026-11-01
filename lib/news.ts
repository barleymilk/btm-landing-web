import "server-only";
import { newsPosts } from "@/content/news";

export function getNews() {
  return newsPosts
    .filter((post) => post.published)
    .toSorted((a, b) => b.date.localeCompare(a.date));
}

export function getNewsPost(slug: string) {
  return getNews().find((post) => post.slug === slug);
}
