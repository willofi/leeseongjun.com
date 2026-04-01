---
title: "[n8n] 남는 Mac Mini로 자동화 서버 구축하기"
excerpt: "남는 Intel Mac Mini에 Colima와 Docker로 n8n을 올리고, Cloudflare Tunnel까지 연결해 집에서 자동화 서버를 운영한 기록입니다."
tags: ["n8n", "mac-mini", "colima", "docker", "cloudflare"]
pinned: true
coverImage: "/assets/blog/cover/n8n.jpg"
date: "2026-03-30"
author:
  name: leeseongjun
  picture: "/assets/blog/authors/leeseongjun.png"
ogImage:
  url: "/assets/blog/cover/n8n.jpg"
---

# 남는 Mac Mini로 n8n 서버 구축하기

> 클라우드 없이, 월 구독료 없이, 집에서 돌리는 나만의 자동화 서버

## 왜 이걸 만들었나

서랍 속에 잠자고 있던 Intel Mac Mini가 있었다. 그냥 두기엔 아깝고, 뭔가 쓸모 있는 걸 해보고 싶었다.

마침 `n8n`이라는 걸 알게 됐다. Zapier나 Make처럼 워크플로우를 자동화해주는 툴인데, 결정적으로 셀프호스팅이 가능했다. 즉, 내 서버에서 직접 돌릴 수 있다는 뜻이다. 무료로.

"어차피 Mac Mini 남는 거, 여기다 n8n 올려놓으면 되겠는데?"

이 생각 하나로 시작했다.

## n8n이 뭔데?

한 줄 요약하면, 코드 없이 혹은 코드를 조금 섞어서 앱들 사이를 연결해주는 자동화 플랫폼이다.

예를 들면 이런 것들을 만들 수 있다.

- GitHub PR이 열리면 Slack에 알림 보내기
- Sentry 에러가 생기면 Notion에 이슈 자동 생성하기
- 매일 오전 DB 통계를 뽑아 리포트 보내기

개발자 입장에서 특히 좋았던 건 JavaScript나 Python 코드를 워크플로우 중간에 그냥 넣을 수 있다는 점이다. Zapier처럼 "이 앱은 지원 안 됩니다" 같은 벽에 막힐 일이 상대적으로 적다.

## 준비물

- Intel Mac Mini
- macOS 터미널
- 도메인

도메인은 외부 웹훅 연동이 필요할 때만 있으면 되고, 로컬에서만 쓸 거라면 없어도 된다.

## 환경 구성: Docker Desktop 말고 Colima

처음엔 Docker Desktop을 설치하려고 했는데, 서버 용도로만 쓸 거라 GUI 대시보드가 굳이 필요하지 않았다. 찾아보니 `Colima`가 있었다.

Colima는 macOS에서 Docker 데몬을 경량으로 돌려주는 VM이다. Docker Desktop보다 더 가볍고, 트레이 아이콘도 없고, 그냥 조용히 백그라운드에서 돈다. 서버 용도에 잘 맞았다.

```bash
# Homebrew로 한 번에 설치
brew install colima docker docker-compose

# Intel Mac 기준, 리소스 제한해서 시작
colima start --cpu 2 --memory 2 --disk 20

# 동작 확인
docker ps
```

재부팅 후에도 자동으로 뜨게 하려면 아래처럼 설정하면 된다.

```bash
brew services start colima
```

## macOS 절전 설정

서버로 쓸 거면 Mac이 잠들면 안 된다. 그래서 절전 관련 설정도 같이 꺼줬다.

```bash
sudo pmset -a sleep 0
sudo pmset -a disksleep 0
sudo pmset -a displaysleep 10
sudo pmset -a standby 0
sudo pmset -a autopoweroff 0
```

정전 뒤 자동 부팅도 켜둔다.

```bash
sudo pmset -a autorestart 1
```

## `docker-compose.yml` 구성

먼저 작업 디렉토리를 만든다.

```bash
mkdir -p ~/n8n-server && cd ~/n8n-server
```

그리고 `docker-compose.yml`은 이런 식으로 구성했다.

```yaml
version: "3.8"

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "127.0.0.1:5678:5678"
    env_file:
      - .env
    environment:
      - N8N_HOST=0.0.0.0
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - N8N_SECURE_COOKIE=false
      - GENERIC_TIMEZONE=Asia/Seoul
      - TZ=Asia/Seoul
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=336
      - N8N_DIAGNOSTICS_ENABLED=false
      - N8N_VERSION_NOTIFICATIONS_ENABLED=false
    volumes:
      - n8n_data:/home/node/.n8n
    mem_limit: 1g
    memswap_limit: 1g

volumes:
  n8n_data:
    driver: local
```

민감한 값은 `.env` 파일로 분리했다.

```bash
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_password_here
```

```bash
chmod 600 .env
```

설정하면서 중요했던 포인트는 이 정도였다.

- `127.0.0.1:5678:5678`: 포트를 로컬에만 바인딩해서 외부에서 직접 접근하지 못하게
- `N8N_SECURE_COOKIE=false`: localhost에서 접근할 때 Safari 쿠키 에러 방지
- `restart: unless-stopped`: 수동으로 끄지 않는 이상 계속 유지
- `mem_limit: 1g`: 컨테이너가 메모리를 과하게 쓰지 않도록 제한

## 실행

```bash
docker compose up -d
```

그다음 `http://localhost:5678` 로 접속하면 n8n 초기 설정 화면이 뜬다.

브라우저는 개인적으로 Firefox가 편했다. Safari는 localhost 환경에서 secure cookie 관련 이슈가 한 번씩 있었는데, `N8N_SECURE_COOKIE=false`를 넣어두면 대부분 괜찮았다.

## 외부 웹훅 연동: Cloudflare Tunnel

로컬에서만 쓸 거라면 여기서 끝내도 된다. 하지만 GitHub 웹훅처럼 외부 서비스가 내 Mac Mini로 직접 요청을 보내야 하면 공인 IP가 없는 집 네트워크에서는 우회가 필요하다.

이때 Cloudflare Tunnel이 꽤 깔끔했다. 무료로 쓸 수 있고 설정도 단순한 편이다.

```bash
brew install cloudflared

# Cloudflare 계정 로그인
cloudflared tunnel login

# 터널 생성
cloudflared tunnel create n8n-home

# DNS 연결
cloudflared tunnel route dns n8n-home n8n.yourdomain.com
```

`~/.cloudflared/config.yml`은 이런 식으로 잡았다.

```yaml
tunnel: <터널-UUID>
credentials-file: /Users/<username>/.cloudflared/<tunnel-uuid>.json

ingress:
  - hostname: n8n.yourdomain.com
    service: http://localhost:5678
  - service: http_status:404
```

자동 시작까지 걸어두면 더 편하다.

```bash
sudo cloudflared service install
sudo launchctl start com.cloudflare.cloudflared
```

이렇게 하면 `https://n8n.yourdomain.com` 으로 외부에서도 접근할 수 있고, GitHub 웹훅도 정상적으로 받을 수 있다.

Cloudflare Tunnel을 쓸 때는 `docker-compose.yml` 환경변수에 아래 값도 같이 넣어줘야 웹훅 주소가 정확하게 잡힌다.

```yaml
- WEBHOOK_URL=https://n8n.yourdomain.com
```

## 겪었던 트러블들

### `network n8n-server_default not found`

Colima가 꺼진 상태에서 `docker compose up` 을 하면 이 에러가 난다.

```bash
colima status
colima start
docker compose up -d
```

Colima가 완전히 뜨기까지 약간 시간이 걸리기 때문에, 바로 이어서 올리기보다 조금 기다렸다가 compose를 실행하는 게 더 안정적이었다.

### Safari에서 secure cookie 에러

이건 `N8N_SECURE_COOKIE=false` 를 넣고 컨테이너를 다시 띄우면 해결됐다.

```bash
docker compose down && docker compose up -d
```

## 결과적으로

n8n 워크플로우를 몇 개 만들어두고 쓰고 있는데 생각보다 훨씬 편하다. 특히 GitHub 이벤트를 잡아서 Slack에 알림을 보낸다거나, 에러 모니터링을 자동화하는 식의 작업을 코드 한 줄 안 쓰고, 혹은 아주 조금만 쓰고 만들 수 있다는 점이 좋았다.

남는 하드웨어가 있다면 한 번쯤 해볼 만한 구성이었다. 단순히 유휴 장비 재활용이라는 의미도 있고, 실제로 자동화 서버 하나를 집에 두고 쓰는 경험 자체가 꽤 만족스러웠다.
