import Link from "next/link";
import { FaDiscord, FaGithub, FaYoutube } from "react-icons/fa6";
import PageHero from "../PageHero";

const CHANNELS = [
  {
    name: "Discord",
    description: "개발 소식, 피드백, 커뮤니티 대화에 참여하세요.",
    href: "#",
    icon: FaDiscord,
  },
  {
    name: "YouTube",
    description: "게임 플레이, 개발 일지, 트레일러를 확인하세요.",
    href: "#",
    icon: FaYoutube,
  },
  {
    name: "GitHub",
    description: "오픈소스 프로젝트와 개발 활동을 살펴보세요.",
    href: "#",
    icon: FaGithub,
  },
] as const;

function CommunityContent() {
  return (
    <div className="pb-8">
      <PageHero
        badge="Community"
        title={
          <>
            함께하는 <span className="text-brand">커뮤니티</span>
          </>
        }
        description="Buttumak Games와 소통하고, 최신 소식을 가장 먼저 받아보세요."
      />

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        {CHANNELS.map(({ name, description, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            className="group rounded-[32px] bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-brand-light text-brand transition group-hover:bg-brand group-hover:text-white">
              <Icon className="size-5" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">{name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {description}
            </p>
          </a>
        ))}
      </section>

      <section className="mt-8 rounded-[32px] bg-white p-8 text-center shadow-lg md:p-12">
        <h2 className="text-2xl font-bold text-zinc-900">
          아직 망설여지나요?
        </h2>
        <p className="mt-3 text-zinc-600">
          궁금한 점이 있다면 언제든지 문의해 주세요.
        </p>
        <Link
          href="mailto:hello@buttumak.games"
          className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark"
        >
          문의하기
        </Link>
      </section>
    </div>
  );
}

export default CommunityContent;
