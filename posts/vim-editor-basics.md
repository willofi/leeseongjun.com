---
title: "[vim] 에디터 사용법 정리"
excerpt: "Vim 에디터의 기본 모드와 자주 쓰는 명령어를 한 번에 정리한 글입니다."
tags: ["vim", "terminal"]
pinned: false
coverImage: "/assets/blog/cover/vim-key.gif"
date: "2025-06-26"
author:
  name: leeseongjun
  picture: "/assets/blog/authors/leeseongjun.png"
ogImage:
  url: "/assets/blog/cover/vim-key.gif"
---

## Vim 에디터 기본 사용법 정리

### vim?

vim은 vi의 확장판인 `Vi Improved` 에디터이다.

`.vimrc` 설정 파일로 커스터마이징할 수 있고, 이전 글에서 다양한 설정 방법을 정리한 적이 있다.

![vim cheat sheet](/assets/blog/cover/vim-key.gif)

### Vim 모드 설명

| 모드 | 설명 | 진입 방법 |
| --- | --- | --- |
| Normal Mode | 기본 명령 실행 | `Esc` |
| Insert Mode | 텍스트 입력 | `i`, `a`, `o` 등 |
| Visual Mode | 텍스트 선택 | `v`, `V`, `Ctrl+v` |
| Command Mode | 명령어 입력 | `:` |

### 기본 명령어

#### 파일 열기/저장/종료

```vim
:e filename      " 파일 열기
:w               " 저장
:w filename      " 다른 이름으로 저장
:q               " 종료
:q!              " 저장하지 않고 종료
:wq              " 저장하고 종료
:vs              " 창 수직 분할
:sp              " 창 수평 분할
Ctrl+w + hjkl    " 창 이동
:enew            " 새 창
:E               " 다른 파일 열기
```

#### 입력 모드 관련

```vim
i     " 현재 위치 앞에 입력
I     " 줄 맨 앞에 입력
a     " 현재 위치 뒤에 입력
A     " 줄 맨 뒤에 입력
o     " 아래에 줄 삽입 후 입력
O     " 위에 줄 삽입 후 입력
```

#### 복사/삭제/붙여넣기

```vim
Ctrl+h    " 백스페이스 (Insert Mode)
x         " 현재 위치 삭제
D         " 현재 위치부터 삭제
J         " 아래 줄을 현재 줄 끝으로 붙임
dd        " 현재 줄 삭제
yy        " 현재 줄 복사
p         " 붙여넣기 (아래)
P         " 붙여넣기 (위)
```

#### 이동 명령

```vim
h         " 왼쪽
j         " 아래
k         " 위
l         " 오른쪽
w         " 다음 단어로 이동
b         " 이전 단어로 이동
f{str}    " str로 이동
0         " 줄 맨 앞으로
$         " 줄 맨 뒤로
Ctrl+e    " 커서 고정 하단 스크롤
Ctrl+y    " 커서 고정 상단 스크롤
Ctrl+u    " 페이지 상단 이동
Ctrl+d    " 페이지 하단 이동
gg        " 파일 맨 처음으로
G         " 파일 맨 끝으로
```

#### 검색

```vim
/단어     " 아래 방향으로 검색
?단어     " 위 방향으로 검색
n         " 다음 결과로 이동
N         " 이전 결과로 이동
```

#### 유용한 명령어

```vim
u                    " undo
Ctrl+r               " redo
.                    " 이전 명령어 실행
:%s/{word}/{word}/c  " 각 단어 바꾸기
:%s/{word}/{word}/g  " 전체 단어 바꾸기
```

### .vimrc 초기 추천 설정 예시

```vim
set nocompatible        " Vi 호환모드 끄기
set number              " 줄 번호 표시
set relativenumber      " 상대 줄 번호
set tabstop=4           " 탭 크기 설정
set expandtab           " 탭 대신 스페이스
set autoindent          " 자동 들여쓰기
syntax on               " 문법 하이라이트
```
