import type { Metadata } from "next";
import CharacterContent from "../components/character/CharacterContent";
import { createPageMetadata } from "../site";

export const metadata: Metadata = createPageMetadata({
  title: "캐릭터",
  description: "Buttumak Games 세계관 속 캐릭터들을 소개합니다.",
  path: "/character",
});

export default function CharacterPage() {
  return <CharacterContent />;
}
