"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import ScrollLink from "./ScrollLink";

const NAV_LINKS = [
  { href: "/", label: "메인" },
  { href: "/game", label: "게임" },
  { href: "/character", label: "캐릭터" },
  { href: "/community", label: "커뮤니티" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <li>
      <ScrollLink
        href={href}
        className={`group relative inline-block px-1 py-2 transition duration-200 hover:-translate-y-0.5 ${
          isActive ? "text-brand" : "text-zinc-800 hover:text-brand"
        }`}
      >
        {label}
        <span
          className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-brand transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </ScrollLink>
    </li>
  );
}

function Header() {
  const pathname = usePathname();

  return (
    <header>
      <nav className="relative mt-8 grid grid-cols-[auto_1fr_auto] items-center rounded-[60px] bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <ScrollLink
          href="/"
          className="shrink-0 pl-1 transition duration-200 hover:scale-110 active:scale-95"
        >
          <Image
            src="/btm.png"
            width={60}
            height={60}
            alt="buttumak games logo"
            className="drop-shadow-sm"
          />
        </ScrollLink>
        <ul className="flex justify-center gap-8 text-xl font-bold md:gap-16 md:text-2xl lg:gap-24">
          {NAV_LINKS.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              isActive={isActivePath(pathname, href)}
            />
          ))}
        </ul>
        <div className="w-[60px] shrink-0" aria-hidden="true" />
      </nav>
    </header>
  );
}

export default Header;
