export type NewsPost = {
  slug: string;
  title: string;
  category: "notice" | "devlog";
  date: string;
  excerpt: string;
  published: boolean;
  sections: { heading: string; paragraphs: string[] }[];
};

// 새 소식은 이 배열에 추가합니다. published: false인 글은 목록과 상세에서 공개되지 않습니다.
export const newsPosts: NewsPost[] = [
  {
    slug: "building-our-homepage",
    title: "우리의 이야기를 담을 공간을 만들고 있어요",
    category: "devlog",
    date: "2026-11-01",
    excerpt:
      "스튜디오 소개부터 개발 소식, 여러분의 의견을 듣는 창구까지. 부뚜막게임즈 공식 홈페이지의 첫걸음을 전합니다.",
    published: true,
    sections: [
      {
        heading: "반가워요, 부뚜막게임즈입니다",
        paragraphs: [
          "상상을 게임으로, 즐거움을 세상으로. 부뚜막게임즈는 귀여운 캐릭터와 함께하는 인디 게임을 만들어가는 스튜디오입니다. 우리의 작업과 생각을 나눌 공식 홈페이지를 준비하고 있습니다.",
        ],
      },
      {
        heading: "조금씩, 꾸준히 전할 이야기",
        paragraphs: [
          "이 공간에서는 홈페이지와 게임을 만들어가는 과정, 새롭게 공개할 소식들을 전하려고 합니다. 아직 소개할 게임의 상세 정보는 준비 중입니다. 공개할 준비가 되면 개발 소식에서 먼저 알려드릴게요.",
        ],
      },
      {
        heading: "여러분의 이야기도 들려주세요",
        paragraphs: [
          "궁금한 점이나 함께하고 싶은 제안이 있다면 문의하기를 이용해 주세요. 홈페이지에서 발견한 문제도 같은 창구로 알려주실 수 있습니다. 보내주신 내용을 확인한 뒤 남겨주신 이메일로 답변드리겠습니다.",
        ],
      },
    ],
  },
];
