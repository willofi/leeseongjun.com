---
title: "[blog] Next.js 마크다운 블로그에 giscus 댓글 붙이기"
excerpt: "GitHub Discussions 기반의 giscus를 Next.js 마크다운 블로그에 붙이고, pathname 기준으로 댓글을 연결한 과정을 정리한 글입니다."
tags: ["giscus", "nextjs", "blog", "github", "comments"]
pinned: false
coverImage: "/assets/blog/cover/giscus-comments.svg"
date: "2026-03-31"
author:
  name: leeseongjun
  picture: "/assets/blog/authors/leeseongjun.png"
ogImage:
  url: "/assets/blog/cover/giscus-comments.svg"
---

# Next.js 마크다운 블로그에 giscus 댓글 붙이기

> GitHub Discussions 기반으로, 서버 없이 댓글 기능 붙여보기

## 왜 giscus를 골랐나

블로그에 댓글을 붙이고 싶긴 했는데, 댓글 기능만을 위해 별도 서버나 DB를 두는 건 조금 과하다는 생각이 들었다.

지금 블로그는 마크다운 파일 기반으로 운영하고 있고, 배포도 비교적 단순한 편이다. 그래서 댓글도 최대한 가볍게 붙이고 싶었다.

그럴 때 잘 맞는 게 `giscus`였다.

giscus는 GitHub Discussions를 댓글 저장소처럼 활용하는 방식이다. 즉, 블로그 글마다 댓글을 따로 DB에 저장하는 게 아니라 GitHub의 Discussion으로 연결해서 보여준다.

정리하면 장점은 이 정도였다.

- 별도 댓글 서버가 필요 없다
- GitHub Discussions 기반이라 관리가 단순하다
- 정적 블로그에도 붙이기 쉽다
- 인증과 스팸 대응을 GitHub 쪽에 어느 정도 맡길 수 있다

## 기본 준비

시작 전에 필요한 건 몇 가지 있다.

- 댓글용으로 사용할 GitHub public repository
- 해당 저장소에서 `Discussions` 활성화
- `giscus` GitHub App 설치

설정이 끝나면 [giscus.app](https://giscus.app/) 에서 실제 연결에 필요한 값들을 확인할 수 있다.

내가 이 프로젝트에서 사용한 값은 이런 구조였다.

- `repo`
- `repoId`
- `category`
- `categoryId`

그리고 댓글 매핑 방식은 `pathname` 기준으로 잡았다.

즉, `/posts/some-post` 라는 경로를 기준으로 각 글에 대응되는 댓글 스레드가 생성되도록 한 방식이다.

## 환경변수 정리

프로젝트에는 아래 환경변수를 넣었다.

```bash
NEXT_PUBLIC_GISCUS_REPO=owner/repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOxxxxxx
```

이 값들은 giscus 설정 페이지에서 그대로 복사해서 넣으면 된다.

`NEXT_PUBLIC_` 접두사가 붙는 이유는, 이 값들이 브라우저에서 댓글 스크립트를 생성할 때 필요하기 때문이다.

## 댓글 컴포넌트 만들기

이번 블로그에서는 클라이언트 컴포넌트로 댓글 영역을 따로 만들었다.

핵심은 마운트 시점에 `script` 태그를 만들어서 `giscus.app/client.js`를 붙이는 방식이다.

```tsx
'use client'

import { useEffect, useRef } from 'react'

const giscusConfig = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
}

function hasGiscusConfig() {
  return Object.values(giscusConfig).every(Boolean)
}

export default function Comments() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current || !hasGiscusConfig()) {
      return
    }

    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-repo', giscusConfig.repo!)
    script.setAttribute('data-repo-id', giscusConfig.repoId!)
    script.setAttribute('data-category', giscusConfig.category!)
    script.setAttribute('data-category-id', giscusConfig.categoryId!)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'light')
    script.setAttribute('data-lang', 'ko')
    script.setAttribute('data-loading', 'lazy')

    containerRef.current.appendChild(script)
  }, [])

  if (!hasGiscusConfig()) {
    return null
  }

  return <div ref={containerRef} className="giscus" />
}
```

여기서 중요했던 건 두 가지였다.

- 환경변수가 모두 있을 때만 렌더링하기
- 컴포넌트가 다시 붙을 때 중복 스크립트가 생기지 않도록 `innerHTML = ''` 로 비우기

## 포스트 상세 페이지에 연결

댓글 컴포넌트를 만든 뒤에는 포스트 상세 페이지 하단에 넣어주면 된다.

이 블로그에서는 본문 아래쪽에 `Comments` 컴포넌트를 바로 렌더링하도록 구성했다.

```tsx
<PostHeader post={post} />
<div className="mt-8">
  <div className="markdown" dangerouslySetInnerHTML={{ __html: content }} />
</div>
<Comments />
```

이렇게 두면 글을 다 읽은 다음 바로 댓글을 볼 수 있어서 흐름도 자연스럽다.

## `pathname` 기준 매핑을 쓴 이유

giscus는 여러 매핑 방식을 지원하는데, 이번엔 `pathname`을 선택했다.

이유는 단순했다.

- 마크다운 파일마다 `slug`가 명확하다
- 실제 URL 구조가 `/posts/{slug}` 로 안정적이다
- 글 제목을 바꾸더라도 경로만 유지되면 댓글 연결이 흔들리지 않는다

제목 기반 매핑보다 덜 불안정하고, 현재 블로그 구조에도 더 잘 맞았다.

## 적용하면서 느낀 점

giscus의 제일 큰 장점은 댓글 기능을 꽤 가볍게 붙일 수 있다는 점이었다.

직접 댓글 시스템을 만들었다면 적어도 아래 문제를 다 고민해야 했을 것이다.

- 인증
- 스팸
- 저장소 설계
- 관리자 기능
- UI 유지보수

그런데 giscus는 GitHub Discussions 위에 올라가는 구조라서, 블로그 쪽에서는 연결만 잘 해두면 된다.

정적 블로그에 “댓글 기능만 하나 붙이고 싶다”는 상황에서는 꽤 괜찮은 선택지였다.

## 마무리

지금 블로그처럼 Next.js 기반의 마크다운 블로그라면 giscus는 꽤 잘 어울린다.

서버를 따로 붙이지 않아도 되고, GitHub 저장소 하나만 잘 준비하면 생각보다 금방 적용할 수 있다.

특히 개인 블로그처럼 운영 부담을 최대한 줄이고 싶은 경우에는 더 잘 맞는 편이다.
