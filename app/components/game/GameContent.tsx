import PageHero from "../PageHero";

const GAMES = [
  {
    title: "첫 번째 프로젝트",
    description: "Buttumak Games의 debut title. 곧 공개됩니다.",
    status: "Coming Soon",
  },
  {
    title: "새로운 모험",
    description: "귀여운 캐릭터와 함께 떠나는 새로운 여정을 준비 중입니다.",
    status: "In Development",
  },
] as const;

function GameContent() {
  return (
    <div className="pb-8">
      <PageHero
        badge="Games"
        title={
          <>
            Buttumak의 <span className="text-brand">게임</span>
          </>
        }
        description="Buttumak Games가 만들어가는 인디 게임 프로젝트를 만나보세요."
      />

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {GAMES.map((game) => (
          <article
            key={game.title}
            className="rounded-[32px] bg-white p-8 shadow-lg"
          >
            <div className="mb-4 flex aspect-video items-center justify-center rounded-2xl bg-brand-light/50">
              <span className="text-sm font-bold text-brand">Coming Soon</span>
            </div>
            <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-500">
              {game.status}
            </span>
            <h2 className="mt-3 text-2xl font-bold text-zinc-900">
              {game.title}
            </h2>
            <p className="mt-2 text-zinc-600">{game.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default GameContent;
