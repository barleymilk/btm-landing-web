import type { Metadata } from "next";

export const site = {
  name: "부뚜막게임즈",
  shortName: "Buttumak Games",
  description:
    "상상을 게임으로, 즐거움을 세상으로. 귀여운 캐릭터와 함께하는 인디 게임 스튜디오.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://buttumakgames.com",
  ogImage: {
    url: "/btm-with-text.png",
    width: 1774,
    height: 887,
    alt: "부뚜막게임즈 - Buttumak Games",
  },
} as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "부뚜막게임즈",
    "Buttumak Games",
    "인디 게임",
    "게임 스튜디오",
    "indie game",
  ],
  authors: [{ name: site.shortName }],
  creator: site.shortName,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [site.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [site.ogImage.url],
  },
  alternates: {
    canonical: site.url,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/btm-icon.ico",
    apple: "/btm-icon.ico",
  },
};

export function createPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const pageTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    openGraph: {
      title: pageTitle,
      description,
      url,
      images: [site.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [site.ogImage.url],
    },
    alternates: {
      canonical: url,
    },
  };
}
