import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import { siteKeywords } from "@/data/site";

// 참고: 폰트(Cormorant Garamond, IBM Plex Mono, Pretendard)는
// globals.css 상단의 @import로 로드합니다.
// 실제 배포 환경에서는 next/font/google로 교체해 자체 호스팅 및 성능을 최적화하는 것을 권장합니다.

export const metadata: Metadata = {
  // og:image 등 메타 이미지의 절대 URL 생성을 위한 기준 도메인
  metadataBase: new URL("https://blossombooks.org"),
  title: {
    default: "블러섬북스 | Blossom Books — 시험과 수업 목적에 맞춘 문제집·해설집",
    template: "%s | 블러섬북스 Blossom Books",
  },
  description:
    "미국 교과과정, 국제학교 입학시험, 공인시험, 실전 모의고사를 분석하여 학생용 문제집과 정답·상세 해설집을 제작합니다. 국제학교 문제집, 미국 교과서 문제집, AP 문제집, CAT4·MAP·ISEE·SSAT 문제집, 영어·국어 레벨테스트 문제집, 학원·프랩학원 교재 주문 제작.",
  keywords: siteKeywords,
  openGraph: {
    title: "블러섬북스 | Blossom Books",
    description: "시험과 수업 목적에 맞춘 문제집·해설집 — 정답·해설, 실전 모의고사, 맞춤 교재 제작",
    url: "https://blossombooks.org",
    siteName: "블러섬북스 Blossom Books",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "블러섬북스 | Blossom Books",
    description: "시험과 수업 목적에 맞춘 문제집·해설집·모의고사",
  },
  // 네이버 서치어드바이저(searchadvisor.naver.com) 소유 확인 코드. Cloudflare
  // 환경변수 NEXT_PUBLIC_NAVER_SITE_VERIFICATION이 설정되면 그 값을 우선
  // 쓰고, 없으면 아래 발급받은 코드를 기본값으로 사용합니다.
  other: {
    "naver-site-verification":
      process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "d11f3ebdea72ba44f40715f49ed975c0a65a1dbb",
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
