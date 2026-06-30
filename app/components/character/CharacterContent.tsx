import Image from "next/image";
import PageHero from "../PageHero";

const CHARACTERS = [
  {
    name: "부리옹(Buri-ong)",
    role: "마스코트",
    description: "Buttumak Games를 대표하는 귀여운 캐릭터입니다.",
    src: "/btm.png",
  },
  {
    name: "???",
    role: "준비 중",
    description: "새로운 캐릭터가 곧 공개됩니다. 기대해 주세요!",
  },
] as const;

function CharacterContent() {
  return (
    <div className="pb-8">
      <PageHero
        badge="Characters"
        title={
          <>
            세계를 채우는 <span className="text-brand">캐릭터</span>
          </>
        }
        description="Buttumak Games 세계관 속 캐릭터들을 소개합니다."
      />

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {CHARACTERS.map((character) => (
          <article
            key={character.name}
            className="rounded-[24px] bg-white p-6 shadow-lg sm:rounded-[32px] sm:p-8"
          >
            <div className="mb-6 flex justify-center rounded-2xl bg-brand-light/30 py-8">
              {"src" in character ? (
                <Image
                  src={character.src}
                  width={160}
                  height={160}
                  alt={character.name}
                  className="size-40 object-contain"
                />
              ) : (
                <div className="flex size-40 items-center justify-center rounded-full bg-zinc-100 text-4xl font-bold text-zinc-300">
                  ?
                </div>
              )}
            </div>
            <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-500">
              {character.role}
            </span>
            <h2 className="mt-3 text-xl font-bold text-zinc-900 sm:text-2xl">
              {character.name}
            </h2>
            <p className="mt-2 text-zinc-600">{character.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default CharacterContent;
