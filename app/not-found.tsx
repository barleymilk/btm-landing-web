import Link from "next/link";

export default function NotFound() {
  return (
    <section className="panel my-8 py-16 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-3xl font-bold text-zinc-900">
        이 이야기는 찾을 수 없어요
      </h1>
      <p className="mt-4 text-zinc-600">
        주소를 확인하거나 다른 개발 소식을 만나보세요.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="button-secondary">
          메인으로
        </Link>
        <Link href="/news" className="button-primary">
          개발 소식 보기
        </Link>
      </div>
    </section>
  );
}
