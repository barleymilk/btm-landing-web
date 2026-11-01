# Vercel 프런트와 Mac 백엔드 배포

프런트는 Vercel, 문의 API와 SQLite는 이 Mac에서 실행합니다. 브라우저는 Vercel의 같은 출처 API만 호출하고, Vercel 서버가 ngrok HTTPS 경로를 통해 Mac에 접속합니다.

```text
브라우저
  → Vercel: Next.js 화면 + /api/inquiries
  → ngrok HTTPS: /homepage-api/inquiries
  → Mac: 공유 중계 서버 127.0.0.1:4100
  → Mac: 문의 API 127.0.0.1:4001
  → Mac: back/dev/.data/inquiries.sqlite

기존 카카오봇 경로 → 같은 중계 서버 → 127.0.0.1:3000
```

소개와 개발 소식은 Vercel에서 제공하므로 Mac 백엔드에 의존하지 않습니다. Mac이 응답하지 않으면 문의는 접수 성공으로 처리하지 않고 재시도 안내를 표시합니다.

## Vercel 프로젝트 설정

GitHub 저장소 `barleymilk/btm-landing-web`의 루트가 Next.js 프로젝트 루트입니다. Mac의 물리 경로인 `front/dev`를 Vercel Root Directory에 입력하지 않습니다. 프레임워크는 Next.js, 빌드 명령은 `npm run build`입니다.

GitHub의 기존 Vercel 배포 기록에서 확인한 프로젝트는 `barleymilks-projects/btm-landing-web`입니다. Production 환경에 다음 값을 설정하고 새 배포에 반영합니다. 대상 Vercel 팀에 대한 접근 권한이 있어야 환경변수를 설정할 수 있습니다.

| 환경변수 | 값 | 공개 여부 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 실제 공식 홈페이지의 HTTPS origin | 공개 설정 |
| `INQUIRY_API_URL` | `https://heavily-nag-subway.ngrok-free.dev/homepage-api` | 서버 설정 |
| `INQUIRY_API_TOKEN` | Mac 백엔드 `.env`의 같은 이름 값 | 서버 Secret |

서버 인증키에는 `NEXT_PUBLIC_` 접두사를 사용하지 않습니다. 키를 채팅, 커밋, 셸 명령 인자, 빌드 로그에 출력하지 않습니다. 환경변수는 [Vercel 환경변수 문서](https://vercel.com/docs/environment-variables)에 따라 대상 환경에 설정합니다.

Vercel에서는 백엔드 주소가 누락되거나 HTTPS가 아니면 요청을 전달하지 않습니다. Vercel의 `127.0.0.1`은 Mac을 뜻하지 않으므로 로컬 주소를 배포 설정에 사용하지 않습니다. 백엔드 리디렉션도 따라가지 않습니다.

Preview 환경에는 기본적으로 운영 문의 인증키를 설정하지 않습니다. 별도 테스트 백엔드를 준비한 경우에만 Preview용 주소와 인증키를 설정합니다. 출처 검사는 공식 사이트 origin과 해당 배포의 정확한 `VERCEL_URL`만 허용하며, 임의의 `*.vercel.app`을 허용하지 않습니다.

## Mac 실행과 ngrok 공유

백엔드와 공유 중계 서버는 `launchd`로 관리합니다. 실행 정의 준비와 관리 명령은 백엔드 README를 확인합니다. DB와 인증키는 Mac에 남고 Vercel 빌드에는 포함하지 않습니다.

현재 기존 ngrok endpoint는 `https://heavily-nag-subway.ngrok-free.dev`이며 카카오봇을 제공하고 있습니다. 홈페이지와 공유하려면 ngrok upstream을 기존 `127.0.0.1:3000`에서 중계 서버 `127.0.0.1:4100`으로 전환합니다. 중계 서버는 `/homepage-api/inquiries`, `/homepage-api/health`만 홈페이지에 전달하고 기존 요청 경로와 본문은 카카오봇에 그대로 전달합니다.

기존 ngrok 설정에는 인증정보가 있으므로 전체 파일을 출력하거나 Git에 넣지 않습니다. 전환 전 원본을 같은 Mac의 비공개 런타임 폴더에 백업하고, ngrok 설정 검증과 양쪽 헬스 검사를 수행합니다. 전환 후 실패하면 원본 설정으로 복원합니다. ngrok은 [공식 agent 문서](https://ngrok.com/docs/gateway/agent)에 설명된 외부 HTTPS 중계 경로이며, 문의 개인정보와 서버 인증 헤더가 이 경로를 통과합니다.

2026년 11월 1일 사용자에게 공유 경로 전환과 ngrok의 문의 데이터 처리를 승인받아 upstream을 `127.0.0.1:4100`으로 전환했습니다. 기존 `/health`와 새 `/homepage-api/health`의 `200`, 인증 없는 문의의 `401`, 합성 문의의 `201`과 Mac DB 저장을 확인했습니다. 시험 데이터는 해당 접수번호로만 삭제했습니다. Vercel 환경변수 설정과 새 프런트 배포는 별도 단계입니다.

## 운영 확인

- 프런트의 소개와 소식 페이지가 정상 표시되는지 확인합니다.
- 기존 ngrok `/health`와 새 `/homepage-api/health`가 모두 `200`인지 확인합니다.
- 인증 없는 공개 문의 요청이 `401`인지 확인합니다.
- 합성 문의로 Vercel → ngrok → Mac → DB → 접수번호 흐름을 확인한 뒤 해당 시험 데이터만 정리합니다.
- Mac은 전원과 인터넷이 유지되어야 합니다. 현재 LaunchAgent 방식은 사용자 로그인 세션에서 동작하므로 재부팅 후 로그인해야 서비스가 시작됩니다. [Apple launchd 안내](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html)
