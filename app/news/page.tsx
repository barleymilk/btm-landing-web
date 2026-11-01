import PageHero from "../components/PageHero";
import NewsList from "../components/news/NewsList";
import { getNews } from "@/lib/news";
import { createPageMetadata } from "../site";

export const metadata = createPageMetadata({
  title: "개발 소식",
  description: "부뚜막게임즈의 공지와 개발 과정을 만나보세요.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        badge="From the studio"
        title={
          <>
            조금씩 쌓아가는
            <br />
            <span className="text-brand">부뚜막의 이야기</span>
          </>
        }
        description="새로운 소식과 게임을 만들어가는 과정을 전합니다."
      />
      <NewsList posts={getNews()} />
    </>
  );
}
