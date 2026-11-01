"use client";

import Link from "next/link";
import { useState } from "react";
import type { NewsPost } from "@/content/news";
import { formatNewsDate, newsCategories } from "@/lib/news-format";

export default function NewsList({ posts }: { posts: NewsPost[] }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase("ko-KR");
  const filtered = posts.filter(
    (post) =>
      (category === "all" || post.category === category) &&
      `${post.title} ${post.excerpt}`
        .toLocaleLowerCase("ko-KR")
        .includes(normalized),
  );
  return (
    <section className="mt-8" aria-label="소식 목록">
      <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-2" aria-label="소식 유형">
          {[
            ["all", "전체"],
            ["notice", "공지"],
            ["devlog", "개발 일지"],
          ].map(([value, label]) => (
            <button
              type="button"
              key={value}
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${category === value ? "bg-brand text-white" : "bg-white text-zinc-600 hover:bg-zinc-100"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="md:w-72">
          <label htmlFor="news-search" className="sr-only">
            소식 검색
          </label>
          <input
            id="news-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="궁금한 소식을 찾아보세요"
            className="field"
          />
        </div>
      </div>
      <p className="mb-4 text-sm text-zinc-500" role="status">
        총 {filtered.length}개의 소식
      </p>
      {filtered.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((post) => (
            <article className="panel group" key={post.slug}>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-brand-light px-3 py-1 font-bold text-brand">
                  {newsCategories[post.category]}
                </span>
                <time className="text-zinc-500" dateTime={post.date}>
                  {formatNewsDate(post.date)}
                </time>
              </div>
              <h2 className="mt-5 text-xl font-bold leading-relaxed text-zinc-900 sm:text-2xl">
                <Link
                  href={`/news/${post.slug}`}
                  className="transition group-hover:text-brand"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 leading-7 text-zinc-600">{post.excerpt}</p>
              <Link
                href={`/news/${post.slug}`}
                className="text-link mt-6"
                aria-label={`${post.title} 읽기`}
              >
                이야기 읽기 <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="panel py-16 text-center">
          <h2 className="text-xl font-bold text-zinc-900">
            아직 찾으시는 소식이 없어요
          </h2>
          <p className="mt-3 text-zinc-600">
            다른 검색어를 입력하거나 전체 소식을 확인해 주세요.
          </p>
          <button
            type="button"
            className="text-link mt-6"
            onClick={() => {
              setCategory("all");
              setQuery("");
            }}
          >
            전체 소식 보기
          </button>
        </div>
      )}
    </section>
  );
}
