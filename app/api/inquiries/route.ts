export const runtime = "nodejs";

const json = (body: unknown, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const siteOrigin = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? request.url,
  ).origin;
  if (!origin || origin !== siteOrigin)
    return json({ message: "현재 홈페이지에서 다시 접수해 주세요." }, 403);
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    return json({ message: "올바른 접수 형식이 아닙니다." }, 415);
  const token = process.env.INQUIRY_API_TOKEN;
  if (!token)
    return json(
      {
        message:
          "지금은 문의 접수를 이용할 수 없습니다. 잠시 후 다시 시도해 주세요.",
      },
      503,
    );
  const reader = request.body?.getReader();
  if (!reader) return json({ message: "문의 내용을 입력해 주세요." }, 400);
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 32768) {
        await reader.cancel();
        return json({ message: "문의 내용이 너무 큽니다." }, 413);
      }
      chunks.push(value);
    }
    const body = Buffer.concat(chunks).toString("utf8");
    try {
      JSON.parse(body);
    } catch {
      return json({ message: "입력한 내용을 확인해 주세요." }, 400);
    }
    const response = await fetch(
      `${process.env.INQUIRY_API_URL ?? "http://127.0.0.1:4001"}/inquiries`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Idempotency-Key": request.headers.get("idempotency-key") ?? "",
        },
        body,
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    );
    if (response.status >= 500 || response.status === 401)
      return json(
        {
          message:
            "접수 결과를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.",
        },
        503,
      );
    return json(await response.json(), response.status);
  } catch {
    return json(
      {
        message:
          "접수 결과를 확인하지 못했습니다. 같은 내용으로 다시 시도해 주세요.",
      },
      503,
    );
  }
}
