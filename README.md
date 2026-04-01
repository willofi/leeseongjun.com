# 흔들리는 코드 숲에서

[leeseongjun.com](https://leeseongjun.com)에서 운영하는 개인 개발 블로그이자 포트폴리오 사이트입니다.

기술을 단순히 정리하는 데서 끝나지 않고, 실제로 만들며 고민한 구조와 선택, 제품 감각, 구현 과정까지 함께 기록하는 공간으로 만들고 있습니다. 블로그 글, 소개 페이지, 포트폴리오, 문의 기능을 하나의 톤으로 묶어 개인 작업물과 개발 방향이 자연스럽게 보이도록 구성했습니다.

## What This Project Includes

- 기술 글을 마크다운 기반으로 발행하는 블로그
- 작업 방향과 관심사를 소개하는 About 페이지
- 대표 작업을 보여주는 Portfolio 페이지
- 메일 문의를 받을 수 있는 Contact 페이지
- Giscus 기반 댓글 시스템

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Resend

## Local Development

```bash
pnpm install
pnpm dev
```

기본 개발 서버는 안정성을 위해 `next dev` 기준으로 실행됩니다.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Content Structure

- `posts/`
  마크다운 게시글
- `public/`
  블로그 커버 이미지, 프로필 이미지, 포트폴리오 자산
- `src/app/`
  App Router 기반 페이지와 API 라우트
- `src/components/`
  레이아웃, 포스트, 포트폴리오, 문의 UI 컴포넌트

## Environment Variables

문의 메일과 댓글 기능을 사용하려면 환경 변수가 필요합니다.

### Contact

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

`CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`은 선택 값이며, 없으면 코드에 들어 있는 기본값을 사용합니다.

### Giscus

- `NEXT_PUBLIC_GISCUS_REPO`
- `NEXT_PUBLIC_GISCUS_REPO_ID`
- `NEXT_PUBLIC_GISCUS_CATEGORY`
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

Giscus 설정은 `pathname` 기준으로 댓글을 매핑합니다.

## Deployment

Vercel 배포를 기준으로 구성되어 있으며, 프로덕션 환경에서는 위 환경 변수만 맞춰 주면 바로 운영할 수 있습니다.
