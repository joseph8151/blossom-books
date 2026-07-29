import Link from "next/link";
import { MessageCircle, BookOpen } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function MobileBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-navy-800/15 bg-ivory-100/97 backdrop-blur lg:hidden">
      <Link
        href="/custom-order"
        className="flex flex-1 items-center justify-center gap-2 border-r border-navy-800/10 py-3.5 text-[14px] font-medium text-navy-900"
      >
        <BookOpen size={17} strokeWidth={2} />
        교재 문의
      </Link>
      <a
        href={siteConfig.kakaoChannelUrl}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-navy-900 py-3.5 text-[14px] font-medium text-ivory-100"
      >
        <MessageCircle size={17} strokeWidth={2} />
        카카오톡 상담
      </a>
    </div>
  );
}
