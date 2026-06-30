import type { Metadata } from "next";
import Main from "./components/home/Main";
import { createPageMetadata, site } from "./site";

const homeDescription =
  "귀여운 캐릭터와 함께하는 세계. Buttumak Games가 만드는 인디 게임의 새로운 이야기를 만나보세요.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "메인",
    description: homeDescription,
    path: "/",
  }),
  title: {
    absolute: site.name,
  },
  openGraph: {
    title: site.name,
    description: homeDescription,
    url: site.url,
    images: [site.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: homeDescription,
    images: [site.ogImage.url],
  },
};

export default function Home() {
  return (
    <div className="">
      <Main />
    </div>
  );
}
