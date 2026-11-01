import PageHero from "../components/PageHero";
import ContactForm from "../components/contact/ContactForm";
import { createPageMetadata } from "../site";

export const metadata = createPageMetadata({
  title: "문의하기",
  description:
    "일반 문의, 협업 제안, 미디어 문의와 홈페이지 오류를 부뚜막게임즈에 전해주세요.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initialCategory =
    category && ["general", "partnership", "press", "bug"].includes(category)
      ? category
      : "general";
  return (
    <>
      <PageHero
        badge="Say hello"
        title={
          <>
            여러분의 이야기가
            <br />
            <span className="text-brand">궁금해요</span>
          </>
        }
        description="궁금한 점, 함께하고 싶은 제안, 더 나아지기 위한 의견을 들려주세요."
      />
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <ContactForm key={initialCategory} initialCategory={initialCategory} />
        <aside className="panel space-y-7">
          <div>
            <p className="eyebrow">Before you send</p>
            <h2 className="mt-4 text-xl font-bold text-zinc-900">
              마음을 담아 읽겠습니다
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              남겨주신 이메일 주소를 한 번 더 확인해 주세요. 문의 내용은
              공개되지 않습니다.
            </p>
          </div>
          <div className="border-t border-zinc-100 pt-6">
            <h3 className="font-bold text-zinc-900">협업 제안</h3>
            <p className="mt-2 text-sm leading-7 text-zinc-600">
              제안의 목적과 협업 범위를 함께 적어주시면 검토에 도움이 됩니다.
            </p>
          </div>
          <div className="border-t border-zinc-100 pt-6">
            <h3 className="font-bold text-zinc-900">오류 제보</h3>
            <p className="mt-2 text-sm leading-7 text-zinc-600">
              사용한 기기, 브라우저, 문제가 발생한 화면을 알려주세요.
            </p>
          </div>
        </aside>
      </div>
      <section id="faq" className="panel mt-8 scroll-mt-8">
        <h2 className="section-title">자주 묻는 질문</h2>
        <div className="mt-6 divide-y divide-zinc-100">
          {[
            [
              "게임은 언제 만나볼 수 있나요?",
              "현재 게임을 준비하고 있습니다. 공개 일정과 상세 정보가 정해지면 개발 소식에서 알려드리겠습니다.",
            ],
            [
              "답변은 어디로 오나요?",
              "문의 폼에 남겨주신 이메일로 답변드립니다. 접수 후 표시되는 접수번호를 보관해 주세요.",
            ],
            [
              "보낸 문의는 다른 사람에게 공개되나요?",
              "문의는 공개 게시글로 등록되지 않으며, 담당자가 답변을 위해 확인합니다.",
            ],
          ].map(([question, answer]) => (
            <details className="group py-5" key={question}>
              <summary className="cursor-pointer font-bold leading-7 text-zinc-900">
                {question}
              </summary>
              <p className="mt-3 pl-4 text-sm leading-7 text-zinc-600">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
