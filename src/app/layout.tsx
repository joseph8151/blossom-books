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
  title: {
    default: "블러섬북스 | Blossom Books — 시험과 수업의 목적에 맞춘 프리미엄 교육 콘텐츠",
    template: "%s | 블러섬북스 Blossom Books",
  },
  description:
    "미국 교과과정, 국제학교 입학시험, 공인시험, 실전 모의고사를 분석하여 학생용 문제집과 정답·상세 해설집을 제작합니다. 국제학교 문제집, 미국 교과서 문제집, AP 문제집, CAT4·MAP·ISEE·SSAT 문제집, 학원·프랩학원 교재 주문 제작.",
  keywords: [
    "국제학교 문제집",
    "미국 교과서 문제집",
    "미국 수학 문제집",
    "국제학교 입학시험 문제집",
    "국제학교 모의고사",
    "학원 교재 제작",
    "학원 문제집 제작",
    "프랩학원 교재",
    "과외 수업 자료",
    "맞춤 문제집 제작",
    "AP 문제집",
    "CAT4 문제집",
    "MAP 테스트 문제집",
    "ISEE SSAT 문제집",
    "OET 문제집",
    "PTE 문제집",
    "레벨테스트 문제집",
    "블러섬북스",
  ],
  openGraph: {
    title: "블러섬북스 | Blossom Books",
    description: "시험과 수업의 목적에 맞춘 프리미엄 교육 콘텐츠 — 문제집, 정답·해설집, 실전 모의고사, 맞춤 교재 제작",
    locale: "ko_KR",
    type: "website",
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
      </body>
    </html>
  );
}
