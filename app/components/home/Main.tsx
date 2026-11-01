import Hero from "./Hero";
import Link from "next/link";
import { getNews } from "@/lib/news";
import { formatNewsDate, newsCategories } from "@/lib/news-format";

export default function Main() {
  return (
    <>
      <Hero />
      <section className="my-12 grid items-start gap-6 py-3 md:my-16 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div>
          <p className="eyebrow">Small studio, warm stories</p>
          <h2 className="section-title mt-4">
            게임 속 만남이
            <br />
            일상 속 즐거움으로
          </h2>
        </div>
        <div>
          <p className="leading-8 text-zinc-600">
            우리는 귀여운 캐릭터와 작은 상상에서 출발합니다. 부리옹과 함께, 오래
            기억하고 싶은 게임의 이야기를 만들어갑니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-6">
            <Link href="/game" className="text-link">
              준비 중인 게임 ↗
            </Link>
            <Link href="/character" className="text-link">
              부리옹을 소개합니다 ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="mt-8" aria-labelledby="latest-news">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Studio journal</p>
            <h2 id="latest-news" className="section-title mt-3">
              부뚜막에서 온 소식
            </h2>
          </div>
          <Link href="/news" className="text-link">
            전체 소식 보기 ↗
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {getNews()
            .slice(0, 2)
            .map((post) => (
              <article key={post.slug} className="panel">
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-bold text-brand">
                    {newsCategories[post.category]}
                  </span>
                  <time className="text-zinc-500" dateTime={post.date}>
                    {formatNewsDate(post.date)}
                  </time>
                </div>
                <h3 className="mt-4 text-xl font-bold leading-8 text-zinc-900">
                  <Link
                    href={`/news/${post.slug}`}
                    className="hover:text-brand"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-7 text-zinc-600">{post.excerpt}</p>
                <Link
                  href={`/news/${post.slug}`}
                  className="text-link mt-5"
                  aria-label={`${post.title} 읽기`}
                >
                  이야기 읽기 ↗
                </Link>
              </article>
            ))}
          <div className="panel flex flex-col justify-between gap-6 bg-brand-light/50">
            <div>
              <p className="eyebrow">Let’s talk</p>
              <h3 className="mt-4 text-2xl font-bold leading-9 text-zinc-900">
                함께하고 싶은
                <br />
                이야기가 있나요?
              </h3>
              <p className="mt-3 leading-7 text-zinc-600">
                궁금한 점부터 새로운 제안까지,
                <br />
                여러분의 목소리를 기다립니다.
              </p>
            </div>
            <Link href="/contact" className="text-link w-fit">
              문의 보내기 ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
