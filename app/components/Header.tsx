"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
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
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <li>
      <ScrollLink
        href={href}
        onClick={onClick}
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header>
      <nav className="relative mt-4 rounded-[32px] bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:mt-6 sm:rounded-[40px] sm:p-4 md:mt-8 md:rounded-[60px]">
        <div className="grid grid-cols-[auto_1fr_auto] items-center">
          <ScrollLink
            href="/"
            className="block w-fit shrink-0 pl-1 transition duration-200 hover:scale-110 active:scale-95"
          >
            <Image
              src="/btm.png"
              width={524}
              height={631}
              alt="buttumak games logo"
              className="h-10 w-auto object-contain drop-shadow-sm sm:h-12 md:h-[60px]"
            />
          </ScrollLink>

          <ScrollLink
            href="/"
            className="justify-self-center truncate px-2 text-xl font-bold text-zinc-900 sm:text-3xl md:hidden"
          >
            부뚜막게임즈
          </ScrollLink>

          <ul className="hidden justify-center gap-8 text-xl font-bold md:col-start-2 md:flex md:gap-16 md:text-2xl lg:gap-24">
            {NAV_LINKS.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                isActive={isActivePath(pathname, href)}
              />
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex size-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {menuOpen ? (
              <HiX className="size-6" />
            ) : (
              <HiMenu className="size-6" />
            )}
          </button>

          <div
            className="hidden w-[60px] shrink-0 md:block"
            aria-hidden="true"
          />
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
            >
              <ul className="mt-2 space-y-1 border-t border-zinc-100 pt-2">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <ScrollLink
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded-xl px-3 py-3 text-lg font-bold transition ${
                        isActivePath(pathname, href)
                          ? "bg-brand-light text-brand"
                          : "text-zinc-800 hover:bg-zinc-50"
                      }`}
                    >
                      {label}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Header;
