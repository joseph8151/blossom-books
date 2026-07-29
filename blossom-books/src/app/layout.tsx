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
      <body className="min-h-full flex flex-col bg-ivory-100 text-charcoal-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <KakaoFloatingButton />
        <MobileBottomBar />
      </body>
    </html>
  );
}
