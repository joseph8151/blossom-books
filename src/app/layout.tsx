import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import KakaoFloatingButton from "@/components/layout/KakaoFloatingButton";
import MobileBottomBar from "@/components/layout/MobileBottomBar";

// 참고: 폰트(Cormorant Garamond, IBM Plex Mono, Pretendard)는
// globals.css 상단의 @import로 로드합니다.
// 실제 배포 환경에서는 next/font/google로 교체해 자체 호스팅 및 성능을 최적화하는 것을 권장합니다.

export const metadata: Metadata = {
  // og:image 등 메타 이미지의 절대 URL 생성을 위한 기준 도메인
  metadataBase: new URL("https://johneducationgroup.com"),
  title: {
    default: "JOHN EDUCATION GROUP | 영어학원·교습소·공부방 교육 프랜차이즈",
    template: "%s | JOHN EDUCATION GROUP",
  },
  description:
    "어린이 영어, Academic Prep, 영어교습소, 공부방, 성인 1:1 영어, 그룹 어학원까지. JOHN EDUCATION GROUP과 함께 나에게 맞는 교육사업을 시작하세요.",
  keywords: [
    "영어학원 프랜차이즈",
    "영어학원 창업",
    "영어교습소 창업",
    "영어공부방 창업",
    "공부방 창업",
    "교육 프랜차이즈",
    "학원 창업",
    "성인영어학원 창업",
    "어학원 프랜차이즈",
    "소규모 학원 창업",
    "교육사업 창업",
    "JOHN EDUCATION GROUP",
  ],
  openGraph: {
    title: "JOHN EDUCATION GROUP | One Education Brand. Multiple Business Models.",
    description:
      "어린이 영어부터 Academic Prep, 공부방, 교습소, 성인 1:1 영어, 그룹 어학원까지 — JOHN EDUCATION GROUP의 교육 시스템으로 나에게 맞는 교육사업을 시작하세요.",
    url: "https://johneducationgroup.com",
    siteName: "JOHN EDUCATION GROUP",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JOHN EDUCATION GROUP",
    description: "One Education Brand. Multiple Business Models. 교육 프랜차이즈 가맹 상담.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      {/*
        pb-[calc(...)]: 모바일에서 하단 고정 바(MobileBottomBar)가 페이지 콘텐츠(특히
        푸터)를 가리지 않도록 바 높이 + iOS 안전영역만큼 여백을 확보합니다.
        lg 이상에서는 바가 숨겨지므로(lg:hidden) 여백을 제거합니다.
      */}
      <body className="min-h-full flex flex-col bg-ivory-100 text-charcoal-900 pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <KakaoFloatingButton />
        <MobileBottomBar />

        {/*
          Cloudflare Web Analytics — 하루 방문자 수 확인용 (개인정보·쿠키 없이 집계).
          Cloudflare 대시보드 > Web Analytics 에서 사이트를 추가하고 발급받은 토큰을
          환경변수 NEXT_PUBLIC_CF_BEACON_TOKEN 에 넣으면 이 비콘이 활성화됩니다.
          (또는 Cloudflare Pages 프로젝트 설정에서 Web Analytics를 켜면 자동 삽입됩니다.)
          방문자 통계는 Cloudflare 대시보드의 Web Analytics 화면에서 일자별로 확인합니다.
        */}
        {process.env.NEXT_PUBLIC_CF_BEACON_TOKEN && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_BEACON_TOKEN}"}`}
          />
        )}
      </body>
    </html>
  );
}
