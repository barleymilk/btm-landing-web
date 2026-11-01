"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

type Receipt = { id: string; createdAt: string };
type Errors = Partial<
  Record<
    "name" | "email" | "subject" | "message" | "category" | "consent",
    string
  >
>;
const categories = [
  ["general", "일반 문의"],
  ["partnership", "협업·사업 제안"],
  ["press", "취재·미디어"],
  ["bug", "홈페이지 오류 제보"],
];

export default function ContactForm({
  initialCategory,
}: {
  initialCategory: string;
}) {
  const [pending, setPending] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Errors>({});
  const [messageLength, setMessageLength] = useState(0);
  const attempt = useRef<{ body: string; key: string } | null>(null);
  const submitting = useRef(false);
  const feedback = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (error || receipt) feedback.current?.focus();
  }, [error, receipt]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const data = new FormData(event.currentTarget);
    const body = JSON.stringify({
      name: data.get("name"),
      email: data.get("email"),
      category: data.get("category"),
      subject: data.get("subject"),
      message: data.get("message"),
      consent: data.get("consent") === "on",
      website: data.get("website"),
    });
    if (attempt.current?.body !== body)
      attempt.current = { body, key: crypto.randomUUID() };
    submitting.current = true;
    setPending(true);
    setError("");
    setFields({});
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": attempt.current.key,
        },
        body,
        signal: AbortSignal.timeout(12000),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message ?? "잠시 후 다시 시도해 주세요.");
        setFields(result.fields ?? {});
        return;
      }
      if (typeof result.id !== "string" || typeof result.createdAt !== "string")
        throw new Error("Invalid receipt");
      setReceipt(result);
    } catch {
      setError(
        "접수 결과를 확인하지 못했어요. 작성한 내용은 유지되니 같은 내용으로 다시 시도해 주세요.",
      );
    } finally {
      setPending(false);
      submitting.current = false;
    }
  }

  if (receipt)
    return (
      <div
        className="panel text-center"
        ref={feedback}
        tabIndex={-1}
        role="status"
      >
        <span
          aria-hidden="true"
          className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-light text-3xl text-brand"
        >
          ✓
        </span>
        <h2 className="mt-6 text-2xl font-bold text-zinc-900">
          이야기가 잘 도착했어요
        </h2>
        <p className="mt-4 leading-7 text-zinc-600">
          보내주신 내용을 확인한 뒤 남겨주신 이메일로 답변드리겠습니다.
        </p>
        <dl className="my-8 space-y-3 rounded-2xl bg-zinc-50 p-5 text-sm">
          <div>
            <dt className="text-zinc-500">접수번호</dt>
            <dd className="mt-2 break-all font-mono text-zinc-900">
              {receipt.id}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">접수일시</dt>
            <dd className="mt-2 text-zinc-900">
              {new Date(receipt.createdAt).toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
              })}{" "}
              (한국 시간)
            </dd>
          </div>
        </dl>
        <Link href="/news" className="button-primary">
          개발 소식 둘러보기
        </Link>
        <button
          type="button"
          className="mt-5 block w-full text-sm text-zinc-600 underline underline-offset-4"
          onClick={() => {
            setReceipt(null);
            setError("");
            setFields({});
            setMessageLength(0);
            attempt.current = null;
          }}
        >
          새 문의 작성하기
        </button>
      </div>
    );

  const fieldError = (name: keyof Errors) =>
    fields[name] ? (
      <p id={`${name}-error`} className="mt-2 text-sm text-red-700">
        {fields[name]}
      </p>
    ) : null;
  const errorAttributes = (name: keyof Errors) => ({
    "aria-invalid": !!fields[name],
    "aria-describedby": fields[name] ? `${name}-error` : undefined,
  });

  return (
    <form
      className="panel"
      onSubmit={submit}
      aria-label="문의 접수"
      aria-busy={pending}
    >
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-zinc-900">
          어떤 이야기를 들려주실 건가요?
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          모든 항목을 입력해 주세요. 답변은 이메일로 전해드립니다.
        </p>
      </div>
      {error && (
        <div
          className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
          role="alert"
          tabIndex={-1}
          ref={feedback}
        >
          {error}
        </div>
      )}
      <fieldset disabled={pending} className="space-y-5 disabled:opacity-70">
        <legend className="sr-only">문의 내용</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="name">
              이름 또는 담당자명
            </label>
            <input
              className="field"
              id="name"
              name="name"
              autoComplete="name"
              required
              maxLength={80}
              {...errorAttributes("name")}
            />
            {fieldError("name")}
          </div>
          <div>
            <label className="field-label" htmlFor="email">
              답변받을 이메일
            </label>
            <input
              className="field"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="hello@example.com"
              {...errorAttributes("email")}
            />
            {fieldError("email")}
          </div>
        </div>
        <div>
          <label className="field-label" htmlFor="category">
            문의 유형
          </label>
          <select
            className="field"
            id="category"
            name="category"
            defaultValue={initialCategory}
            required
            {...errorAttributes("category")}
          >
            {categories.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {fieldError("category")}
        </div>
        <div>
          <label className="field-label" htmlFor="subject">
            제목
          </label>
          <input
            className="field"
            id="subject"
            name="subject"
            required
            minLength={2}
            maxLength={150}
            placeholder="문의 내용을 간단히 알려주세요"
            {...errorAttributes("subject")}
          />
          {fieldError("subject")}
        </div>
        <div>
          <label className="field-label" htmlFor="message">
            문의 내용
          </label>
          <textarea
            className="field min-h-44 resize-y"
            id="message"
            name="message"
            rows={7}
            required
            minLength={10}
            maxLength={5000}
            onChange={(event) => setMessageLength(event.target.value.length)}
            placeholder="오류 제보라면 발생한 화면과 상황을 함께 적어주세요. 비밀번호 등 민감한 정보는 입력하지 마세요."
            aria-describedby={
              fields.message ? "message-error message-length" : "message-length"
            }
            aria-invalid={!!fields.message}
          />
          <p
            id="message-length"
            className="mt-2 text-right text-xs text-zinc-500"
          >
            {messageLength.toLocaleString()} / 5,000자 · 최소 10자
          </p>
          {fieldError("message")}
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="rounded-2xl bg-zinc-50 p-4">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-zinc-700">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              className="mt-1 size-4 shrink-0 accent-brand"
              {...errorAttributes("consent")}
            />
            <span>
              문의 답변을 위한 이름, 이메일, 문의 내용의 수집·이용에 동의합니다.
              접수 후 90일이 지난 문의는 자동 정리됩니다.{" "}
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-brand underline underline-offset-4"
              >
                개인정보 안내 (새 창)
              </Link>
            </span>
          </label>
          {fieldError("consent")}
        </div>
        <button
          className="button-primary w-full disabled:cursor-wait"
          type="submit"
        >
          {pending ? "이야기를 보내고 있어요…" : "문의 접수하기"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
      </fieldset>
    </form>
  );
}
