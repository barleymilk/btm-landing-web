"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="mt-8">
      <div className="relative overflow-hidden rounded-[40px] bg-white px-8 py-12 shadow-lg md:px-14 md:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand-light/80 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-10 size-72 rounded-full bg-brand-light/50 blur-3xl"
        />

        <div className="relative grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <span className="inline-block rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-bold text-zinc-600">
              Buttumak Games
            </span>
            <h1 className="text-4xl font-bold leading-tight text-zinc-900 md:text-5xl">
              상상을 게임으로,
              <br />
              <span className="text-brand">즐거움</span>을 세상으로
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-zinc-600">
              귀여운 캐릭터와 함께하는 세계. Buttumak Games가 만드는 인디 게임의
              새로운 이야기를 만나보세요.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/game"
                className="rounded-full bg-brand px-6 py-3 text-base font-bold text-white transition hover:bg-brand-dark"
              >
                게임 둘러보기
              </Link>
              <Link
                href="/community"
                className="rounded-full border border-zinc-200 bg-white px-6 py-3 text-base font-bold text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50"
              >
                커뮤니티 참여
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="absolute inset-0 scale-90 rounded-full bg-brand-light blur-2xl" />
              <Image
                src="/btm.png"
                width={320}
                height={320}
                alt="Buttumak Games 캐릭터"
                priority
                className="relative size-56 object-contain md:size-72"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
