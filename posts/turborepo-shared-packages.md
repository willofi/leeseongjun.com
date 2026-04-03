---
title: 'Turborepo로 공용 프론트엔드 패키지 관리하기'
excerpt: 'Turborepo 기반 모노레포에서 공용 패키지를 내부 앱에서는 workspace로 검증하고, 외부 프로젝트에는 GitLab npm Registry로 배포한 과정을 정리했다.'
tags: ['turborepo', 'monorepo', 'gitlab', 'npm-registry']
pinned: true
coverImage: '/assets/blog/cover/turborepo-packages.png'
date: '2026-04-03'
author:
  name: leeseongjun
  picture: '/assets/blog/authors/leeseongjun.png'
ogImage:
  url: '/assets/blog/cover/turborepo-packages.png'
---

# Turborepo로 공용 프론트엔드 패키지 관리하기

> 내부 앱에서는 빠르게 검증하고, 외부 프로젝트에는 패키지처럼 배포하고 싶었다.

프론트엔드 프로젝트를 여러 개 운영하다 보면 공통 코드는 반드시 생긴다. 버튼, 모달, 훅, 유틸 함수, API 클라이언트, 타입 정의 같은 것들이다.

처음에는 한 프로젝트 안에서만 쓰다가, 어느 순간 다른 프로젝트에서도 필요해진다. 그때부터 고민이 시작된다.

- 공용 코드를 어디서 관리할까
- 복붙 없이 재사용하려면 어떻게 해야 할까
- 내부 검증은 빠르게 하면서 외부 프로젝트에는 패키지처럼 배포할 수 없을까

이번 글은 이 고민을 `Turborepo` 기반 모노레포와 `GitLab npm Registry` 조합으로 풀어낸 기록이다. 핵심은 단순히 "모노레포를 도입했다"가 아니라, **내부 검증과 외부 배포를 같은 구조 안에서 자연스럽게 연결한 것**에 있다.

## 목표는 두 가지였다

처음부터 요구사항은 분명했다.

1. 외부 프로젝트에서는 npm 패키지처럼 설치해서 사용할 수 있어야 한다.
2. 내부 앱에서는 workspace로 바로 붙여서 빠르게 검증할 수 있어야 한다.

즉, 개발 편의성과 배포 가능성을 동시에 가져가고 싶었다.

## 최종 구조

```txt
apps/
  web/
  docs/

packages/
  ui/
  hooks/
  utils/
  api/
  types/
```

- `apps/*`는 공용 패키지를 실제로 붙여보며 검증하는 소비 앱
- `packages/*`는 외부에도 배포 가능한 공용 라이브러리

하나의 레포에서 개발과 검증, 배포를 함께 다루는 구조다.

## 처음 부딪힌 문제

예를 들어 `@lsj/ui` 패키지를 workspace로 연결하고 앱에서 아래처럼 import 했다고 해보자.

```ts
import { Button } from '@lsj/ui';
```

그런데 빌드 시점에 다음과 같은 에러가 발생했다.

```txt
Module not found: Can't resolve '@lsj/ui'
```

원인은 `packages/ui/package.json`의 `exports` 설정이었다.

```json
{
  "exports": {
    "./*": "./src/*.tsx"
  }
}
```

이 상태에서는 `@lsj/ui/button` 같은 deep import는 되지만, 루트 엔트리인 `@lsj/ui`는 열려 있지 않았다.

## 해결: dist 기반 패키지 계약으로 통일

이 문제를 exports 한 줄로만 막기보다는, 아예 패키지 구조 자체를 "배포 가능한 라이브러리" 형태로 정리했다.

`packages/ui/package.json`

```json
{
  "name": "@lsj/ui",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "files": ["dist"]
}
```

이렇게 두면 내부 앱이든 외부 프로젝트든 똑같이 `@lsj/ui`를 import하면 된다.

### 왜 src 직결 대신 dist 기반으로 갔나

workspace 패키지를 `src` 기준으로 바로 읽게 하는 것도 가능하다. 하지만 외부 배포까지 고려한다면 결국 중요한 건 **최종 소비 계약**이다.

dist 기반으로 맞추면 다음 장점이 있다.

- 내부와 외부의 소비 방식이 동일해진다
- 타입 선언, ESM, CJS 산출물이 명확해진다
- 외부 프로젝트에서 예측 가능한 방식으로 설치하고 사용할 수 있다

처음엔 한 단계 더 번거롭게 느껴질 수 있지만, 장기적으로는 오히려 관리가 쉬워졌다.

## Next.js 앱에서 `transpilePackages`를 함께 둔 이유

패키지를 dist 기반으로 정리한 뒤에도 Next.js 앱에는 아래 설정을 추가했다.

```js
const nextConfig = {
  transpilePackages: ['@lsj/ui'],
};
```

dist를 만들었는데 왜 또 `transpilePackages`가 필요할까 싶을 수 있다. 이 설정은 언제나 필수는 아니지만, **monorepo 안에서 workspace 패키지를 Next.js 앱이 직접 소비하는 구조**라면 꽤 유용하다.

이 설정이 있으면 Next가 `@lsj/ui`를 완전히 외부 라이브러리 취급하지 않고, 앱 코드와 비슷한 흐름으로 처리한다. 특히 client component를 포함한 UI 패키지에서는 이 경계가 더 예측 가능하게 동작했다.

## `"use client"` 이슈

Button처럼 클릭 이벤트가 있는 컴포넌트는 당연히 클라이언트 컴포넌트다. 문제는 패키지로 분리한 뒤, 엔트리 기준의 클라이언트 경계가 애매해지면 Next가 기대한 방식으로 해석하지 못하는 경우가 있다는 점이었다.

그래서 UI 패키지 엔트리 파일 최상단에 `"use client"`를 두는 방식으로 정리했다.

```ts
'use client';

export * from './button';
export * from './card';
export * from './modal';
```

이렇게 해두면 최소한 패키지 엔트리 차원에서는 클라이언트 경계가 분명해지고, 소비 앱에서도 동작을 더 예측하기 쉬워졌다.

## GitLab npm Registry 연결

내부 검증은 workspace로 해결했고, 외부 프로젝트용으로는 `GitLab npm Registry`를 붙였다.

`.npmrc`

```txt
@lsj:registry=https://gitlab.example.com/api/v4/projects/84/packages/npm/
//gitlab.example.com/api/v4/projects/84/packages/npm/:_authToken=${GITLAB_TOKEN}
```

여기서 중요한 포인트는 두 가지였다.

- scope와 패키지명의 scope는 반드시 일치해야 한다
- 토큰은 코드에 직접 넣지 않고 환경변수로 주입해야 한다

예를 들어 패키지명이 `@lsj/ui`라면, `.npmrc`에도 `@lsj` scope가 정확히 맞아야 한다.

`GITLAB_TOKEN`은 로컬에서는 `~/.zshrc`에 넣어 테스트했고, 실제 배포 환경에서는 Vercel 환경변수나 CI secret으로 주입했다. 이 토큰은 앱 실행 시점이 아니라 `pnpm install` 시점에 필요하다는 점도 기억해두면 좋다.

## 배포 흐름은 어떻게 가져갔나

전체 흐름은 단순하게 유지했다.

```txt
packages/ui/package.json에서 version 직접 수정 -> pnpm package:release -- @lsj/ui
```

버전은 수동으로 올렸다. 현재 규모에서는 자동 bump보다 이 방식이 더 단순하고 관리하기 편했다.

패키지가 더 늘어나고 패키지 간 의존성이 복잡해지면 그때 `Changesets` 같은 툴을 도입하는 편이 더 적절할 것 같다. 지금 단계에서는 셋업 비용 대비 얻는 이점이 크지 않아서 보류했다.

내부적으로는 `scripts/package-workflow.mjs` 같은 작은 wrapper 스크립트가 `turbo --filter`를 감싸는 형태로 동작했다.

```bash
# 특정 패키지 빠르게 배포
pnpm package:publish -- @lsj/ui

# 전체 빌드 검증 후 배포
pnpm package:release -- @lsj/ui

# 패키지가 늘어나도 같은 패턴 유지
pnpm package:release -- @lsj/hooks
```

여기서 기준은 단순하다.

- `publish`: 해당 패키지만 빠르게 올릴 때
- `release`: 루트 빌드를 먼저 돌려 소비 앱에서 안 깨지는지 확인한 뒤 올릴 때

## 외부 프로젝트에서 쓰는 방식

외부 프로젝트는 레포 전체를 가져올 필요가 없다. registry만 연결해두면 된다.

```bash
pnpm add @lsj/ui
```

```ts
import { Button } from '@lsj/ui';
```

사용하는 쪽에서는 일반 npm 패키지와 거의 다르지 않다.

## 공용 코드 옮길 때 추천 순서

처음부터 모든 코드를 공용 패키지로 옮기려 하면 생각보다 빠르게 꼬인다. 경험상 아래 순서가 가장 안전했다.

1. `utils`
2. `types`
3. `api`
4. `hooks`
5. `ui`

아래로 갈수록 프로젝트 결합도가 높아진다. 특히 `api`, `hooks`, `ui`는 아래 조건들을 먼저 확인하고 옮기는 편이 좋았다.

- 특정 프로젝트의 상태 관리 구조에 묶여 있지 않은가
- env 키나 base URL이 하드코딩되어 있지 않은가
- 앱 전용 로직이 섞여 있지 않은가

예를 들어 axios client라면 아래처럼 설계하는 편이 훨씬 유연하다.

```ts
createApiClient({
  baseURL,
  getAccessToken,
  onAuthError,
});
```

패키지는 공용으로 두고, 각 프로젝트가 자기 인증 로직만 주입하는 방식이다.

## 정리

이번 구성의 핵심은 단순히 "모노레포를 쓰자"가 아니었다.  
**공용 패키지를 내부 검증과 외부 배포 모두에 자연스럽게 연결할 수 있는 구조를 만드는 것**이 더 중요했다.

| 역할 | 방식 |
|------|------|
| 공용 패키지 관리 | `packages/*` |
| 실제 소비 검증 | `apps/*` |
| 패키지 엔트리 | dist 기준으로 통일 |
| Next 앱 연결 | `transpilePackages` |
| 외부 배포 | GitLab npm Registry |
| 토큰 관리 | 환경변수 주입 |
| 배포 흐름 | 루트 스크립트로 통일 |

복붙보다 버전 관리가 쉬워지고, 패키지 계약도 명확해진다.  
특히 여러 프론트엔드 앱을 동시에 운영하면서도 내부 검증 속도와 외부 배포 가능성을 모두 챙겨야 하는 팀이라면 충분히 투자할 가치가 있는 구조였다.
