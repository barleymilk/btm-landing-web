import Link from "next/link";
import { createPageMetadata } from "../site";

export const metadata = createPageMetadata({
  title: "문의 개인정보 안내",
  description:
    "부뚜막게임즈 문의 접수 시 수집하는 정보와 이용 목적을 안내합니다.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="panel mt-8">
      <p className="eyebrow">Privacy</p>
      <h1 className="mt-4 text-3xl font-bold text-zinc-900">
        문의 개인정보 안내
      </h1>
      <p className="mt-3 text-sm text-zinc-500">적용일: 2026년 11월 1일</p>
      <div className="mt-10 max-w-3xl space-y-8 text-zinc-600">
        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            수집하는 정보와 목적
          </h2>
          <p className="mt-3 leading-8">
            부뚜막게임즈는 문의 접수와 답변, 협업 제안 검토, 홈페이지 오류
            확인을 위해 이름(또는 담당자명), 이메일, 문의 유형, 제목, 문의
            내용을 수집합니다. 접수번호, 접수 시각, 동의 버전이 함께 기록됩니다.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-zinc-900">보관과 삭제</h2>
          <p className="mt-3 leading-8">
            문의는 담당자만 확인하며 홈페이지에 공개되지 않습니다. 접수일로부터
            90일이 지난 문의는 정기적으로 자동 삭제합니다. 문의 데이터를 외부
            광고나 마케팅 용도로 사용하지 않습니다.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-zinc-900">동의와 문의</h2>
          <p className="mt-3 leading-8">
            수집·이용 동의를 거부할 수 있으며, 이 경우 문의 폼 접수는 이용할 수
            없습니다. 접수한 문의의 확인·정정·삭제를 요청하려면 문의 폼에
            접수번호를 함께 적어주세요. 답변에 필요한 범위의 정보만 작성해
            주세요.
          </p>
        </section>
        <Link href="/contact" className="button-secondary">
          문의하기로 돌아가기
        </Link>
      </div>
    </article>
  );
}
