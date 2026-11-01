# 개발 및 브랜치 전략

이 저장소는 `main`에서 작업 브랜치를 만들고, Pull Request로 검토한 뒤 `main`에 병합하는 방식을 사용합니다. 작업을 시작하기 전에 변경 목적에 맞는 브랜치 유형을 선택합니다.

## 기본 브랜치

- `main`: 기본 브랜치이며, 빌드와 검증을 통과한 배포 가능한 코드를 유지합니다. 직접 커밋하거나 푸시하지 않고 PR로 변경합니다.
- 작업 브랜치: 최신 `origin/main`에서 생성하고, 한 가지 목적의 변경을 담습니다. PR의 대상은 `main`입니다.
- 별도의 상시 `develop` 브랜치는 두지 않습니다. 로컬 경로인 `front/dev`의 `dev`는 작업 폴더 이름이며 Git 브랜치를 뜻하지 않습니다.

## 작업 브랜치 이름

형식은 `<type>/<description>`입니다. 설명은 영문 소문자와 숫자를 사용하고 단어는 하이픈으로 연결합니다. 이슈 번호가 있으면 `<type>/<issue-number>-<description>`을 사용합니다.

| 유형 | 용도 | 예시 |
| --- | --- | --- |
| `feature` | 사용자에게 제공하는 새 기능 | `feature/game-detail-page` |
| `fix` | 기존 기능의 오류 수정 | `fix/mobile-menu-navigation` |
| `chore` | 개발 환경, 도구, 의존성, 저장소 운영 설정 | `chore/development-setup` |
| `docs` | 문서만 변경 | `docs/api-guide` |
| `refactor` | 외부 동작을 유지하는 코드 구조 개선 | `refactor/shared-navigation` |
| `perf` | 성능 개선 | `perf/optimize-hero-image` |
| `test` | 테스트 추가 및 개선 | `test/navigation-flow` |
| `ci` | CI/CD 워크플로 변경 | `ci/add-build-check` |

작업의 주된 목적에 맞는 유형을 선택합니다. 해당 작업에 필요한 문서와 검증 변경은 같은 브랜치에 포함할 수 있으며, 별개의 기능이나 오류 수정은 브랜치를 분리합니다. 자동화 도구와 에이전트도 같은 이름 규칙을 따릅니다.

## 작업 순서

1. `git status`로 진행 중인 변경을 확인하고, 기존 변경을 보존합니다.
2. 작업 트리가 정리된 상태에서 최신 기본 브랜치를 가져와 작업 브랜치를 만듭니다.

   ```bash
   git fetch origin
   git switch main
   git pull --ff-only origin main
   git switch -c feature/game-detail-page
   ```

3. 구현과 관련 문서를 함께 변경하고, 변경 범위에 필요한 검증을 수행합니다.
4. 작업 브랜치를 푸시하고 `main`을 대상으로 PR을 작성합니다.

   ```bash
   git push -u origin feature/game-detail-page
   ```

5. PR에 변경 목적, 결과, 검증 내용을 작성합니다. 리뷰와 필수 검사가 통과한 뒤 squash merge하고, 병합된 작업 브랜치는 삭제합니다.

작업 중인 변경이 있다면 먼저 현재 작업을 적절한 작업 브랜치에 보존합니다. 브랜치 이름만 잘못된 경우에는 `git branch -m <type>/<description>`으로 수정합니다. 기존 변경을 버리는 명령으로 작업 트리를 정리하지 않습니다.

## 커밋 및 PR 제목

`<type>: <summary>` 형식을 사용합니다. 커밋 유형은 `feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `test`, `ci`이며, `feature/*` 브랜치의 기능 추가는 `feat`로 작성합니다.

```text
feat: 게임 상세 페이지 추가
fix: 페이지 이동 시 모바일 메뉴 초기화
chore: 로컬 개발 환경 정리
docs: 브랜치 전략 문서화
```

## 병합 전 검증

- 애플리케이션 코드나 실행 설정을 변경했다면 `npm run lint`, `npm test`, `npm run build`를 통과해야 합니다.
- 화면이나 사용자 동작을 변경했다면 관련 경로와 상호작용을 브라우저에서 확인합니다.
- 문서만 변경했다면 내용, 링크, 명령어와 `git diff --check`를 확인합니다.
- 버그 수정이나 기능 변경에 자동 테스트가 필요하면 변경의 동작을 검증하는 테스트를 추가하고 실행합니다.

저장소 관리자가 설정하는 원격 브랜치 보호 규칙과 필수 CI 검사는 GitHub 설정으로 별도 관리합니다. 이 문서를 추가하는 것만으로 원격 보호 규칙이 활성화되지는 않습니다.
