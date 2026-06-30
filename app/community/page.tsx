import type { Metadata } from "next";
import CommunityContent from "../components/community/CommunityContent";
import { createPageMetadata } from "../site";

export const metadata: Metadata = createPageMetadata({
  title: "커뮤니티",
  description:
    "Buttumak Games와 소통하고, 최신 소식을 가장 먼저 받아보세요.",
  path: "/community",
});

export default function CommunityPage() {
  return <CommunityContent />;
}
