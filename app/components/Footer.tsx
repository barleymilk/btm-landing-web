import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="mt-14 mb-6 sm:mt-20 sm:mb-8">
      <div className="panel">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/btm-with-text.png"
                width={160}
                height={80}
                alt="Buttumak Games 메인으로"
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-7 text-zinc-600">
              상상을 게임으로 만드는 인디 게임 스튜디오.
              <br />
              우리다운 즐거움을 만들어갑니다.
            </p>
          </div>
          <nav aria-label="푸터 바로가기">
            <h2 className="mb-4 text-lg font-bold text-zinc-900">
              부뚜막 둘러보기
            </h2>
            <ul className="space-y-3 text-sm text-zinc-600">
              {navigation.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-brand hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="mb-4 text-lg font-bold text-zinc-900">
              이야기를 들려주세요
            </h2>
            <ul className="space-y-3 text-sm text-zinc-600">
              <li>
                <Link
                  href="/contact?category=partnership"
                  className="hover:text-brand hover:underline"
                >
                  협업·사업 제안
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?category=bug"
                  className="hover:text-brand hover:underline"
                >
                  홈페이지 오류 제보
                </Link>
              </li>
              <li>
                <Link
                  href="/contact#faq"
                  className="hover:text-brand hover:underline"
                >
                  자주 묻는 질문
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-sm text-zinc-500">
              Buttumak Games · 대표 이성준
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-zinc-100 pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Buttumak Games. All rights reserved.
          </p>
          <Link href="/privacy" className="hover:text-brand hover:underline">
            문의 개인정보 안내
          </Link>
        </div>
      </div>
    </footer>
  );
}
