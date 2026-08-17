"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, FileSearch } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function MobileBottomBar() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en") ?? false;
  // 상품 상세페이지에는 자체 구매 스티키 바(PurchasePanel)가 있으므로 전역 바는 숨깁니다.
  const isProductDetail = /^\/books\/[^/]+$/.test(pathname ?? "");
  if (isProductDetail) return null;

  // CTA 문구는 목적이 드러나게 씁니다 ("상담하기"/"가격 문의" 대신 무엇을 확인할 수 있는지).
  const labels = isEn
    ? { sample: "Free Sample", kakao: "Find the right book", sampleHref: "/en#samples" }
    : { sample: "무료 Sample 보기", kakao: "내 아이 교재 확인", sampleHref: "/books" };

  return (
    <>
      {/* 모바일: 하단 고정 바 (샘플 + 카카오) */}
      {/* pb-[env(safe-area-inset-bottom)]: iOS 홈 인디케이터 영역만큼 버튼을 위로 띄웁니다. */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-navy-800/15 bg-ivory-100/97 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <Link
          href={labels.sampleHref}
          className="flex flex-1 items-center justify-center gap-2 border-r border-navy-800/10 py-3.5 text-[14px] font-semibold text-navy-900"
        >
          <FileSearch size={17} strokeWidth={2} />
          {labels.sample}
        </Link>
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 bg-brass-500 py-3.5 text-[14px] font-semibold text-navy-950"
        >
          <MessageCircle size={17} strokeWidth={2} />
          {labels.kakao}
        </a>
      </div>

      {/* 데스크톱(PC): 왼쪽 하단에 떠 있는 샘플 버튼 + 카카오 아이콘 */}
      <div className="fixed bottom-6 left-6 z-40 hidden flex-col items-start gap-3 lg:flex">
        <Link
          href={labels.sampleHref}
          className="inline-flex items-center gap-2.5 bg-navy-900 px-5 py-3.5 text-[14px] font-semibold text-ivory-100 shadow-lift transition-all hover:-translate-y-0.5 hover:bg-navy-800"
        >
          <FileSearch size={17} strokeWidth={2} />
          {labels.sample}
        </Link>
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={labels.kakao}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brass-500 text-navy-950 shadow-lift transition-all hover:-translate-y-0.5 hover:bg-brass-400"
        >
          <MessageCircle size={20} strokeWidth={2} />
        </a>
      </div>
    </>
  );
}
