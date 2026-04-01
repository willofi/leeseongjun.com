---
title: "[vim] 플러그인 설치 방법"
excerpt: "vim-plug 설치부터 PlugInstall 실행까지 Vim 플러그인 추가 방법을 정리한 글입니다."
tags: ["vim", "terminal"]
pinned: false
coverImage: "/assets/blog/cover/vim-plug.png"
date: "2025-07-03"
author:
  name: leeseongjun
  picture: "/assets/blog/authors/leeseongjun.png"
ogImage:
  url: "/assets/blog/cover/vim-plug.png"
---

## vim 에디터에 플러그인 설치하기

### vim-plug 설치하기

vim에서 플러그인을 사용하려면 먼저 `vim-plug` 설치가 필요하다.

```bash
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

### `~/.vimrc`에 플러그인 설정 추가하기

```vim
call plug#begin('~/.vim/plugged')  " vim-plug 시작
Plug 'easymotion/vim-easymotion'   " 플러그인 추가
call plug#end()                    " vim-plug 종료
```

### vim에서 `:PlugInstall` 실행하기

vim을 실행한 뒤 아래 명령어를 입력한다.

```vim
:PlugInstall
```

실행하면 다음과 같은 형태로 설치가 진행된다.

```text
Updated. Elapsed time: 1.227138 sec.
[=]

- Finishing ... Done!
- vim-easymotion: Already up to date.
```

### 설치 확인

vim Normal 모드에서 `\w`를 입력하면 각 단어에 특정 알파벳이 표시되는 것을 확인할 수 있다.
