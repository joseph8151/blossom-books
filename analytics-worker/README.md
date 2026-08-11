# 하루 방문자 수 이메일 리포트 (Blossom Books)

매일 아침(한국시간 08:00)에 **어제 방문자 수 / 페이지뷰 / 최근 7일 합계**를
사장님 이메일로 자동으로 보내주는 Cloudflare Worker입니다.

- 완전 무료 (Cloudflare Workers 무료 + Resend 이메일 무료 한도)
- 방문자 수는 **사장님만** 이메일로 받습니다. 홈페이지에는 표시되지 않습니다.
- Cloudflare Web Analytics(쿠키·개인정보 없이 집계) 데이터를 사용합니다.

---

## 준비물 (총 4가지 값)

### 1) Cloudflare 계정 ID (`CF_ACCOUNT_ID`)
- Cloudflare 대시보드 로그인 → 우측 사이드바 또는 **Workers & Pages** 화면에서 **Account ID** 복사.

### 2) Web Analytics 사이트 태그 (`CF_SITE_TAG`)
- Cloudflare 대시보드 → **Web Analytics** → 사이트(blossombooks.org) 선택.
- (아직 안 켰다면) 사이트를 추가하세요. 홈페이지에는 이미 비콘 코드가 들어가 있어,
  Cloudflare Pages 프로젝트 설정에서 **Web Analytics를 켜기만** 해도 집계가 시작됩니다.
- "Manage site" 또는 JS 스니펫의 `token` 값이 바로 사이트 태그입니다. 복사.

### 3) Cloudflare API 토큰 (`CF_API_TOKEN`)
- Cloudflare → 우측 상단 프로필 → **My Profile → API Tokens → Create Token**.
- **Create Custom Token** →
  - Permissions: **Account** · **Account Analytics** · **Read**
  - Account Resources: 본인 계정 선택
- 생성 후 나오는 토큰 문자열을 복사(한 번만 보임).

### 4) Resend 이메일 API 키 (`RESEND_API_KEY`)
- https://resend.com 무료 가입 → **API Keys → Create API Key** → 복사.
- 보내는 주소(`REPORT_FROM`)를 `report@blossombooks.org`로 쓰려면
  Resend에서 **Domains → Add Domain → blossombooks.org** 를 추가하고, 안내되는
  DNS 레코드를 Cloudflare DNS에 넣어 인증하세요(도메인이 이미 Cloudflare에 있어 쉽습니다).
- 빠르게 테스트만 하려면 `REPORT_FROM`을 `onboarding@resend.dev`로 두고,
  받는 주소(`REPORT_TO`)를 **Resend 가입 이메일**로 하면 도메인 인증 없이 바로 발송됩니다.

---

## 배포 방법 (한 번만)

터미널에서:

```bash
cd analytics-worker

# 1) wrangler 준비 (설치돼 있지 않다면)
npm install

# 2) wrangler.jsonc 열어서 CF_ACCOUNT_ID, CF_SITE_TAG 값을 본인 것으로 채우기
#    (REPORT_FROM 도 원하는 주소로)

# 3) 비밀값 저장 (입력하면 화면에 안 보이게 저장됩니다)
npx wrangler secret put CF_API_TOKEN
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put REPORT_TO      # 예: 본인 이메일 주소

# 4) 배포
npx wrangler deploy
```

배포하면 워커 주소(예: `https://blossom-visitor-report.<계정>.workers.dev`)가 나옵니다.

---

## 잘 되는지 바로 테스트

브라우저에서 워커 주소 뒤에 **`/run`** 을 붙여 접속하세요:

```
https://blossom-visitor-report.<계정>.workers.dev/run
```

- 화면에 `sent: [Blossom Books] ...` 가 뜨고, 잠시 후 이메일이 도착하면 성공입니다.
- 이후에는 **매일 아침 8시(한국시간)** 에 자동으로 메일이 옵니다.

> 참고: 배포 직후에는 방문 데이터가 아직 없어 `0명`으로 올 수 있습니다.
> Web Analytics가 데이터를 모으기 시작하면 실제 숫자가 채워집니다.

---

## 발송 시간 바꾸기
`wrangler.jsonc`의 `crons` 값을 수정 후 다시 `npx wrangler deploy` 하세요.
현재 `"0 23 * * *"` = 매일 UTC 23:00 = **한국시간 08:00**.
예) 오후 9시(21:00 KST)로 바꾸려면 `"0 12 * * *"`.
