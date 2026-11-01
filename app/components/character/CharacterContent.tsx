import Image from "next/image";
import Link from "next/link";
import PageHero from "../PageHero";

export default function CharacterContent() {
  return (
    <>
      <PageHero
        badge="Meet Buri-ong"
        title={
          <>
            우리의 첫 번째 인사,
            <br />
            <span className="text-brand">부리옹</span>
          </>
        }
        description="부뚜막게임즈를 대표하는 귀여운 마스코트를 소개합니다."
      />
      <section className="panel mt-8 grid items-center gap-10 md:grid-cols-2">
        <div className="flex justify-center rounded-3xl bg-brand-light/40 p-10">
          <Image
            src="/btm.png"
            width={250}
            height={301}
            alt="빨간 불꽃과 초록 잎 모양의 부뚜막게임즈 마스코트 부리옹"
            className="h-64 w-auto object-contain"
          />
        </div>
        <div>
          <p className="eyebrow">Our mascot</p>
          <h2 className="section-title mt-4">
            부리옹{" "}
            <span className="text-base font-normal text-zinc-500">
              Buri-ong
            </span>
          </h2>
          <p className="mt-5 leading-8 text-zinc-600">
            빨간 불꽃을 닮은 모습과 반가운 표정. 부리옹은 부뚜막게임즈를
            대표하는 마스코트입니다.
          </p>
          <p className="mt-3 leading-8 text-zinc-600">
            홈페이지와 개발 소식 곳곳에서 부리옹을 만나보세요. 앞으로 전할
            이야기에도 함께하겠습니다.
          </p>
          <Link href="/contact?category=partnership" className="text-link mt-6">
            캐릭터 관련 협업 문의 ↗
          </Link>
        </div>
      </section>
    </>
  );
}
