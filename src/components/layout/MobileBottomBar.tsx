"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, BookOpen } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function MobileBottomBar() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en") ?? false;

  const labels = isEn
    ? { inquiry: "Browse Books", kakao: "Chat on KakaoTalk", inquiryHref: "/en#samples" }
    : { inquiry: "교재 문의", kakao: "카카오톡 상담", inquiryHref: "/custom-order" };

  return (
    // pb-[env(safe-area-inset-bottom)]: iOS 홈 인디케이터 영역만큼 버튼을 위로 띄웁니다.
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-navy-800/15 bg-ivory-100/97 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <Link
        href={labels.inquiryHref}
        className="flex flex-1 items-center justify-center gap-2 border-r border-navy-800/10 py-3.5 text-[14px] font-medium text-navy-900"
      >
        <BookOpen size={17} strokeWidth={2} />
        {labels.inquiry}
      </Link>
      <a
        href={siteConfig.kakaoChannelUrl}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-navy-900 py-3.5 text-[14px] font-medium text-ivory-100"
      >
        <MessageCircle size={17} strokeWidth={2} />
        {labels.kakao}
      </a>
    </div>
  );
}
