import Image from "next/image";
import { FaDiscord, FaGithub, FaYoutube } from "react-icons/fa6";
import ScrollLink from "./ScrollLink";

const NAV_LINKS = [
  { href: "/", label: "메인" },
  { href: "/game", label: "게임" },
  { href: "/character", label: "캐릭터" },
  { href: "/community", label: "커뮤니티" },
] as const;

const SUPPORT_LINKS = [
  { href: "mailto:hello@buttumak.games", label: "문의하기" },
  { href: "#", label: "FAQ" },
  { href: "#", label: "버그 제보" },
] as const;

const LEGAL_LINKS = [
  { href: "#", label: "이용약관" },
  { href: "#", label: "개인정보처리방침" },
] as const;

const SOCIAL_LINKS = [
  { href: "#", label: "Discord", icon: FaDiscord },
  { href: "#", label: "YouTube", icon: FaYoutube },
  { href: "#", label: "GitHub", icon: FaGithub },
] as const;

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 mb-6 sm:mt-16 sm:mb-8">
      <div className="rounded-[24px] bg-white p-6 shadow-lg sm:rounded-[32px] sm:p-8 md:rounded-[40px] md:p-10">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <ScrollLink href="/" className="inline-block">
              <Image
                src="/btm-with-text.png"
                width={160}
                height={48}
                alt="Buttumak Games"
                className="h-10 w-auto"
              />
            </ScrollLink>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-600">
              상상을 게임으로 만드는 인디 게임 스튜디오
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition hover:bg-brand hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">바로가기</h3>
            <ul className="space-y-2 text-sm text-zinc-600">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <ScrollLink
                    href={href}
                    className="transition hover:text-zinc-900 hover:underline"
                  >
                    {label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">고객지원</h3>
            <ul className="space-y-2 text-sm text-zinc-600">
              {SUPPORT_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="transition hover:text-zinc-900 hover:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">사업자 정보</h3>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>상호: Buttumak Games</li>
              <li>대표: 이성준</li>
              <li>사업자등록번호: (추후 입력)</li>
              <li>hello@buttumak.games</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-zinc-100 pt-6 text-sm text-zinc-500 sm:mt-10 md:flex-row md:items-center md:justify-between">
          <p>© {year} Buttumak Games. All rights reserved.</p>
          <div className="flex gap-4">
            {LEGAL_LINKS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="transition hover:text-zinc-900 hover:underline"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
