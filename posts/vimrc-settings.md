---
title: "[vim] vimrc 로 vim 에디터 설정하기"
excerpt: "vim을 편리하게 사용하기 위한 설정 방법입니다."
tags: ["vim", "terminal"]
pinned: false
coverImage: "/assets/blog/cover/vim.png"
date: "2025-06-25"
author:
  name: leeseongjun
  picture: "/assets/blog/authors/leeseongjun.png"
ogImage:
  url: "/assets/blog/cover/vim.png"
---

### `~/.vimrc`

vim 을 편리하게 사용하기 위한 설정 방법입니다.

```vim
> vi ~/.vimrc

"  파일 및 탭 관련 설정
set tabstop=2            " 탭을 2칸으로
set shiftwidth=4         " >>, <<, >, < 명령어 시 들여쓰기 너비
set expandtab            " 탭 대신 공백 사용
set smarttab             " 스마트 탭 처리
set fixendofline         " 파일 끝에 자동 개행 추가
set fileencodings=utf-8,euc-kr " 파일 인코딩 우선순위 설정

"  줄 번호 및 들여쓰기 설정
set number               " 줄 번호 표시
set relativenumber       " 현재 줄 기준 상대 번호 표시
set autoindent           " 자동 들여쓰기
set smartindent          " 스마트 들여쓰기
set cindent              " C 스타일 들여쓰기

"  검색 관련 설정
set ignorecase           " 검색 시 대소문자 무시
set hlsearch             " 검색 시 하이라이트 표시

"  편의 기능
set showmatch            " 매칭되는 괄호 강조
set backspace=indent,eol,start " 백스페이스로 들여쓰기 등 삭제 가능
set ruler                " 커서 위치 표시
set history=1000         " 명령어 히스토리 1000개 저장
set showcmd              " 입력 중인 명령어 상태줄에 표시
set wmnu                 " 자동완성 시 선택 목록 표시
set title                " 창 제목 표시
set nobackup             " 백업 파일 생성하지 않음

"  기타 설정
set nocompatible         " 방향키 등 Vim 향상 기능 사용
"set nowrap              " 줄바꿈 비활성화

"  색상 및 문법 하이라이트
set background=dark      " 다크 테마에 맞는 색상 적용
syntax on                " 문법 하이라이트 켜기

"  화면 표시 설정
set cursorline           " 현재 커서 줄 강조
set colorcolumn=80       " 80번째 컬럼에 세로 줄 표시
set scrolloff=5          " 위아래 최소 5줄 여백 확보
set sidescrolloff=5      " 좌우 스크롤 여백 확보

"  단축키 매핑
nnoremap <leader>n :nohlsearch<CR>  " \n 으로 하이라이트 제거

"  파일 형식별 자동 설정
au BufRead,BufNewFile *.py       set expandtab
au BufRead,BufNewFile *.c        set noexpandtab
au BufRead,BufNewFile *.h        set noexpandtab
au BufRead,BufNewFile Makefile*  set noexpandtab
```
