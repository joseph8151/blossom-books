"use client";

import Link from "next/link";
import { Search, MessageSquareText } from "lucide-react";

export default function MobileBottomBar() {
  return (
    // pb-[env(safe-area-inset-bottom)]: iOS 홈 인디케이터 영역만큼 버튼을 위로 띄웁니다.
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-navy-900/15 bg-ivory-100/97 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <Link
        href="/business-models"
        className="flex flex-1 items-center justify-center gap-2 border-r border-navy-900/10 py-3.5 text-[14px] font-semibold text-navy-900"
      >
        <Search size={17} strokeWidth={2} />
        사업 모델
      </Link>
      <Link
        href="/consultation"
        className="flex flex-1 items-center justify-center gap-2 bg-gradient-to-b from-coral-400 to-coral-500 py-3.5 text-[14px] font-semibold text-navy-950"
      >
        <MessageSquareText size={17} strokeWidth={2} />
        가맹 상담
      </Link>
    </div>
  );
}
