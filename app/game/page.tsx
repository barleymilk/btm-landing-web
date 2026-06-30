import type { Metadata } from "next";
import GameContent from "../components/game/GameContent";
import { createPageMetadata } from "../site";

export const metadata: Metadata = createPageMetadata({
  title: "게임",
  description:
    "Buttumak Games가 만들어가는 인디 게임 프로젝트를 만나보세요.",
  path: "/game",
});

export default function GamePage() {
  return <GameContent />;
}
