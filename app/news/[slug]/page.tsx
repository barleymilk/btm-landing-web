import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews, getNewsPost } from "@/lib/news";
import { formatNewsDate, newsCategories } from "@/lib/news-format";
import { createPageMetadata } from "../../site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getNews().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getNewsPost((await params).slug);
  if (!post) notFound();
  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.slug}`,
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const post = getNewsPost((await params).slug);
  if (!post) notFound();
  return (
    <article className="panel mt-8">
      <Link href="/news" className="text-link">
        ← 모든 개발 소식
      </Link>
      <header className="mt-8 border-b border-zinc-100 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-brand-light px-3 py-1 font-bold text-brand">
            {newsCategories[post.category]}
          </span>
          <time dateTime={post.date} className="text-zinc-500">
            {formatNewsDate(post.date)}
          </time>
        </div>
        <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-snug text-zinc-900 md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-5 max-w-3xl leading-8 text-zinc-600">{post.excerpt}</p>
      </header>
      <div className="max-w-3xl space-y-10 py-10">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph, index) => (
              <p className="mt-4 leading-8 text-zinc-600" key={index}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 border-t border-zinc-100 pt-6">
        <Link href="/news" className="button-secondary">
          목록으로
        </Link>
        <Link href="/contact" className="button-primary">
          의견 보내기
        </Link>
      </div>
    </article>
  );
}
