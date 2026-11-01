import Link from "next/link";
import PageHero from "../PageHero";

export default function GameContent() {
  return (
    <>
      <PageHero
        badge="Our games"
        title={
          <>
            다음 이야기를
            <br />
            <span className="text-brand">만들고 있어요</span>
          </>
        }
        description="귀여운 캐릭터와 함께할 부뚜막게임즈의 인디 게임을 준비하고 있습니다."
      />
      <section className="panel mt-8 grid items-center gap-8 md:grid-cols-2">
        <div
          aria-hidden="true"
          className="flex min-h-60 items-center justify-center rounded-3xl bg-brand-light/60"
        >
          <div className="text-center">
            <span className="text-6xl text-brand">✦</span>
            <p className="mt-5 text-sm font-bold tracking-widest text-brand">
              A NEW STORY IS COOKING
            </p>
          </div>
        </div>
        <div>
          <p className="eyebrow">In development</p>
          <h2 className="section-title mt-4">아직은, 만드는 중</h2>
          <p className="mt-5 leading-8 text-zinc-600">
            게임의 이름과 플레이 화면, 출시 일정은 공개할 준비가 되면
            알려드리겠습니다. 그때까지 개발 소식에서 스튜디오의 이야기를
            만나보세요.
          </p>
          <Link href="/news" className="button-primary mt-6">
            개발 소식 확인하기 ↗
          </Link>
        </div>
      </section>
    </>
  );
}
