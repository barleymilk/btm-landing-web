"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

function isSameRoute(pathname: string, href: string) {
  return pathname === href;
}

type ScrollLinkProps = ComponentProps<typeof Link>;

function ScrollLink({ href, onClick, ...props }: ScrollLinkProps) {
  const pathname = usePathname();
  const hrefString = typeof href === "string" ? href : (href.pathname ?? "");

  return (
    <Link
      href={href}
      scroll
      onClick={(e) => {
        if (isSameRoute(pathname, hrefString)) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        onClick?.(e);
      }}
      {...props}
    />
  );
}

export default ScrollLink;
