import Image from "next/image";
import Link from "next/link";
import PageHero from "../components/PageHero";
import { createPageMetadata } from "../site";

export const metadata = createPageMetadata({
  title: "스튜디오",
  description: "상상을 게임으로, 즐거움을 세상으로. 부뚜막게임즈를 소개합니다.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="Our studio"
        title={
          <>
            작은 상상에서 시작하는
            <br />
            <span className="text-brand">우리의 즐거움</span>
          </>
        }
        description="부뚜막게임즈는 귀여운 캐릭터와 함께하는 인디 게임을 만들어가는 스튜디오입니다."
      />
      <section className="panel mt-8 grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div className="space-y-5">
          <p className="eyebrow">Buttumak Games</p>
          <h2 className="section-title">
            상상을 게임으로,
            <br />
            즐거움을 세상으로
          </h2>
          <p className="max-w-xl leading-8 text-zinc-600">
            게임 안에서 만나는 캐릭터와 작은 모험이 일상 속 즐거움으로 이어지길
            바랍니다. 부뚜막게임즈의 이야기는 그 마음에서 시작합니다.
          </p>
          <p className="max-w-xl leading-8 text-zinc-600">
            지금은 첫 게임을 준비하는 중입니다. 완성된 결과뿐 아니라 만들어가는
            과정도 개발 소식에서 조금씩 나누겠습니다.
          </p>
          <Link className="text-link" href="/news">
            우리가 만들어가는 이야기 <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="rounded-full bg-brand-light/40 p-8">
          <Image
            src="/btm.png"
            width={220}
            height={265}
            alt="부뚜막게임즈 마스코트 부리옹"
            className="h-56 w-auto object-contain"
          />
        </div>
      </section>
      <section
        className="mt-8 grid gap-5 md:grid-cols-3"
        aria-label="스튜디오의 방향"
      >
        {[
          [
            "01",
            "오래 기억될 캐릭터",
            "처음 만났을 때의 반가움이 오래 남는 캐릭터를 만들어갑니다.",
          ],
          [
            "02",
            "작지만 분명한 즐거움",
            "작은 아이디어를 다듬어 우리다운 게임 경험으로 발전시킵니다.",
          ],
          [
            "03",
            "함께 만드는 이야기",
            "개발 과정을 나누고 플레이어의 의견에 귀 기울이겠습니다.",
          ],
        ].map(([number, title, description]) => (
          <article key={number} className="panel">
            <span className="eyebrow">{number}</span>
            <h2 className="mt-5 text-xl font-bold text-zinc-900">{title}</h2>
            <p className="mt-3 leading-7 text-zinc-600">{description}</p>
          </article>
        ))}
      </section>
      <section className="panel mt-8 flex flex-col justify-between gap-6 bg-brand-light/40 md:flex-row md:items-center">
        <div>
          <h2 className="section-title">함께할 이야기가 있나요?</h2>
          <p className="mt-3 text-zinc-600">
            게임에 대한 의견도, 협업 제안도 환영합니다.
          </p>
        </div>
        <Link href="/contact" className="button-primary">
          부뚜막에 이야기 보내기
        </Link>
      </section>
    </>
  );
}
